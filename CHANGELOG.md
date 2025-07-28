# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Development workflow improvements

### Changed

- Internal code optimizations

### Fixed

- Minor bug fixes and improvements

## [1.0.0] - 2025-01-28

### Added

- Initial release of password-obscura
- Four cipher methods: Caesar, ROT13, Symbol Map, and Mirror (Atbash)
- `obscure()` function to encode strings
- `reveal()` function to decode strings
- Command-line interface (CLI) tool
- TypeScript support with full type definitions
- Comprehensive documentation and examples
- Default emoji/symbol mapping for visual obfuscation
- Custom symbol mapping support
- MIT license

### Features

- **Caesar Cipher**: Customizable shift-based encoding (default shift: 3)
- **ROT13**: Fixed 13-character shift encoding
- **Symbol Map**: Character-to-emoji/symbol replacement with custom mapping support
- **Mirror (Atbash)**: Letter mirroring cipher (A↔Z, B↔Y, etc.)
- **CLI Tool**: Command-line interface supporting all methods
- **TypeScript**: Full TypeScript implementation with type safety
- **Zero Dependencies**: Lightweight package with no runtime dependencies
- **Browser Compatible**: Works in both Node.js and browser environments

### CLI Commands

- `npx password-obscura encode <text> --method <method> [--shift <number>]`
- `npx password-obscura decode <text> --method <method> [--shift <number>]`

### API

- `obscure(input: string, options: ObscureOptions): string`
- `reveal(input: string, options: ObscureOptions): string`
- Support for methods: 'caesar', 'rot13', 'symbolMap', 'mirror'
- Configurable options for shift values and custom symbol mappings

[Unreleased]: https://github.com/angga-22/password-obscura/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/angga-22/password-obscura/releases/tag/v1.0.0
