# Versioning Guide

This project follows [Semantic Versioning](https://semver.org/) (SemVer) with the format `MAJOR.MINOR.PATCH`.

## Version Number Meaning

- **MAJOR** version when you make incompatible API changes
- **MINOR** version when you add functionality in a backwards compatible manner
- **PATCH** version when you make backwards compatible bug fixes

## Release Process

### 1. Update CHANGELOG.md

Before creating a new release, update the `CHANGELOG.md` file:

1. Move items from `[Unreleased]` section to a new version section
2. Add the release date
3. Create a new empty `[Unreleased]` section
4. Update the comparison links at the bottom

### 2. Create a Release

Use the provided npm scripts to create releases:

```bash
# For bug fixes and small improvements
npm run release:patch    # 1.0.0 → 1.0.1

# For new features (backwards compatible)
npm run release:minor    # 1.0.0 → 1.1.0

# For breaking changes
npm run release:major    # 1.0.0 → 2.0.0
```

### 3. What Happens During Release

When you run a release command:

1. **Pre-version**: Builds the project (`npm run build`)
2. **Version**: Updates `package.json` version and creates a git tag
3. **Post-version**: Pushes commits and tags to remote repository

### 4. Manual Release Process

If you prefer manual control:

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

## CHANGELOG.md Format

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

## Examples

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

## Git Tags

Each release creates a git tag (e.g., `v1.0.0`). These tags:

- Mark specific points in project history
- Enable easy rollbacks
- Create release points for GitHub releases
- Allow users to install specific versions

## npm Publishing

Before publishing to npm:

1. Ensure CHANGELOG.md is updated
2. Run tests (when implemented)
3. Build the project: `npm run build`
4. Publish: `npm publish`

The `prepublishOnly` script automatically builds before publishing.
