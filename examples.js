// Example usage of password-obscura
import { obscure, reveal, DEFAULT_SYMBOL_MAP } from "./dist/index.js";

console.log("🔐 Password Obscura Examples\n");

// Caesar cipher examples
console.log("=== Caesar Cipher ===");
const secret = "mySecretPassword123";
const caesarHidden = obscure(secret, { method: "caesar", shift: 5 });
console.log(`Original: ${secret}`);
console.log(`Obscured: ${caesarHidden}`);
console.log(
  `Revealed: ${reveal(caesarHidden, { method: "caesar", shift: 5 })}\n`
);

// ROT13 examples
console.log("=== ROT13 ===");
const message = "Hello World!";
const rot13Hidden = obscure(message, { method: "rot13" });
console.log(`Original: ${message}`);
console.log(`Obscured: ${rot13Hidden}`);
console.log(`Revealed: ${reveal(rot13Hidden, { method: "rot13" })}\n`);

// Mirror/Atbash examples
console.log("=== Mirror (Atbash) ===");
const text = "AbcDef";
const mirrorHidden = obscure(text, { method: "mirror" });
console.log(`Original: ${text}`);
console.log(`Obscured: ${mirrorHidden}`);
console.log(`Revealed: ${reveal(mirrorHidden, { method: "mirror" })}\n`);

// Symbol map examples
console.log("=== Symbol Map ===");
const password = "abc123";
const symbolHidden = obscure(password, { method: "symbolMap" });
console.log(`Original: ${password}`);
console.log(`Obscured: ${symbolHidden}`);
console.log(`Revealed: ${reveal(symbolHidden, { method: "symbolMap" })}\n`);

// Custom symbol map
console.log("=== Custom Symbol Map ===");
const customMap = {
  a: "🌟",
  b: "🚀",
  c: "💎",
  1: "⭐",
  2: "🔥",
  3: "💫",
  A: "🌟",
  B: "🚀",
  C: "💎",
};

const customPassword = "aBc123";
const customHidden = obscure(customPassword, {
  method: "symbolMap",
  symbolMap: customMap,
});
console.log(`Original: ${customPassword}`);
console.log(`Obscured: ${customHidden}`);
console.log(
  `Revealed: ${reveal(customHidden, {
    method: "symbolMap",
    symbolMap: customMap,
  })}\n`
);

console.log("✨ All examples completed!");
