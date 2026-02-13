@../AGENTS.md

## .github Quick Reference

This folder contains DAKIA Wiki Bot's GitHub Actions CI/CD infrastructure and project documentation.

### Key Files

| File/Folder | Purpose |
|-------------|---------|
| `WORKFLOWS.md` | Complete CI/CD documentation with architecture diagrams |
| `AGENTS.md` | AI agent development guide (referenced above) |
| `copilot-instructions.md` | GitHub Copilot coding standards and conventions |
| `workflows/` | GitHub Actions workflow definitions |
| `actions/` | Reusable composite actions |
| `scripts/` | Automation scripts (version bump, changelog) |
| `ISSUE_TEMPLATE/` | Bug report and feature request templates |

### Workflow Naming Convention

| Prefix | Purpose | Example |
|--------|---------|---------|
| `ci-` | Continuous integration | `ci-pr.yml`, `ci-main.yml` |
| `deploy-` | Deployment workflows | `deploy-production.yml`, `deploy-preview.yml` |
| `test-` | Testing workflows | `test-unit.yml`, `test-e2e.yml` |
| `lint-` | Code quality checks | `lint-and-format.yml` |
| `security-` | Security scanning | `security-scan.yml` |
| `dependency-` | Dependency management | `dependency-update.yml` |

### Project Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Styling**: Bootstrap 5 + React Bootstrap
- **Markdown**: unified, remark, rehype
- **Auth**: NextAuth.js
- **Package Manager**: npm

### Common Development Tasks

**Start development server:**
```powershell
npm run dev
```

**Run tests:**
```powershell
npm test              # Unit tests
npm run test:e2e      # E2E tests
```

**Check code quality:**
```powershell
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run format        # Prettier
```

**Build for production:**
```powershell
npm run build
```

### Common CI/CD Tasks

**Add a new workflow:**
1. Create `.yml` file in `workflows/`
2. Follow naming convention above
3. Document in `WORKFLOWS.md`

**Add automation script:**
1. Create `.js` file in `scripts/`
2. Document purpose in `WORKFLOWS.md`
3. Add to workflow if needed

**Deploy preview:**
- Automatically triggers on PR creation
- Preview URL commented on PR

**Deploy production:**
- Automatically triggers on merge to `main`
- Runs smoke tests before deployment

### Important Conventions

**Code Style:**
- All code in English (variables, functions, comments)
- All UI text in Vietnamese (primary) with English support
- Use TypeScript strict mode
- Never use `any` type

**Git Workflow:**
- Branch naming: `feature/*`, `fix/*`, `docs/*`, `refactor/*`
- Commit format: Conventional Commits
- PR title: `<type>(<scope>): <summary>`

**Security:**
- Always hash passwords with bcrypt (salt >= 10)
- Never commit `.env.local`
- Validate all user input
- Use environment variables for secrets

### Quick Reference Links

**Full Documentation:**
- [WORKFLOWS.md](WORKFLOWS.md) - Complete CI/CD guide
- [AGENTS.md](../AGENTS.md) - Development guidelines
- [README.md](../README.md) - Project overview
- [FEATURES.md](../FEATURES.md) - Feature specifications

**CI/CD Details:**
- Architecture diagrams → `WORKFLOWS.md`
- Deployment strategy → `WORKFLOWS.md`
- Testing strategy → `WORKFLOWS.md`
- Security workflows → `WORKFLOWS.md`
- Scheduled jobs → `WORKFLOWS.md`

### Directory Structure

```
dakia-wiki-bot/
├── app/              # Next.js App Router
│   ├── (client)/    # Public wiki platform
│   ├── admin/       # Admin panel
│   └── api/         # API routes
├── lib/             # Utilities
├── models/          # MongoDB models
├── types/           # TypeScript types
└── public/          # Static assets
```

### Environment Variables

Required for CI/CD:
- `VERCEL_TOKEN` - Deployment
- `MONGODB_URI` - Database
- `NEXTAUTH_SECRET` - Authentication
- `SENTRY_AUTH_TOKEN` - Error tracking
- `SLACK_WEBHOOK` - Notifications

See `WORKFLOWS.md` for complete list.

---

**Quick Start**: New to the project? Read [AGENTS.md](../AGENTS.md) first, then [WORKFLOWS.md](WORKFLOWS.md) for CI/CD setup.