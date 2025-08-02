export interface DynamicTableConfig {
  tables: string[];
  shiftPattern: "even-odd" | "fibonacci" | "prime" | "custom" | "progressive";
  customShifts?: number[];
  baseShift?: number;
}

export interface PolyalphabeticConfig {
  keyword: string;
  tables?: string[];
  autoGenerate?: boolean;
}

export const DEFAULT_TABLES = [
  "abcdefghijklmnopqrstuvwxyz",
  "zyxwvutsrqponmlkjihgfedcba",
  "aeiouybcdfghjklmnpqrstvwxz",
  "bcdefghijklmnopqrstuvwxyza",
];

export const FIBONACCI_SEQUENCE = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
export const PRIME_NUMBERS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

/**
 * Generate shift value based on position and pattern
 */
export function generateShift(
  position: number,
  pattern: string,
  baseShift: number = 3,
  customShifts?: number[]
): number {
  let shift: number;

  switch (pattern) {
    case "even-odd":
      shift = position % 2 === 0 ? baseShift : baseShift + 1;
      break;

    case "fibonacci":
      shift = FIBONACCI_SEQUENCE[position % FIBONACCI_SEQUENCE.length];
      break;

    case "prime":
      shift = PRIME_NUMBERS[position % PRIME_NUMBERS.length];
      break;

    case "progressive":
      shift = baseShift + (position % 10);
      break;

    case "custom":
      if (!customShifts || customShifts.length === 0) {
        shift = baseShift;
      } else {
        shift = customShifts[position % customShifts.length];
      }
      break;

    default:
      shift = baseShift;
      break;
  }

  // Ensure shift is always within reasonable bounds for a 26-letter alphabet
  return shift % 26;
}

/**
 * Multi-table Caesar cipher with dynamic shifting
 */
export function multiTableCaesar(
  text: string,
  config: DynamicTableConfig
): string {
  const { tables, shiftPattern, customShifts, baseShift = 3 } = config;
  const standardAlphabet = "abcdefghijklmnopqrstuvwxyz";

  return text
    .split("")
    .map((char, index) => {
      // For non-alphabetic characters, return as-is
      if (!/[a-zA-Z]/.test(char)) return char;

      // Get the table for this position
      const tableIndex = index % tables.length;
      const table = tables[tableIndex];

      // Generate shift for this position
      const shift = generateShift(index, shiftPattern, baseShift, customShifts);

      // Find character position in standard alphabet
      const standardIndex = standardAlphabet.indexOf(char.toLowerCase());
      if (standardIndex === -1) return char;

      // Apply shift in standard alphabet space
      const shiftedIndex = (standardIndex + shift) % standardAlphabet.length;

      // Map to the selected table
      const newChar = table[shiftedIndex];

      // Check if newChar exists
      if (!newChar) return char;

      // Preserve case
      return char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
    })
    .join("");
}

/**
 * Decrypt multi-table Caesar cipher
 */
export function multiTableCaesarDecrypt(
  text: string,
  config: DynamicTableConfig
): string {
  const { tables, shiftPattern, customShifts, baseShift = 3 } = config;
  const standardAlphabet = "abcdefghijklmnopqrstuvwxyz";

  return text
    .split("")
    .map((char, index) => {
      // For non-alphabetic characters, return as-is
      if (!/[a-zA-Z]/.test(char)) return char;

      // Get the table for this position (same as encoding)
      const tableIndex = index % tables.length;
      const table = tables[tableIndex];

      // Generate shift for this position (same as encoding)
      const shift = generateShift(index, shiftPattern, baseShift, customShifts);

      // Find character position in the selected table
      const tableIndex_char = table.indexOf(char.toLowerCase());
      if (tableIndex_char === -1) return char;

      // Reverse the shift in standard alphabet space
      const originalIndex =
        (tableIndex_char - shift + standardAlphabet.length) %
        standardAlphabet.length;

      // Get the original character from standard alphabet
      const originalChar = standardAlphabet[originalIndex];

      // Check if originalChar exists
      if (!originalChar) return char;

      // Preserve case
      return char === char.toUpperCase()
        ? originalChar.toUpperCase()
        : originalChar;
    })
    .join("");
}

/**
 * Polyalphabetic cipher using keyword
 */
export function polyalphabeticCipher(
  text: string,
  config: PolyalphabeticConfig
): string {
  const { keyword, tables = DEFAULT_TABLES } = config;
  const keywordRepeated = keyword.repeat(
    Math.ceil(text.length / keyword.length)
  );

  return text
    .split("")
    .map((char, index) => {
      if (!/[a-zA-Z]/.test(char)) return char;

      const keyChar = keywordRepeated[index];
      const keyShift = keyChar.toLowerCase().charCodeAt(0) - 97; // a=0, b=1, etc.

      // Use different table based on keyword character
      const tableIndex = keyShift % tables.length;
      const table = tables[tableIndex];

      const charIndex = table.indexOf(char.toLowerCase());
      if (charIndex === -1) return char;

      const newIndex = (charIndex + keyShift) % table.length;
      const newChar = table[newIndex];

      return char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
    })
    .join("");
}

/**
 * Decrypt polyalphabetic cipher
 */
export function polyalphabeticDecipher(
  text: string,
  config: PolyalphabeticConfig
): string {
  const { keyword, tables = DEFAULT_TABLES } = config;
  const keywordRepeated = keyword.repeat(
    Math.ceil(text.length / keyword.length)
  );

  return text
    .split("")
    .map((char, index) => {
      if (!/[a-zA-Z]/.test(char)) return char;

      const keyChar = keywordRepeated[index];
      const keyShift = keyChar.toLowerCase().charCodeAt(0) - 97;

      const tableIndex = keyShift % tables.length;
      const table = tables[tableIndex];

      const charIndex = table.indexOf(char.toLowerCase());
      if (charIndex === -1) return char;

      const newIndex = (charIndex - keyShift + table.length) % table.length;
      const newChar = table[newIndex];

      return char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
    })
    .join("");
}

/**
 * Advanced substitution cipher with multiple transformation layers
 */
export function advancedSubstitution(
  text: string,
  layers: Array<{
    type: "table" | "shift" | "reverse" | "transpose";
    config?: any;
  }>
): string {
  let result = text;

  layers.forEach((layer) => {
    switch (layer.type) {
      case "table":
        if (layer.config && layer.config.tables) {
          result = multiTableCaesar(result, layer.config);
        }
        break;

      case "shift":
        // Simple Caesar shift
        const shift = layer.config?.shift || 3;
        result = result.replace(/[a-zA-Z]/g, (char) => {
          const base = char >= "a" ? 97 : 65;
          return String.fromCharCode(
            ((char.charCodeAt(0) - base + shift) % 26) + base
          );
        });
        break;

      case "reverse":
        // Reverse the string
        result = result.split("").reverse().join("");
        break;

      case "transpose":
        // Simple transposition based on block size
        const blockSize = layer.config?.blockSize || 3;
        const blocks = [];
        for (let i = 0; i < result.length; i += blockSize) {
          blocks.push(result.slice(i, i + blockSize));
        }
        result = blocks
          .map((block) => block.split("").reverse().join(""))
          .join("");
        break;
    }
  });

  return result;
}

/**
 * Decrypt advanced substitution cipher (reverse order of operations)
 */
export function advancedSubstitutionDecrypt(
  text: string,
  layers: Array<{
    type: "table" | "shift" | "reverse" | "transpose";
    config?: any;
  }>
): string {
  let result = text;

  // Apply layers in reverse order
  [...layers].reverse().forEach((layer) => {
    switch (layer.type) {
      case "table":
        if (layer.config && layer.config.tables) {
          result = multiTableCaesarDecrypt(result, layer.config);
        }
        break;

      case "shift":
        // Reverse Caesar shift
        const shift = layer.config?.shift || 3;
        result = result.replace(/[a-zA-Z]/g, (char) => {
          const base = char >= "a" ? 97 : 65;
          return String.fromCharCode(
            ((char.charCodeAt(0) - base - shift + 26) % 26) + base
          );
        });
        break;

      case "reverse":
        // Reverse the string again
        result = result.split("").reverse().join("");
        break;

      case "transpose":
        // Reverse transposition
        const blockSize = layer.config?.blockSize || 3;
        const blocks = [];
        for (let i = 0; i < result.length; i += blockSize) {
          blocks.push(result.slice(i, i + blockSize));
        }
        result = blocks
          .map((block) => block.split("").reverse().join(""))
          .join("");
        break;
    }
  });

  return result;
}
