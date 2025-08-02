# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.2] - 2025-08-02

### Fixed

- **Multi-Table Algorithm**: Fixed decryption issues with Fibonacci and Prime shift patterns
- **Advanced Multi-Layer Cipher**: Improved layer composition and reversibility
- **Shift Pattern Edge Cases**: Added modular arithmetic to prevent overflow in large Fibonacci/Prime values
- **Algorithm Consistency**: Enhanced multi-table character mapping for perfect encode/decode symmetry

### Changed

- **Documentation**: Comprehensive README update with all 7 cipher methods, performance benchmarks, and troubleshooting
- **Versioning System**: Consolidated VERSIONING.md and VERSIONING_SUMMARY.md into single comprehensive guide
- **Code Quality**: Improved error handling and edge case management in dynamic cipher algorithms

### Added

- **Performance Benchmarks**: Added real-world performance metrics for all cipher methods
- **Troubleshooting Guide**: Complete FAQ and common issues section in README
- **Project Review**: Comprehensive technical assessment and code quality analysis

## [2.0.0] - 2025-01-29

### Added

- **Multi-Table Caesar Cipher**: Advanced cipher method with multiple substitution tables
- **Dynamic Shift Patterns**: Five new shift pattern algorithms:
  - Even-Odd: Alternates between two different shift values based on character position
  - Fibonacci: Uses Fibonacci sequence for progressive shift values
  - Prime: Uses prime number sequence for shift calculations
  - Progressive: Incrementally increases shift value for each character
  - Custom: Allows user-defined shift sequences
- **Polyalphabetic Cipher**: Keyword-based encryption with repeating key pattern
- **Advanced Multi-Layer Cipher**: Combines multiple cipher techniques in sequence
- **Enhanced CLI Support**: New command-line options for advanced cipher methods:
  - `--keyword`: For polyalphabetic cipher keywords
  - `--pattern`: For dynamic shift pattern selection
  - `--custom-shifts`: For custom shift sequences
- **TypeScript Interfaces**: New type definitions for advanced cipher configurations:
  - `DynamicTableConfig`: Configuration for multi-table ciphers
  - `PolyalphabeticConfig`: Configuration for keyword-based ciphers
  - `AdvancedLayer`: Configuration for multi-layer transformations

### Enhanced

- **API Expansion**: Added support for 3 new cipher methods (total: 7 methods)
- **CLI Tool**: Extended to support all advanced cipher features
- **Documentation**: Comprehensive examples for all new cipher methods
- **Error Handling**: Improved validation and error messages for advanced features

### Technical

- **Dynamic Cipher Engine**: New `src/lib/dynamicCipher.ts` with 296 lines of advanced cipher logic
- **Pattern Generators**: Sophisticated algorithms for dynamic shift calculation
- **Multi-Table Support**: Ability to use multiple substitution alphabets
- **Polyalphabetic Engine**: Vigenère-style encryption with keyword expansion
- **Layer Composition**: Framework for combining multiple cipher transformations

### Breaking Changes

- Updated `ObscureOptions` interface to include new configuration options
- Enhanced method parameter validation for new cipher types

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

[Unreleased]: https://github.com/angga-22/password-obscura/compare/v2.0.2...HEAD
[2.0.2]: https://github.com/angga-22/password-obscura/compare/v2.0.0...v2.0.2
[2.0.0]: https://github.com/angga-22/password-obscura/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/angga-22/password-obscura/releases/tag/v1.0.0
