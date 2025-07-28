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
  switch (pattern) {
    case "even-odd":
      return position % 2 === 0 ? baseShift : baseShift + 1;

    case "fibonacci":
      return FIBONACCI_SEQUENCE[position % FIBONACCI_SEQUENCE.length];

    case "prime":
      return PRIME_NUMBERS[position % PRIME_NUMBERS.length];

    case "progressive":
      return baseShift + (position % 10);

    case "custom":
      if (!customShifts || customShifts.length === 0) return baseShift;
      return customShifts[position % customShifts.length];

    default:
      return baseShift;
  }
}

/**
 * Multi-table Caesar cipher with dynamic shifting
 */
export function multiTableCaesar(
  text: string,
  config: DynamicTableConfig
): string {
  const { tables, shiftPattern, customShifts, baseShift = 3 } = config;

  return text
    .split("")
    .map((char, index) => {
      // Get the table for this position
      const tableIndex = index % tables.length;
      const table = tables[tableIndex];

      // Generate shift for this position
      const shift = generateShift(index, shiftPattern, baseShift, customShifts);

      // Find character in current table
      const charIndex = table.indexOf(char.toLowerCase());
      if (charIndex === -1) return char; // Character not in table, return as-is

      // Apply shift
      const newIndex = (charIndex + shift) % table.length;
      const newChar = table[newIndex];

      // Check if newChar exists before trying to call toUpperCase
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

  return text
    .split("")
    .map((char, index) => {
      // Get the table for this position
      const tableIndex = index % tables.length;
      const table = tables[tableIndex];

      // Generate shift for this position (same as encoding)
      const shift = generateShift(index, shiftPattern, baseShift, customShifts);

      // Find character in current table
      const charIndex = table.indexOf(char.toLowerCase());
      if (charIndex === -1) return char; // Character not in table, return as-is

      // Apply reverse shift
      const newIndex = (charIndex - shift + table.length) % table.length;
      const newChar = table[newIndex];

      // Check if newChar exists before trying to call toUpperCase
      if (!newChar) return char;

      // Preserve case
      return char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
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
