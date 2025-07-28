# GitHub Release Template

When creating a new release on GitHub, use this template:

## Release Title Format

```
v{version} - {Brief Description}
```

**Examples:**

- `v1.1.0 - Added custom symbol mappings`
- `v1.0.1 - Bug fixes and performance improvements`
- `v2.0.0 - Breaking API changes`

## Release Description Template

````markdown
## 🔐 Password Obscura v{version}

{Brief description of the release}

### 🆕 What's New

- Feature 1
- Feature 2

### 🐛 Bug Fixes

- Fix 1
- Fix 2

### 🔧 Improvements

- Improvement 1
- Improvement 2

### 💥 Breaking Changes (for major releases only)

- Breaking change 1
- Breaking change 2

### 📦 Installation

```bash
npm install password-obscura@{version}
```
````

### 📖 Documentation

- [README](https://github.com/angga-22/password-obscura#readme)
- [Changelog](https://github.com/angga-22/password-obscura/blob/main/CHANGELOG.md)

### 🔗 Links

- [npm package](https://www.npmjs.com/package/password-obscura)
- [Full Changelog](https://github.com/angga-22/password-obscura/compare/{previous-version}...v{version})

````

## Auto-Generated Release Notes

GitHub can auto-generate release notes. To configure this, create `.github/release.yml`:

```yaml
changelog:
  categories:
    - title: 🆕 New Features
      labels:
        - feature
        - enhancement
    - title: 🐛 Bug Fixes
      labels:
        - bug
        - fix
    - title: 📖 Documentation
      labels:
        - documentation
    - title: 🔧 Maintenance
      labels:
        - maintenance
        - chore
  exclude:
    labels:
      - ignore-for-release
````
