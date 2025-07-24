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

export interface ObscureOptions {
  method: "caesar" | "rot13" | "symbolMap" | "mirror";
  shift?: number; // only used in caesar
  symbolMap?: SymbolMapConfig; // only used in symbolMap
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
    default:
      throw new Error(`Unsupported method: ${options.method}`);
  }
}

// Re-export types and constants for convenience
export type { SymbolMapConfig };
export { DEFAULT_SYMBOL_MAP };
