# 🔐 password-obscura

[![npm version](https://img.shields.io/npm/v/password-obscura.svg)](https://www.npmjs.com/package/password-obscura)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight NPM package to "visually" obscure passwords or strings using customizable shift-based and symbol-mapping logic. Inspired by Caesar Cipher — reimagined for modern developers with advanced multi-table encryption capabilities.

## 🔐 What It Does

Instead of strong encryption (which is better handled by libs like bcrypt), this tool is meant for:

- 🔒 Obscuring passwords for display (e.g., showing a fake-but-consistent password to users)
- 🧪 Generating pseudo-random but reversible representations
- 📜 Teaching cryptography basics (Caesar, Atbash, ROT13, Vigenère, etc.)
- 🎨 Creative text transformations with emojis and symbols
- 🔧 Advanced cipher combinations for educational purposes

## ✅ Use Cases

- 🎮 Fun CLI tools and interactive applications
- 🔐 Password managers showing masked variants
- 🤖 Discord / game bots that hide inputs creatively
- 🎓 Educational demos on encryption basics and cryptography
- 📝 Obfuscating config keys or token snippets in logs
- 🧪 Testing and demonstration of cipher algorithms
- 🎭 Creative text art and visual transformations

## 🧠 Features

- **7 Cipher Methods**: Complete encryption toolkit for various use cases

  - `caesar` - Classic Caesar cipher with customizable shift
  - `rot13` - ROT13 cipher (shift by 13, self-inverse)
  - `symbolMap` - Replace characters with custom symbols/emojis
  - `mirror` - Atbash cipher (a ↔ z, b ↔ y, etc.)
  - `multiTable` - **Advanced!** Multi-table Caesar with dynamic shift patterns
  - `polyalphabetic` - **Advanced!** Keyword-based Vigenère-style cipher
  - `advanced` - **Advanced!** Multi-layer cipher with various transformations

- **Dynamic Shift Patterns**: Five sophisticated pattern algorithms

  - **Even-Odd**: Alternates between two shift values based on position
  - **Fibonacci**: Uses Fibonacci sequence for progressive shifts
  - **Prime Numbers**: Applies prime number sequence for shifts
  - **Progressive**: Incrementally increases shift value per character
  - **Custom Sequences**: User-defined shift patterns

- **Advanced Capabilities**:

  - **Multi-table Support**: Use different alphabets for enhanced complexity
  - **Keyword Ciphers**: Polyalphabetic encryption with repeating keywords
  - **Layer Combinations**: Stack multiple cipher techniques together
  - **Perfect Reversibility**: All ciphers maintain encode/decode symmetry

- **Developer Experience**:
  - 🎯 **TypeScript First**: Full type safety with comprehensive interfaces
  - 🪶 **Lightweight**: 8.3 kB package size, zero runtime dependencies
  - 🌐 **Universal**: Works in Node.js and browser environments
  - ⚡ **Fast**: Optimized algorithms with excellent performance
  - 🛠️ **CLI Tool**: Complete command-line interface included

## 📦 Installation

```bash
# npm
npm install password-obscura

# yarn
yarn add password-obscura

# pnpm
pnpm add password-obscura

# bun
bun add password-obscura
```

## 🧪 API Usage

### Basic Examples

```typescript
import { obscure, reveal } from "password-obscura";

// Caesar-style shift
const hidden = obscure("secret123", { method: "caesar", shift: 3 });
console.log(hidden); // → "vhfuhw123"

const original = reveal(hidden, { method: "caesar", shift: 3 });
console.log(original); // → "secret123"

// ROT13
const rot13Hidden = obscure("hello-world", { method: "rot13" });
console.log(rot13Hidden); // → "uryyb-jbeyq"

// Mirror/Atbash cipher
const mirrored = obscure("hello", { method: "mirror" });
console.log(mirrored); // → "svool"

// Symbol mapping with emojis
const emojiHidden = obscure("abc123", { method: "symbolMap" });
console.log(emojiHidden); // → "🔥⭐🌟🟠🟡🟢"
```

### Advanced Multi-Table Ciphers

```typescript
import { obscure, reveal, DynamicTableConfig } from "password-obscura";

// Multi-table Caesar with even-odd pattern
const tableConfig: DynamicTableConfig = {
  tables: ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"],
  shiftPattern: "even-odd",
  baseShift: 3,
};

const multiResult = obscure("Hello World", {
  method: "multiTable",
  tableConfig,
});
console.log(multiResult); // → "Kaohr Zkuhg"

// Fibonacci shift pattern
const fibConfig: DynamicTableConfig = {
  tables: ["abcdefghijklmnopqrstuvwxyz"],
  shiftPattern: "fibonacci",
  baseShift: 1,
};

const fibResult = obscure("ABCDEFGHIJK", {
  method: "multiTable",
  tableConfig: fibConfig,
});
console.log(fibResult); // → "BCEGJNTCQMV"

// Custom shift sequence
const customConfig: DynamicTableConfig = {
  tables: ["abcdefghijklmnopqrstuvwxyz"],
  shiftPattern: "custom",
  baseShift: 1,
  customShifts: [1, 3, 5, 7, 2, 4, 6, 8],
};
```

### Polyalphabetic Cipher

```typescript
import { obscure, reveal, PolyalphabeticConfig } from "password-obscura";

const polyConfig: PolyalphabeticConfig = {
  keyword: "SECRET",
};

const polyResult = obscure("Hello World", {
  method: "polyalphabetic",
  polyConfig,
});
console.log(polyResult); // → "Oinus Mstuh"

const decrypted = reveal(polyResult, { method: "polyalphabetic", polyConfig });
console.log(decrypted); // → "Hello World"
```

### Advanced Multi-Layer Cipher

```typescript
const layers = [
  { type: "shift", config: { shift: 3 } },
  {
    type: "table",
    config: {
      tables: ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"],
      shiftPattern: "fibonacci",
      baseShift: 2,
    },
  },
  { type: "reverse" },
];

const advancedResult = obscure("Secret Message", {
  method: "advanced",
  layers,
});
console.log(advancedResult); // → Complex multi-layer transformation
```

### Advanced Symbol Mapping

```typescript
import { obscure, reveal, SymbolMapConfig } from "password-obscura";

// Custom symbol mapping
const customMap: SymbolMapConfig = {
  a: "🌟",
  b: "🚀",
  c: "💎",
  "1": "⭐",
  "2": "🔥",
  "3": "💫",
};

const customHidden = obscure("abc123", {
  method: "symbolMap",
  symbolMap: customMap,
});
console.log(customHidden); // → "🌟🚀💎⭐🔥💫"

const restored = reveal(customHidden, {
  method: "symbolMap",
  symbolMap: customMap,
});
console.log(restored); // → "abc123"
```

## 🛠️ CLI Usage

The package includes a convenient CLI tool:

```bash
# Install globally (optional)
npm install -g password-obscura

# Or use with npx
npx password-obscura --help
```

### CLI Examples

```bash
# Basic Caesar cipher
$ npx password-obscura encode "hello-world" --method caesar --shift 3
khoor-zruog

$ npx password-obscura decode "khoor-zruog" --method caesar --shift 3
hello-world

# ROT13 (self-inverse)
$ npx password-obscura encode "hello-world" --method rot13
uryyb-jbeyq

# Mirror/Atbash cipher
$ npx password-obscura encode "secret" --method mirror
hvxivg

# Symbol mapping with emojis
$ npx password-obscura encode "abc123" --method symbolMap
🔥⭐🌟🟠🟡🟢

# Advanced multi-table with Fibonacci pattern
$ npx password-obscura encode "Hello World" --method multiTable --pattern fibonacci
Iukpt Fkzll

# Polyalphabetic cipher with keyword
$ npx password-obscura encode "Secret Message" --method polyalphabetic --keyword "CIPHER"
Wmryic Qmtslmi

# Custom shift sequences
$ npx password-obscura encode "test" --method multiTable --pattern custom --custom-shifts "1,3,5,7"
ubxm

# Advanced multi-layer cipher (uses default layers)
$ npx password-obscura encode "Complex Text" --method advanced
txfI fmofhxmC
```

## 📖 API Reference

### `obscure(input: string, options: ObscureOptions): string`

Obscures the input string using the specified method.

**Parameters:**

- `input`: The string to obscure
- `options`: Configuration object (see ObscureOptions below)

### `reveal(input: string, options: ObscureOptions): string`

Reveals the obscured string using the same method and options used to obscure it.

**Parameters:**

- `input`: The obscured string to reveal
- `options`: Same configuration object used for obscuring

### Types

```typescript
interface ObscureOptions {
  method:
    | "caesar"
    | "rot13"
    | "symbolMap"
    | "mirror"
    | "multiTable"
    | "polyalphabetic"
    | "advanced";

  // Caesar cipher options
  shift?: number; // default: 3

  // Symbol mapping options
  symbolMap?: SymbolMapConfig;

  // Multi-table cipher options
  tableConfig?: DynamicTableConfig;

  // Polyalphabetic cipher options
  polyConfig?: PolyalphabeticConfig;

  // Advanced cipher options
  layers?: Array<{
    type: "table" | "shift" | "reverse" | "transpose";
    config?: any;
  }>;
}

interface SymbolMapConfig {
  [key: string]: string;
}

interface DynamicTableConfig {
  tables: string[];
  shiftPattern: "even-odd" | "fibonacci" | "prime" | "progressive" | "custom";
  baseShift?: number;
  customShifts?: number[];
}

interface PolyalphabeticConfig {
  keyword: string;
  tables?: string[];
}
```

### Constants

```typescript
// Pre-defined symbol mapping with emojis for all alphanumeric characters
DEFAULT_SYMBOL_MAP: SymbolMapConfig;

// Four pre-defined alphabet tables for multi-table ciphers
DEFAULT_TABLES: string[];
```

## 🔍 Method Details

### Basic Cipher Methods

#### Caesar Cipher

Classic Caesar cipher that shifts letters by a specified amount.

- ✅ Preserves case and non-alphabetic characters
- ✅ Default shift: 3, supports any shift value
- ✅ Mathematically sound with modular arithmetic

#### ROT13

Special case of Caesar cipher with a shift of 13.

- ✅ Self-inverse (encoding and decoding are the same operation)
- ✅ Commonly used in online forums
- ✅ Fixed 13-character shift for consistency

#### Symbol Map

Replaces characters with custom symbols or emojis.

- ✅ Includes default emoji mapping for all alphanumeric characters
- ✅ Fully customizable with your own symbol mappings
- ✅ Perfect for creative obfuscation and visual appeal
- ✅ Handles Unicode characters properly

#### Mirror (Atbash)

Maps each letter to its mirror position in the alphabet (A↔Z, B↔Y, etc.).

- ✅ Self-inverse like ROT13
- ✅ Ancient cipher method with historical significance
- ✅ Case-preserving transformation

### Advanced Cipher Methods

#### Multi-Table Caesar

Uses multiple substitution alphabets with dynamic shift patterns.

- 🚀 **5 Shift Patterns**: even-odd, fibonacci, prime, progressive, custom
- 🚀 **Multiple Tables**: Switch between different alphabets per character
- 🚀 **Perfect Reversibility**: All patterns maintain encode/decode symmetry
- 🚀 **Educational Value**: Demonstrates polyalphabetic principles

**Shift Patterns:**

- **Even-Odd**: `position % 2 === 0 ? baseShift : baseShift + 1`
- **Fibonacci**: Uses Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13...
- **Prime**: Uses prime numbers: 2, 3, 5, 7, 11, 13, 17...
- **Progressive**: `baseShift + (position % 10)`
- **Custom**: User-defined shift sequences

#### Polyalphabetic Cipher

Keyword-based Vigenère-style encryption.

- 🔑 **Keyword Encryption**: Uses repeating keyword for shift calculation
- 🔄 **Dynamic Shifts**: Each keyword character determines shift amount
- 📚 **Multiple Tables**: Can use different alphabets for enhanced complexity
- 🎓 **Classic Algorithm**: Implements traditional Vigenère cipher principles

#### Advanced Multi-Layer Cipher

Combines multiple cipher techniques in sequence.

- 🔗 **Layer Composition**: Stack multiple transformations
- 🔀 **Transformation Types**: shift, table, reverse, transpose
- ⚙️ **Configurable**: Custom layer configurations
- 🔄 **Reversible**: Applies transformations in reverse order for decoding

**Available Layer Types:**

- **shift**: Basic Caesar shift transformation
- **table**: Multi-table substitution with patterns
- **reverse**: String reversal transformation
- **transpose**: Block-based character transposition

## ⚡ Performance & Compatibility

### Performance Benchmarks

Based on 100 iterations with long text strings:

- **Caesar**: ~34ms (fastest basic cipher)
- **ROT13**: ~46ms
- **Symbol Map**: ~37ms
- **Mirror**: ~19ms (fastest overall)
- **Multi-Table**: ~42ms (excellent for complexity)
- **Polyalphabetic**: ~51ms
- **Advanced**: ~75ms (acceptable for multi-layer)

### Compatibility

- ✅ **Node.js**: v16+ (ESM modules)
- ✅ **Browsers**: Modern browsers with ES2020 support
- ✅ **TypeScript**: Full type definitions included
- ✅ **Package Size**: 8.3 kB (40.4 kB unpacked)
- ✅ **Dependencies**: Zero runtime dependencies (CLI uses commander)

### ESM Module Support

This package uses modern ES modules:

```javascript
// ✅ Correct import syntax
import { obscure, reveal } from "password-obscura";

// ❌ CommonJS require() not supported
const { obscure } = require("password-obscura"); // Won't work
```

## ⚠️ Security Notice

This library is designed for **visual obfuscation** and **educational purposes**, not cryptographic security. The transformations are easily reversible and should not be used for protecting sensitive data in production environments.

For actual password hashing and security, use established libraries like:

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [argon2](https://www.npmjs.com/package/argon2)
- [scrypt](https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/angga-22/password-obscura.git
cd password-obscura

# Install dependencies
npm install

# Build the project
npm run build

# Run comprehensive test suite
node demo.js

# Test CLI functionality
npx password-obscura encode "test" --method caesar --shift 5
```

### Project Structure

```
password-obscura/
├── src/
│   ├── index.ts              # Main API entry point
│   └── lib/                  # Cipher implementations
│       ├── caesar.ts         # Basic Caesar cipher
│       ├── rot13.ts          # ROT13 implementation
│       ├── symbolMap.ts      # Symbol/emoji mapping
│       ├── atbash.ts         # Mirror/Atbash cipher
│       └── dynamicCipher.ts  # Advanced multi-table ciphers
├── bin/cli.ts                # Command-line interface
├── demo.js                   # Comprehensive test suite
├── dist/                     # Built output
└── docs/                     # Documentation files
```

### Versioning

This project follows [Semantic Versioning](https://semver.org/). See [VERSIONING.md](VERSIONING.md) for details about our versioning strategy.

### Releases

To create a new release:

```bash
# For bug fixes
npm run release:patch

# For new features
npm run release:minor

# For breaking changes
npm run release:major
```

Or use the release script:

```bash
./scripts/release.sh patch
```

## � Troubleshooting & FAQ

### Common Issues

**Q: "Cannot use import statement outside a module"**
A: This package uses ESM modules. Ensure your project supports ES modules or use Node.js v16+.

**Q: Some characters don't encode/decode properly**
A: The library is designed for basic Latin characters (a-z, A-Z, 0-9). Special Unicode characters may not be supported in all cipher methods.

**Q: Advanced cipher results seem inconsistent**
A: This is expected! Advanced ciphers use complex algorithms. Ensure you're using the exact same configuration for both encoding and decoding.

**Q: CLI command not found**
A: Either install globally with `npm install -g password-obscura` or use `npx password-obscura` prefix.

### Getting Help

- 📖 Check the [API documentation](#-api-reference) above
- 🔍 Review the [comprehensive test suite](demo.js) for examples
- 🐛 Report issues on [GitHub Issues](https://github.com/angga-22/password-obscura/issues)
- 💡 Request features or ask questions in [Discussions](https://github.com/angga-22/password-obscura/discussions)

## �📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by classical cipher techniques and modern developer needs for creative text transformation. Special thanks to:

- 📚 **Historical Cryptographers**: Caesar, Vigenère, Atbash cipher inventors
- 🎓 **Educational Resources**: Cryptography textbooks and online courses
- 💻 **Open Source Community**: TypeScript, Node.js, and npm ecosystem
- 🧪 **Testing**: Comprehensive validation of all cipher implementations

---

**Built with ❤️ for developers who love creative coding and educational cryptography.**
