# 📋 Versioning Guide

This project follows [Semantic Versioning](https://semver.org/) (SemVer) with the format `MAJOR.MINOR.PATCH`.

## 🎯 Quick Reference

### Version Number Meaning

- **MAJOR** (2.0.0): Breaking API changes, incompatible updates
- **MINOR** (1.1.0): New features, backwards compatible
- **PATCH** (1.0.1): Bug fixes, documentation, performance improvements

### Quick Release Commands

```bash
# Bug fixes and small improvements
npm run release:patch    # 1.0.0 → 1.0.1

# New features (backwards compatible)
npm run release:minor    # 1.0.0 → 1.1.0

# Breaking changes
npm run release:major    # 1.0.0 → 2.0.0
```

### Advanced Release (with safety checks)

```bash
./scripts/release.sh patch   # or minor/major
```

### Check Version Info

```bash
node scripts/version.js check
```

## 📁 Versioning System Files

- **CHANGELOG.md** - Tracks all changes following Keep a Changelog format
- **scripts/release.sh** - Automated release script with safety checks
- **scripts/version.js** - Utility to check version info
- **package.json** - Version scripts and lifecycle hooks
- **.github/release.yml** - GitHub release automation configuration
- **.github/RELEASE_TEMPLATE.md** - Template for GitHub releases

## 🔄 Release Process

### 1. Update CHANGELOG.md

Before creating a new release, update the `CHANGELOG.md` file:

1. Move items from `[Unreleased]` section to a new version section
2. Add the release date
3. Create a new empty `[Unreleased]` section
4. Update the comparison links at the bottom

### 2. Create a Release

Use the provided npm scripts or release script:

```bash
# Option 1: npm scripts (simple)
npm run release:minor

# Option 2: Release script (with checks)
./scripts/release.sh minor
```

### 3. What Happens During Release

When you run a release command:

1. **Pre-version**: Builds the project (`npm run build`)
2. **Version**: Updates `package.json` version and creates a git tag
3. **Post-version**: Pushes commits and tags to remote repository

### 4. Manual Release Process (if needed)

```bash
# 1. Update CHANGELOG.md manually
# 2. Commit your changes
git add CHANGELOG.md
git commit -m "docs: update changelog for v1.1.0"

# 3. Create version tag
npm version minor  # or patch/major

# 4. Push to remote
git push origin main --tags

# 5. Publish to npm (if ready)
npm publish
```

## 📝 Complete Workflow

1. **Development**: Make changes, commit to main branch
2. **Update CHANGELOG.md**: Move unreleased items to new version section
3. **Create Release**: Run release script or npm command
4. **Automatic**: Builds, commits, tags, and pushes
5. **GitHub**: Create release notes (optional)
6. **Publish**: `npm publish` when ready

## 📋 CHANGELOG.md Format

Follow [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
## [1.1.0] - 2025-01-28

### Added

- New feature descriptions

### Changed

- Changes to existing functionality

### Deprecated

- Features that will be removed in future versions

### Removed

- Features removed in this version

### Fixed

- Bug fixes

### Security

- Security-related changes
```

## 📖 Release Type Examples

### Patch Release (1.0.0 → 1.0.1)

- Bug fixes
- Documentation updates
- Performance improvements
- Internal code cleanup

### Minor Release (1.0.0 → 1.1.0)

- New cipher methods
- Additional CLI options
- New utility functions
- Backwards-compatible API extensions

### Major Release (1.0.0 → 2.0.0)

- Breaking API changes
- Removing deprecated features
- Changing function signatures
- Major architectural changes

## 🏷️ Git Tags

Each release creates a git tag (e.g., `v1.0.0`). These tags:

- Mark specific points in project history
- Enable easy rollbacks
- Create release points for GitHub releases
- Allow users to install specific versions

## 📦 npm Publishing

Before publishing to npm:

1. Ensure CHANGELOG.md is updated
2. Run tests (when implemented)
3. Build the project: `npm run build`
4. Publish: `npm publish`

The `prepublishOnly` script automatically builds before publishing.

## 🎉 Example Release Flow

```bash
# 1. Update CHANGELOG.md with your changes
# 2. Run release
./scripts/release.sh minor

# Output:
# 🚀 Starting minor release process...
# 🧪 Running tests...
# 🔨 Building project...
# 📦 Current version: 1.0.0
# 🏷️ Creating minor release...
# ✅ Version updated to: 1.1.0
# 📝 Committing changes...
# 🏷️ Creating git tag...
# ⬆️  Pushing to remote...
# 🎉 Release 1.1.0 completed successfully!
```

## ✅ System Status

Project now has:

- ✅ Semantic versioning setup
- ✅ Automated release process
- ✅ Git tagging
- ✅ Changelog tracking
- ✅ GitHub integration
- ✅ npm scripts
- ✅ Documentation
