# GitHub Actions & CI/CD Documentation

Complete reference for DAKIA Wiki Bot's `.github/` folder.

---

## Folder Structure

```
.github/
├── WORKFLOWS.md                          # This document
├── AGENTS.md                             # AI agent development guide
├── CLAUDE.md                             # Quick reference for Claude
├── copilot-instructions.md               # GitHub Copilot instructions
├── FUNDING.yml                           # GitHub Sponsors configuration
├── pull_request_template.md              # PR description template (to be created)
├── pull_request_title_conventions.md     # Title format rules (to be created)
├── actionlint.yml                        # Workflow linter config (to be created)
├── ISSUE_TEMPLATE/
│   ├── config.yml                        # Issue routing configuration
│   ├── bug_report.yml                    # Bug report template
│   └── feature_request.yml               # Feature request template
├── scripts/                              # Automation scripts
│   ├── bump-version.js                   # Version bumping
│   ├── generate-changelog.js             # CHANGELOG generation
│   └── validate-env.js                   # Environment validation
├── actions/                              # Custom composite actions
│   ├── setup-node/                       # Node.js + npm + cache setup
│   └── deploy-preview/                   # Vercel preview deployment
└── workflows/                            # GitHub Actions workflows
    ├── ci-pr.yml                         # PR validation workflow
    ├── ci-main.yml                       # Main branch CI
    ├── deploy-production.yml             # Production deployment
    ├──deploy-preview.yml                # Preview deployments
    ├── test-unit.yml                     # Unit tests
    ├── test-e2e.yml                      # E2E tests with Playwright
    ├── lint-and-format.yml               # Code quality checks
    ├── security-scan.yml                 # Security scanning
    └── dependency-update.yml             # Automated dependency updates
```

---

## Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    DAKIA WIKI BOT CI/CD ARCHITECTURE                       │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  TRIGGERS                     PIPELINES                      OUTPUTS       │
│  ────────                     ─────────                      ───────       │
│                                                                            │
│  ┌──────────┐    ┌──────────────────────────────────┐    ┌────────────┐   │
│  │    PR    │───▶│  ci-pr.yml                       │───▶│   Checks   │   │
│  └──────────┘    │  ├─ setup & build                │    │    Gate    │   │
│                  │  ├─ unit-test                    │    └────────────┘   │
│  ┌──────────┐    │  ├─ e2e-test                     │                     │
│  │   Push   │───▶│  ├─ lint & format                │    ┌────────────┐   │
│  │   main   │    │  ├─ type-check                   │───▶│  Coverage  │   │
│  └──────────┘    │  └─ security-scan                │    └────────────┘   │
│                  └──────────────────────────────────┘                     │
│                                                                            │
│  ┌──────────┐    ┌──────────────────────────────────┐    ┌────────────┐   │
│  │    PR    │───▶│  deploy-preview.yml              │───▶│   Vercel   │   │
│  │  (open)  │    │  └─ Deploy preview environment   │    │  Preview   │   │
│  └──────────┘    └──────────────────────────────────┘    └────────────┘   │
│                                                                            │
│  ┌──────────┐    ┌──────────────────────────────────┐    ┌────────────┐   │
│  │  Merge   │───▶│  deploy-production.yml           │───▶│   Vercel   │   │
│  │   main   │    │  ├─ build production             │    │ Production │   │
│  └──────────┘    │  ├─ run smoke tests              │    ├────────────┤   │
│                  │  ├─ deploy to production         │───▶│   Sentry   │   │
│                  │  └─ notify deployment status     │    │  Release   │   │
│                  └──────────────────────────────────┘    └────────────┘   │
│                                                                            │
│  ┌──────────┐    ┌──────────────────────────────────┐                     │
│  │ Schedule │───▶│  Scheduled Jobs                  │    ┌────────────┐   │
│  │  (cron)  │    │  ├─ dependency-update (weekly)   │───▶│  PR Auto   │   │
│  └──────────┘    │  ├─ security-scan (daily)        │───▶│  Update    │   │
│                  │  └─ backup-database (daily)      │    └────────────┘   │
│                  └──────────────────────────────────┘                     │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference

| Prefix        | Purpose                                 |
|---------------|-----------------------------------------|
| `ci-`         | Continuous integration workflows        |
| `deploy-`     | Deployment workflows                    |
| `test-`       | Testing workflows (unit, E2E)           |
| `lint-`       | Code quality and formatting             |
| `security-`   | Security scanning and audits            |
| `dependency-` | Dependency management                   |

---

## PR Title Conventions

We follow **Conventional Commits** specification for PR titles. This enables automatic changelog generation and semantic versioning.

```
Format: <type>(<scope>): <summary>

Types:   feat | fix | perf | test | docs | refactor | style | build | ci | chore
Scopes:  auth | courses | admin | api | ui | db | markdown (optional)

Examples:
  feat(articles): add markdown code highlighting
  fix(auth): resolve login session timeout issue
  perf(api): optimize article search query
  docs(readme): update installation instructions
  style(ui): improve article card responsive design
  refactor(db): simplify wiki article model schema

Breaking Changes:  Add "BREAKING CHANGE:" in PR description
Skip Changelog:    Add "[skip ci]" to PR title
```

### Commit Types Reference

- **feat**: New feature for users
- **fix**: Bug fix for users
- **perf**: Performance improvement
- **refactor**: Code refactoring (no functional changes)
- **style**: Code style/formatting changes
- **test**: Adding or updating tests
- **docs**: Documentation changes
- **build**: Build system or dependency changes
- **ci**: CI/CD configuration changes
- **chore**: Maintenance tasks

See `.github/pull_request_title_conventions.md` for detailed specification.

---

## What Runs When You Open a PR

### Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                            PR OPENED / UPDATED                               │
└─────────────────────────────────┬────────────────────────────────────────────┘
                                  │
      ┌───────────────────────────┴───────────────────────┐
      ▼                                                   ▼
┌───────────────────────────┐                     ┌───────────────────────────┐
│  ci-pr.yml                │                     │  deploy-preview.yml       │
│  (main CI workflow)       │                     │  (preview deployment)     │
└─────────────┬─────────────┘                     └───────────────────────────┘
              │
              ▼
┌───────────────────────────┐
│  setup-and-build          │
│  ├─ Checkout code         │
│  ├─ Setup Node.js         │
│  ├─ Install dependencies  │
│  └─ Build Next.js app     │
└─────────────┬─────────────┘
              │
    ┌─────────┼─────────┬─────────────┬─────────────┐
    │         │         │             │             │
    ▼         ▼         ▼             ▼             ▼
┌───────┐ ┌───────┐ ┌───────┐ ┌────────────┐ ┌────────────┐
│ Unit  │ │ Type  │ │ Lint  │ │ E2E Tests  │ │ Security   │
│ Tests │ │ Check │ │Format │ │ Playwright │ │   Scan     │
└───┬───┘ └───┬───┘ └───┬───┘ └─────┬──────┘ └─────┬──────┘
    │         │         │           │              │
    │         │         │           │              │
    └─────────┴─────────┴───────────┴──────────────┘
                        │
                        ▼
            ┌──────────────────────────┐
            │  required-checks         │
            │  (merge gate)            │
            └──────────────────────────┘
```

### Path-Filtered Workflows

Optimize CI by running specific checks only when relevant files change:

| Files Changed                    | Additional Checks         | Notes                       |
|----------------------------------|---------------------------|-----------------------------|
| `app/admin/**`                   | Admin E2E tests           | Admin panel functionality   |
| `app/(client)/**`                | Client E2E tests          | Public wiki platform        |
| `lib/markdown/**`                | Markdown processing tests | Content rendering           |
| `models/**`, `lib/db/**`         | Database integration tests| Data layer validation       |
| `.github/**`                     | Security scan             | Workflow security audit     |
| `package.json`, `package-lock.json` | Dependency audit       | Security vulnerabilities    |

### On PR Events

| Event                      | Workflow                    | Purpose                      |
|----------------------------|-----------------------------|------------------------------|
| PR opened                  | `ci-pr.yml`                 | Run all quality checks       |
| PR updated                 | `ci-pr.yml`                 | Re-run checks on new commits |
| PR labeled `preview`       | `deploy-preview.yml`        | Deploy preview environment   |
| PR closed                  | Cleanup workflows           | Remove preview deployments   |

---

## ci-main.yml

Runs on push to `main` branch:

```
Push to main
├─ build-next-js (populate cache)
├─ unit-test (with coverage)
├─ type-check
├─ lint
└─ notify-on-failure (Slack/Email)
```

This ensures main branch always stays healthy before deployment.

---

## Deployment Workflows

### deploy-preview.yml

Deploys preview environments for every PR:

```yaml
Trigger: PR opened/updated
Steps:
  1. Build Next.js app
  2. Deploy to Vercel preview
  3. Comment preview URL on PR
  4. Run smoke tests on preview
```

**Environment**: Vercel Preview (auto-generated URL)

### deploy-production.yml

Deploys to production when code is merged to main:

```yaml
Trigger: Push to main branch
Steps:
  1. Build production bundle
  2. Run production smoke tests
  3. Deploy to Vercel production
  4. Create Sentry release
  5. Notify deployment status
  6. Run post-deployment checks
```

**Environment**: Production URL (to be configured)

---

## Testing Workflows

### test-unit.yml

Runs unit tests for all components and utilities:

```yaml
Strategy:
  - Node.js version: 20.x, 22.x
  - Coverage: enabled on Node 22.x
  
Tests:
  - React component tests (React Testing Library)
  - API route tests
  - Utility function tests
  - Database model tests
  
Coverage threshold: 80%
```

### test-e2e.yml

Runs end-to-end tests with Playwright:

```yaml
Strategy:
  - Browsers: Chromium, Firefox, WebKit
  - Shards: 4 (parallel execution)
  
Test suites:
  - Authentication flows
  - Article creation and editing
  - Content rendering
  - Admin panel operations
  - Search functionality
  
Artifacts:
  - Screenshots on failure
  - Video recordings
  - Playwright trace files
```

---

## Code Quality Workflows

### lint-and-format.yml

Ensures code style consistency:

```yaml
Checks:
  - ESLint (with Next.js config)
  - Prettier formatting
  - TypeScript strict mode
  - Import sorting
  
Auto-fix: Available via PR comment `/fix-lint`
```

---

## Security Workflows

### security-scan.yml

Scheduled daily and on PR changes:

```yaml
Scans:
  1. npm audit (dependency vulnerabilities)
  2. CodeQL analysis (code security)
  3. Secrets scanning (prevent leaked credentials)
  4. OWASP dependency check
  
Reports to: GitHub Security tab + Slack notifications
```

### Dependency Security

- **npm audit**: Run on every PR
- **Dependabot**: Auto-creates PRs for security updates
- **License compliance**: Checks for incompatible licenses

---

## Scheduled Jobs

| Schedule (UTC)     | Workflow                 | Purpose                       |
|--------------------|--------------------------|-------------------------------|
| Daily 00:00        | `security-scan.yml`      | Security vulnerability scan   |
| Daily 02:00        | `backup-database.yml`    | MongoDB backup to S3/Azure    |
| Monday 00:00       | `dependency-update.yml`  | Update non-security deps      |
| Sunday 00:00       | `cleanup-previews.yml`   | Remove stale preview deploys  |

---

## Custom Actions

Composite actions in `.github/actions/`:

### setup-node

```yaml
Description: Setup Node.js with npm caching
Inputs:
  node-version: '20.x' (default)
  cache-dependency-path: 'package-lock.json'
  
Steps:
  1. Setup Node.js
  2. Restore npm cache
  3. Install dependencies
  4. Save cache for future runs
```

### deploy-preview

```yaml
Description: Deploy to Vercel preview environment
Inputs:
  vercel-token: required
  vercel-org-id: required
  vercel-project-id: required
  
Outputs:
  preview-url: Deployed preview URL
```

---

## Environment Variables & Secrets

### Required Secrets

| Secret                | Purpose                    | Used By                  |
|-----------------------|----------------------------|--------------------------|
| `VERCEL_TOKEN`        | Vercel deployment          | deploy-* workflows       |
| `VERCEL_ORG_ID`       | Vercel organization        | deploy-* workflows       |
| `VERCEL_PROJECT_ID`   | Vercel project             | deploy-* workflows       |
| `MONGODB_URI`         | Database connection        | test-e2e.yml             |
| `NEXTAUTH_SECRET`     | Authentication secret      | test-e2e.yml             |
| `SENTRY_AUTH_TOKEN`   | Error tracking             | deploy-production.yml    |
| `SLACK_WEBHOOK`       | Notifications              | All workflows            |

### Environment Variables

| Variable              | Value                      | Description              |
|-----------------------|----------------------------|--------------------------|
| `NODE_ENV`            | `test`/`production`        | Runtime environment      |
| `NEXTAUTH_URL`        | Preview/Production URL     | Authentication callback  |
| `COVERAGE_THRESHOLD`  | `80`                       | Minimum code coverage    |

---

## Workflow Best Practices

### 1. Caching Strategy

```yaml
# Cache node_modules for faster installs
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### 2. Matrix Testing

```yaml
# Test across multiple Node versions
strategy:
  matrix:
    node-version: [20.x, 22.x]
    os: [ubuntu-latest, windows-latest]
```

### 3. Conditional Execution

```yaml
# Skip CI on documentation-only changes
if: "!contains(github.event.head_commit.message, '[skip ci]')"
```

### 4. Artifact Upload

```yaml
# Save test results and coverage
- uses: actions/upload-artifact@v4
  if: always()
  with:
    name: test-results
    path: |
      coverage/
      playwright-report/
```

---

## Notification Strategy

### Success Notifications

- ✅ Production deployment → Slack #deployments channel
- ✅ Weekly dependency updates → PR created

### Failure Notifications

- ❌ Main branch CI failure → Slack #alerts + Email
- ❌ Production deployment failure → Slack #critical + PagerDuty
- ❌ Security scan critical → Slack #security + Email

---

## Performance Optimization

### Build Optimization

1. **Incremental Builds**: Only rebuild changed packages
2. **Parallel Jobs**: Run tests in parallel (max 4 concurrent)
3. **Selective Testing**: Path-based test filtering
4. **Layer Caching**: Docker layer caching for E2E tests

### Cost Optimization

- Use GitHub-hosted runners for simple jobs
- Reserve self-hosted runners for heavy workloads
- Configure timeouts to prevent runaway jobs
- Clean up artifacts after 30 days

---

## Troubleshooting

### Common Issues

#### 1. CI Fails on PR but Passes Locally

**Problem**: Different Node.js or npm versions  
**Solution**: Check `.nvmrc` file and use matching version

#### 2. E2E Tests Flaky

**Problem**: Race conditions or timing issues  
**Solution**: Increase timeouts, use `waitFor` assertions

#### 3. Build Cache Not Working

**Problem**: Cache key mismatch  
**Solution**: Verify `hashFiles('package-lock.json')` is correct

#### 4. Deployment Fails

**Problem**: Environment variables not set  
**Solution**: Check Vercel project settings match GitHub secrets

### Debug Mode

Enable debug logging by adding to workflow:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

---

## Migration from Other CI Systems

### From GitHub Actions v2 → v4

Key changes:
- `actions/checkout@v2` → `@v4`
- `actions/setup-node@v2` → `@v4`
- `actions/cache@v2` → `@v4`

### From Travis CI

Mapping:
- `.travis.yml` → `.github/workflows/ci-pr.yml`
- `script` → `run` commands
- `cache: npm` → `actions/cache`

---

## Future Enhancements

### Planned Features

1. **Visual Regression Testing**: Chromatic for UI components
2. **Performance Budgets**: Lighthouse CI integration
3. **A/B Testing Deployments**: Canary releases
4. **Auto-merge**: Dependabot PRs after passing checks
5. **Kubernetes**: Container orchestration for scaling

### Experimental

- **AI-Powered Code Review**: GitHub Copilot for PR reviews
- **Chaos Engineering**: Automated failure injection
- **Progressive Web App**: PWA deployment pipeline

---

## Resources

### Documentation

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Platform](https://vercel.com/docs)
- [Playwright Testing](https://playwright.dev/)

### Internal Docs

- **AGENTS.md**: AI agent development guidelines
- **README.md**: Project setup instructions
- **FEATURES.md**: Complete feature specifications

---

## Support

For issues with CI/CD:

1. Check workflow logs in GitHub Actions tab
2. Review this documentation
3. Contact DevOps team
4. Create issue in repository

**Remember**: Green builds = happy developers! Keep the pipeline fast and reliable. 🚀
