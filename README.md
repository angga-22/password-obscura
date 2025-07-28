# 🔐 password-obscura

[![npm version](https://img.shields.io/npm/v/password-obscura.svg)](https://www.npmjs.com/package/password-obscura)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight NPM package to "visually" obscure passwords or strings using customizable shift-based and symbol-mapping logic. Inspired by Caesar Cipher — reimagined for modern developers.

## 🔐 What It Does

Instead of strong encryption (which is better handled by libs like bcrypt), this tool is meant for:

- 🔒 Obscuring passwords for display (e.g., showing a fake-but-consistent password to users)
- 🧪 Generating pseudo-random but reversible representations
- 📜 Teaching cryptography basics (Caesar, Atbash, ROT13, etc.)
- 🎨 Creative text transformations with emojis and symbols

## ✅ Use Cases

- Fun CLI tools
- Password managers showing masked variants
- Discord / game bots that hide inputs creatively
- Educational demos on encryption basics
- Obfuscating config keys or token snippets in logs

## 🧠 Features

- `obscure(input, options)` – shift letters, replace symbols, multi-table encryption
- `reveal(obscured, options)` – decode using same key
- Supports multiple algorithms:
  - `caesar` - Classic Caesar cipher with customizable shift
  - `rot13` - ROT13 cipher (shift by 13)
  - `symbolMap` - Replace characters with custom symbols/emojis
  - `mirror` - Atbash cipher (a ↔ z, b ↔ y, etc.)
  - `multiTable` - **NEW!** Multi-table Caesar with dynamic shift patterns
  - `polyalphabetic` - **NEW!** Keyword-based polyalphabetic cipher
  - `advanced` - **NEW!** Multi-layer cipher with various transformations
- **Advanced Shift Patterns**: Even-odd, Fibonacci, Prime numbers, Progressive, Custom sequences
- **Multi-table Support**: Use different alphabets for enhanced security
- **Keyword Ciphers**: Polyalphabetic encryption with user-defined keywords
- **Layer Combinations**: Stack multiple cipher techniques for complex obfuscation
- Lightweight and browser-friendly (zero runtime deps)
- Written in TypeScript, easy to extend

## 📦 Installation

```bash
npm install password-obscura
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
# Caesar cipher
$ npx password-obscura encode "hello-world" --method caesar --shift 3
khoor-zruog

$ npx password-obscura decode "khoor-zruog" --method caesar --shift 3
hello-world

# ROT13
$ npx password-obscura encode "hello-world" --method rot13
uryyb-jbeyq

# Mirror/Atbash
$ npx password-obscura encode "secret" --method mirror
hvxivg

# Symbol mapping
$ npx password-obscura encode "abc123" --method symbolMap
🔥⭐🌟🎲🎯🎪
```

## 📖 API Reference

### `obscure(input: string, options: ObscureOptions): string`

Obscures the input string using the specified method.

**Parameters:**

- `input`: The string to obscure
- `options`: Configuration object

**Options:**

- `method`: `'caesar' | 'rot13' | 'symbolMap' | 'mirror'`
- `shift`: Number (optional, used with caesar method, default: 3)
- `symbolMap`: SymbolMapConfig (optional, used with symbolMap method)

### `reveal(input: string, options: ObscureOptions): string`

Reveals the obscured string using the same method and options used to obscure it.

**Parameters:**

- `input`: The obscured string to reveal
- `options`: Same configuration object used for obscuring

### Types

```typescript
interface ObscureOptions {
  method: "caesar" | "rot13" | "symbolMap" | "mirror";
  shift?: number; // only used in caesar
  symbolMap?: SymbolMapConfig; // only used in symbolMap
}

interface SymbolMapConfig {
  [key: string]: string;
}
```

## 🔍 Method Details

### Caesar Cipher

Classic Caesar cipher that shifts letters by a specified amount.

- Preserves case and non-alphabetic characters
- Default shift: 3
- Supports any shift value

### ROT13

Special case of Caesar cipher with a shift of 13.

- Self-inverse (encoding and decoding are the same operation)
- Commonly used in online forums

### Symbol Map

Replaces characters with custom symbols or emojis.

- Includes a default emoji mapping for all alphanumeric characters
- Fully customizable with your own symbol mappings
- Perfect for creative obfuscation

### Mirror (Atbash)

Maps each letter to its mirror position in the alphabet (A↔Z, B↔Y, etc.).

- Self-inverse like ROT13
- Ancient cipher method
- Case-preserving

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

# Run examples
node examples.js
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

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by classical cipher techniques and modern developer needs for creative text transformation.
