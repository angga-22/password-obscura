// Comprehensive example demonstrating all password-obscura features
import { obscure, reveal, DEFAULT_SYMBOL_MAP } from "./dist/index.js";

console.log("🔐 Password Obscura - Comprehensive Demo\n");

// Test data
const testCases = ["Hello123", "myPassword!", "Secret@Word", "test123"];

// Test all methods with different inputs
console.log("=== Testing All Methods ===\n");

testCases.forEach((input, index) => {
  console.log(`Test Case ${index + 1}: "${input}"`);

  // Caesar cipher with different shifts
  const caesar3 = obscure(input, { method: "caesar", shift: 3 });
  const caesar7 = obscure(input, { method: "caesar", shift: 7 });

  console.log(
    `  Caesar (shift 3): ${caesar3} → ${reveal(caesar3, {
      method: "caesar",
      shift: 3,
    })}`
  );
  console.log(
    `  Caesar (shift 7): ${caesar7} → ${reveal(caesar7, {
      method: "caesar",
      shift: 7,
    })}`
  );

  // ROT13
  const rot13Result = obscure(input, { method: "rot13" });
  console.log(
    `  ROT13: ${rot13Result} → ${reveal(rot13Result, { method: "rot13" })}`
  );

  // Mirror/Atbash
  const mirrorResult = obscure(input, { method: "mirror" });
  console.log(
    `  Mirror: ${mirrorResult} → ${reveal(mirrorResult, { method: "mirror" })}`
  );

  // Symbol mapping
  const symbolResult = obscure(input, { method: "symbolMap" });
  console.log(
    `  Symbols: ${symbolResult} → ${reveal(symbolResult, {
      method: "symbolMap",
    })}`
  );

  console.log("");
});

// Custom symbol mapping demo
console.log("=== Custom Symbol Mapping Demo ===\n");

const customSymbols = {
  a: "🍎",
  b: "🍌",
  c: "🥕",
  d: "🍇",
  e: "🍆",
  f: "🍓",
  g: "🥬",
  h: "🌭",
  i: "🍦",
  j: "🍯",
  k: "🥝",
  l: "🍋",
  m: "🍄",
  n: "🥜",
  o: "🍊",
  p: "🍑",
  q: "🥤",
  r: "🌶️",
  s: "🍓",
  t: "🍅",
  u: "🍉",
  v: "🥒",
  w: "🧄",
  x: "🥕",
  y: "🥖",
  z: "🧀",
  A: "🍎",
  B: "🥯",
  C: "🧁",
  D: "🍩",
  E: "🥚",
  F: "🍟",
  G: "🧈",
  H: "🍯",
  I: "🍦",
  J: "🫙",
  K: "🥝",
  L: "🥬",
  M: "🥛",
  N: "🥜",
  O: "🫒",
  P: "🍕",
  Q: "🥐",
  R: "🌾",
  S: "🥪",
  T: "🧆",
  U: "🍉",
  V: "🧄",
  W: "🧇",
  X: "🥙",
  Y: "🧈",
  Z: "🧀",
  0: "🥯",
  1: "🥖",
  2: "🥨",
  3: "🧄",
  4: "🥔",
  5: "🥕",
  6: "🌽",
  7: "🥒",
  8: "🍅",
  9: "🥑",
};

const customTest = "Hello123";
const customResult = obscure(customTest, {
  method: "symbolMap",
  symbolMap: customSymbols,
});
const customRevealed = reveal(customResult, {
  method: "symbolMap",
  symbolMap: customSymbols,
});

console.log(`Original: ${customTest}`);
console.log(`Custom symbols: ${customResult}`);
console.log(`Revealed: ${customRevealed}`);
console.log(`Match: ${customTest === customRevealed ? "✅" : "❌"}\n`);

// Edge cases
console.log("=== Edge Cases ===\n");

const edgeCases = [
  "", // Empty string
  "a", // Single character
  "123", // Numbers only
  "ABC", // Uppercase only
  "abc", // Lowercase only
  "!@#$%", // Special characters only
  "Mixed123!@#", // Mixed content
];

edgeCases.forEach((testCase) => {
  console.log(`Testing: "${testCase}"`);

  ["caesar", "rot13", "mirror", "symbolMap"].forEach((method) => {
    try {
      const obscured = obscure(testCase, { method: method, shift: 5 });
      const revealed = reveal(obscured, { method: method, shift: 5 });
      const match = testCase === revealed;
      console.log(
        `  ${method}: ${obscured} → ${revealed} ${match ? "✅" : "❌"}`
      );
    } catch (error) {
      console.log(`  ${method}: Error - ${error.message}`);
    }
  });
  console.log("");
});

console.log("🎉 All tests completed!");
