# Batch Script Utilities - DAKIA Academy

This folder contains utility batch scripts for managing Git operations and development workflow in the DAKIA Academy project.

## 📋 Table of Contents

- [Overview](#overview)
- [Git Utilities](#git-utilities)
  - [git-cleaner.bat](#git-cleanerbat)
  - [git-delete-branch.bat](#git-delete-branchbat)
  - [git-fetch-all.bat](#git-fetch-allbat)
  - [git-merge-main.bat](#git-merge-mainbat)
  - [git-pull-all.bat](#git-pull-allbat)
  - [git-push-force.bat](#git-push-forcebat)
  - [git-recurse-submodules.bat](#git-recurse-submodulesbat)
- [Development Utilities](#development-utilities)
  - [run-dev.bat](#run-devbat)
- [Prerequisites](#prerequisites)
- [Usage Guidelines](#usage-guidelines)

## Overview

These batch scripts automate common Git operations and development tasks for Windows environments. All scripts are designed to be run from the project root directory.

**Location:** `.bin/`

## Git Utilities

### git-cleaner.bat

**Purpose:** Clean up the local Git repository by performing aggressive garbage collection.

**Description:**
- Removes obsolete objects and compresses repository data
- Prunes unreferenced objects immediately
- Uses aggressive optimization for better compression
- Helps reduce `.git` directory size

**Usage:**
```powershell
.\.bin\git-cleaner.bat
```

**Commands Executed:**
```bash
git gc --prune=now --force --aggressive
```

**When to Use:**
- After deleting large files or branches
- When repository size is too large
- Periodic maintenance (monthly/quarterly)
- Before archiving or backing up repository

**Author:** Nguyen Quy  
**Version:** 1.0  
**Last Updated:** 2025-11-27

---

### git-delete-branch.bat

**Purpose:** List or delete Git branches with safety checks.

**Description:**
- Lists all local and remote branches
- Safely deletes merged branches
- Prevents deletion of `main` and `master` branches
- Prompts for confirmation before force deletion

**Usage:**
```powershell
# List all branches (local and remote)
.\.bin\git-delete-branch.bat
.\.bin\git-delete-branch.bat --list

# Delete a specific branch
.\.bin\git-delete-branch.bat --del branch_name
```

**Examples:**
```powershell
# List branches
.\.bin\git-delete-branch.bat

# Delete merged feature branch
.\.bin\git-delete-branch.bat --del feature/user-authentication

# Delete bug fix branch
.\.bin\git-delete-branch.bat --del fix/login-bug
```

**Safety Features:**
- First attempts safe delete (`-d`) - only works if branch is merged
- If safe delete fails, prompts user before force delete (`-D`)
- Prevents deletion of `main` and `master` branches
- Displays clear error messages

**Author:** Nguyen Quy  
**Version:** 1.1  
**Last Updated:** 2026-02-04

---

### git-fetch-all.bat

**Purpose:** Fetch all updates from remote repositories and clean up obsolete references.

**Description:**
- Fetches from all configured remotes
- Prunes deleted remote branches
- Removes obsolete remote tags
- Updates submodules recursively
- Forces fetch to overwrite local refs

**Usage:**
```powershell
.\.bin\git-fetch-all.bat
```

**Commands Executed:**
```bash
git fetch --prune --prune-tags --force --verbose --tags --recurse-submodules
```

**Flags Explained:**
- `--prune`: Remove remote-tracking branches that no longer exist
- `--prune-tags`: Remove tags that no longer exist on remote
- `--force`: Force update of local refs
- `--verbose`: Show detailed output
- `--tags`: Fetch all tags from remote
- `--recurse-submodules`: Update submodules

**When to Use:**
- Before starting work on a new feature
- To sync with remote repository changes
- When checking for deleted remote branches
- Regular synchronization with team

**Author:** Nguyen Quy  
**Version:** 1.0  
**Last Updated:** 2026-02-04

---

### git-merge-main.bat

**Purpose:** Merge changes from the main branch into the current working branch.

**Description:**
- Fetches latest updates from origin
- Merges `origin/main` into current branch
- Automatically commits merge if successful
- Pushes changes back to origin
- Detects and reports merge conflicts

**Usage:**
```powershell
.\.bin\git-merge-main.bat
```

**Workflow:**
1. Shows current directory and branch
2. Fetches latest from origin with cleanup
3. Merges `origin/main` into current branch
4. If merge successful:
   - Commits changes with message "Merge from origin/main"
   - Pushes to origin
5. If merge conflict:
   - Reports conflict
   - User must resolve manually

**Example Output:**
```
=== Current Directory: D:\nqdev-wps\github\nguyenquy0710\dakia-academy
=== You are on branch: feature/user-auth
=== Fetching latest from origin ===
...
=== Merging 'origin/main' into feature/user-auth ===
...
=== Committing merge changes ===
=== Pushing to origin/feature/user-auth ===
```

**When to Use:**
- Keep feature branch up-to-date with main
- Before creating a pull request
- Resolving diverged branches
- Periodic synchronization during long-running features

**Author:** Nguyen Quy  
**Version:** 1.0  
**Last Updated:** 2025-10-07

---

### git-pull-all.bat

**Purpose:** Pull latest changes from remote repository with detailed output.

**Description:**
- Simple pull operation with statistics
- Verbose output for transparency
- Recursively updates submodules

**Usage:**
```powershell
.\.bin\git-pull-all.bat
```

**Commands Executed:**
```bash
git pull --stat --verbose --recurse-submodules
```

**Flags Explained:**
- `--stat`: Show diffstat of changes
- `--verbose`: Show detailed output
- `--recurse-submodules`: Update submodules

**When to Use:**
- Quick sync with remote branch
- Update local repository with team changes
- Before starting daily work

**Author:** Nguyen Quy

---

### git-push-force.bat

**Purpose:** Force push changes to remote repository with secret push protection skip.

**Description:**
- Force pushes local changes to remote
- Skips secret push protection checks
- **⚠️ WARNING: Use with extreme caution!**

**Usage:**
```powershell
.\.bin\git-push-force.bat
```

**Commands Executed:**
```bash
git push -o secret_push_protection.skip_all
```

**⚠️ Important Warnings:**
- This **OVERWRITES** remote history
- Can cause data loss for collaborators
- Use only when you know what you're doing
- Consider using `git push --force-with-lease` instead for safety

**When to Use (Carefully):**
- After rebasing local commits
- Fixing commit history on feature branches
- Emergency fixes on personal branches
- **NEVER** on shared branches like `main`

**Author:** Nguyen Quy  
**Version:** 1.0  
**Last Updated:** 2025-11-27

---

### git-recurse-submodules.bat

**Purpose:** Clone a repository with all its submodules.

**Description:**
- Clones repository and initializes all submodules recursively
- Simple template for cloning projects with submodules

**Usage:**
```powershell
# Edit the script to add repository URL, then run:
.\.bin\git-recurse-submodules.bat
```

**Commands Executed:**
```bash
git clone --recurse-submodules <repository-url>
```

**Note:** This is a template script. You need to add the repository URL before using.

**Author:** Nguyen Quy

---

## Development Utilities

### run-dev.bat

**Purpose:** Start the development environment with optional code quality checks.

**Description:**
- Checks and starts MongoDB service (nqdev-mongodb-service)
- Installs npm dependencies if needed
- Optionally runs code formatting
- Optionally runs linting with auto-fix
- Optionally runs tests with coverage report
- Starts Next.js development server

**Usage:**
```powershell
# Start development server only
.\.bin\run-dev.bat

# Run code formatter before starting
.\.bin\run-dev.bat --format

# Run linter with auto-fix before starting
.\.bin\run-dev.bat --lint

# Run tests and open coverage report
.\.bin\run-dev.bat --test

# Combine multiple options
.\.bin\run-dev.bat --format --lint
.\.bin\run-dev.bat --format --lint --test
```

**Workflow:**

1. **Parse Arguments:**
   - `--format`: Run code formatter
   - `--lint`: Run ESLint with auto-fix
   - `--test`: Run tests and open coverage report

2. **MongoDB Service Check:**
   - Checks if `nqdev-mongodb-service` is running
   - Starts service if not running (using nssm)
   - Waits 5 seconds for service to initialize

3. **Dependency Installation:**
   - Checks if `node_modules` exists
   - Runs `npm install` if missing
   - Uses flags: `--force --no-audit --no-fund --loglevel error`

4. **Code Quality (if requested):**
   - **Format:** Runs `npm run format`
   - **Lint:** Runs `npm run lint:fix`
   - **Test:** Runs `npm run test` and opens coverage report

5. **Development Server:**
   - Runs `npm run dev`
   - Starts Next.js on http://localhost:3000

**Examples:**

```powershell
# Clean start - just run dev server
.\.bin\run-dev.bat

# Format code and start
.\.bin\run-dev.bat --format

# Full quality check before starting
.\.bin\run-dev.bat --format --lint --test
```

**Dependencies:**
- Node.js and npm
- MongoDB
- nssm (Non-Sucking Service Manager) - for MongoDB service management
- Project npm packages defined in `package.json`

**Error Handling:**
- Exits if MongoDB service fails to start
- Exits if npm install fails
- Exits if any quality check fails
- Shows clear error messages for troubleshooting

**Author:** Nguyen Quy  
**Version:** 1.3  
**Last Updated:** 2025-10-07

---

## Prerequisites

### Required Software

1. **Git:** Version control system
   - Download: https://git-scm.com/download/win
   - Verify: `git --version`

2. **Node.js & npm:** JavaScript runtime and package manager
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`
   - Recommended: Node.js 18.x or higher

3. **MongoDB:** Database system
   - Download: https://www.mongodb.com/try/download/community
   - Verify: `mongod --version`

4. **nssm:** Windows service manager (for run-dev.bat)
   - Download: https://nssm.cc/download
   - Required for MongoDB service management

### MongoDB Service Setup

For `run-dev.bat` to work, you need to set up MongoDB as a Windows service:

```powershell
# Using nssm
nssm install nqdev-mongodb-service "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" "--config C:\path\to\mongod.cfg"

# Or using native Windows service
mongod --install --serviceName "nqdev-mongodb-service" --dbpath "C:\data\db" --logpath "C:\data\log\mongod.log"
```

### Environment Setup

1. Clone the repository
2. Ensure all batch files have execute permissions
3. Set up environment variables in `.env.local`
4. Configure MongoDB connection string

---

## Usage Guidelines

### General Best Practices

1. **Always run from project root directory:**
   ```powershell
   # Correct
   cd D:\nqdev-wps\github\nguyenquy0710\dakia-academy
   .\.bin\git-fetch-all.bat

   # Incorrect
   cd .bin
   .\git-fetch-all.bat
   ```

2. **Check Git repository status:**
   - Most scripts assume you're in a Git repository
   - Scripts will fail gracefully if not in a Git repo

3. **Read script output:**
   - Scripts provide verbose output for transparency
   - Check for errors or warnings
   - Understand what each script is doing

4. **Use appropriate scripts for tasks:**
   - Don't use `git-push-force.bat` unless absolutely necessary
   - Prefer `git-delete-branch.bat` over manual branch deletion
   - Use `run-dev.bat --format --lint` before committing

### Development Workflow Example

```powershell
# Start your day - sync with remote
.\.bin\git-fetch-all.bat

# Create new feature branch
git checkout -b feature/new-feature

# Work on your code...

# Before committing - check code quality
.\.bin\run-dev.bat --format --lint --test

# Commit your changes
git add .
git commit -m "feat(feature): implement new feature"

# Merge latest main changes
.\.bin\git-merge-main.bat

# Push to remote
git push origin feature/new-feature

# After merge - cleanup
.\.bin\git-delete-branch.bat --del feature/new-feature
```

### Maintenance Workflow

```powershell
# Weekly - clean up repository
.\.bin\git-cleaner.bat

# Monthly - sync and prune
.\.bin\git-fetch-all.bat
git branch -vv | findstr ": gone]" # Check for deleted remote branches
```

### Troubleshooting

**MongoDB service won't start:**
```powershell
# Check service status
sc query nqdev-mongodb-service

# Manually start service
nssm start nqdev-mongodb-service

# Check MongoDB logs
type C:\data\log\mongod.log
```

**Git commands fail:**
```powershell
# Verify Git installation
git --version

# Check if in Git repository
git rev-parse --is-inside-work-tree
```

**npm install fails:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s /q node_modules
npm install
```

---

## Security Considerations

1. **Never commit `.env.local`** - Contains sensitive credentials
2. **Use `git-push-force.bat` carefully** - Can overwrite team's work
3. **Review merge conflicts** before committing
4. **Verify MongoDB service security** - Ensure proper authentication
5. **Keep dependencies updated** - Run `npm audit` regularly

---

## Contributing

When adding new batch scripts:

1. **Follow naming convention:** `<category>-<action>.bat`
2. **Add header comments:** Author, description, usage, version
3. **Use UTF-8 encoding:** `chcp 65001 > nul`
4. **Provide verbose output:** Help users understand what's happening
5. **Handle errors gracefully:** Check for prerequisites, show clear messages
6. **Update this SKILL.md:** Document new scripts thoroughly
7. **Test on clean environment:** Ensure scripts work for new developers

---

## References

- [Git Documentation](https://git-scm.com/doc)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [nssm Documentation](https://nssm.cc/usage)
- [DAKIA Academy GitHub](https://github.com/nguyenquy0710/dakia-academy)

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | Nguyen Quy | Initial SKILL.md documentation |

---

**Last Updated:** 2026-02-11  
**Maintained by:** Nguyen Quy  
**Project:** DAKIA Academy
