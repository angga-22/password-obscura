// src/index.ts
import { caesarCipher, caesarDecipher } from "./lib/caesar.js";
import { rot13 } from "./lib/rot13.js";
import {
  symbolMapEncode,
  symbolMapDecode,
  SymbolMapConfig,
  DEFAULT_SYMBOL_MAP,
} from "./lib/symbolMap.js";
import { atbashCipher, atbashDecipher } from "./lib/atbash.js";
import {
  multiTableCaesar,
  multiTableCaesarDecrypt,
  polyalphabeticCipher,
  polyalphabeticDecipher,
  advancedSubstitution,
  advancedSubstitutionDecrypt,
  DynamicTableConfig,
  PolyalphabeticConfig,
  DEFAULT_TABLES,
} from "./lib/dynamicCipher.js";

export interface ObscureOptions {
  method:
  | "caesar"
  | "rot13"
  | "symbolMap"
  | "mirror"
  | "multiTable"
  | "polyalphabetic"
  | "advanced";
  shift?: number; // used in caesar
  symbolMap?: SymbolMapConfig; // used in symbolMap
  tableConfig?: DynamicTableConfig; // used in multiTable
  polyConfig?: PolyalphabeticConfig; // used in polyalphabetic
  layers?: Array<{
    // used in advanced
    type: "table" | "shift" | "reverse" | "transpose";
    config?: any;
  }>;
}

export function obscure(input: string, options: ObscureOptions): string {
  switch (options.method) {
    case "caesar":
      return caesarCipher(input, options.shift ?? 3);
    case "rot13":
      return rot13(input);
    case "symbolMap":
      return symbolMapEncode(input, options.symbolMap ?? DEFAULT_SYMBOL_MAP);
    case "mirror":
      return atbashCipher(input);
    case "multiTable":
      if (!options.tableConfig) {
        // Default multi-table configuration
        options.tableConfig = {
          tables: DEFAULT_TABLES,
          shiftPattern: "even-odd",
          baseShift: 3,
        };
      }
      return multiTableCaesar(input, options.tableConfig);
    case "polyalphabetic":
      if (!options.polyConfig) {
        throw new Error("polyConfig is required for polyalphabetic method");
      }
      return polyalphabeticCipher(input, options.polyConfig);
    case "advanced":
      if (!options.layers || options.layers.length === 0) {
        // Default advanced configuration
        options.layers = [
          { type: "shift", config: { shift: 3 } },
          {
            type: "table",
            config: {
              tables: DEFAULT_TABLES,
              shiftPattern: "fibonacci",
              baseShift: 2,
            },
          },
          { type: "reverse" },
        ];
      }
      return advancedSubstitution(input, options.layers);
    default:
      throw new Error(`Unsupported method: ${options.method}`);
  }
}

export function reveal(input: string, options: ObscureOptions): string {
  switch (options.method) {
    case "caesar":
      return caesarDecipher(input, options.shift ?? 3);
    case "rot13":
      return rot13(input); // rot13 is symmetric
    case "symbolMap":
      return symbolMapDecode(input, options.symbolMap ?? DEFAULT_SYMBOL_MAP);
    case "mirror":
      return atbashDecipher(input); // atbash is symmetric
    case "multiTable":
      if (!options.tableConfig) {
        // Use same default as obscure
        options.tableConfig = {
          tables: DEFAULT_TABLES,
          shiftPattern: "even-odd",
          baseShift: 3,
        };
      }
      return multiTableCaesarDecrypt(input, options.tableConfig);
    case "polyalphabetic":
      if (!options.polyConfig) {
        throw new Error("polyConfig is required for polyalphabetic method");
      }
      return polyalphabeticDecipher(input, options.polyConfig);
    case "advanced":
      if (!options.layers || options.layers.length === 0) {
        // Use same default as obscure
        options.layers = [
          { type: "shift", config: { shift: 3 } },
          {
            type: "table",
            config: {
              tables: DEFAULT_TABLES,
              shiftPattern: "fibonacci",
              baseShift: 2,
            },
          },
          { type: "reverse" },
        ];
      }
      return advancedSubstitutionDecrypt(input, options.layers);
    default:
      throw new Error(`Unsupported method: ${options.method}`);
  }
}

// Re-export types and constants for convenience
export type { SymbolMapConfig, DynamicTableConfig, PolyalphabeticConfig };
export { DEFAULT_SYMBOL_MAP, DEFAULT_TABLES };
