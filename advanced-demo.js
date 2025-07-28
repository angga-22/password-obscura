// Advanced cipher features demo
import { obscure, reveal, DEFAULT_TABLES } from "./dist/index.js";

console.log("🚀 Advanced Password Obscura Features Demo\n");

// Test cases
const testCases = [
  "Hello World!",
  "Secret123",
  "Advanced Cipher Test",
  "Multiple Tables Rock!",
];

console.log("=== Multi-Table Caesar with Even-Odd Pattern ===\n");

testCases.forEach((input, index) => {
  console.log(`Test ${index + 1}: "${input}"`);

  const tableConfig = {
    tables: ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"],
    shiftPattern: "even-odd",
    baseShift: 3,
  };

  const encoded = obscure(input, { method: "multiTable", tableConfig });
  const decoded = reveal(encoded, { method: "multiTable", tableConfig });

  console.log(`  Encoded: ${encoded}`);
  console.log(`  Decoded: ${decoded}`);
  console.log(`  Match: ${input === decoded ? "✅" : "❌"}\n`);
});

console.log("=== Multi-Table Caesar with Fibonacci Pattern ===\n");

testCases.forEach((input, index) => {
  console.log(`Test ${index + 1}: "${input}"`);

  const tableConfig = {
    tables: DEFAULT_TABLES,
    shiftPattern: "fibonacci",
    baseShift: 2,
  };

  const encoded = obscure(input, { method: "multiTable", tableConfig });
  const decoded = reveal(encoded, { method: "multiTable", tableConfig });

  console.log(`  Encoded: ${encoded}`);
  console.log(`  Decoded: ${decoded}`);
  console.log(`  Match: ${input === decoded ? "✅" : "❌"}\n`);
});

console.log("=== Multi-Table Caesar with Custom Shifts ===\n");

testCases.slice(0, 2).forEach((input, index) => {
  console.log(`Test ${index + 1}: "${input}"`);

  const tableConfig = {
    tables: ["abcdefghijklmnopqrstuvwxyz", "nopqrstuvwxyzabcdefghijklm"],
    shiftPattern: "custom",
    baseShift: 1,
    customShifts: [1, 3, 5, 7, 2, 4, 6, 8],
  };

  const encoded = obscure(input, { method: "multiTable", tableConfig });
  const decoded = reveal(encoded, { method: "multiTable", tableConfig });

  console.log(`  Encoded: ${encoded}`);
  console.log(`  Decoded: ${decoded}`);
  console.log(`  Match: ${input === decoded ? "✅" : "❌"}\n`);
});

console.log("=== Polyalphabetic Cipher ===\n");

const keywords = ["SECRET", "CIPHER", "DYNAMIC"];

keywords.forEach((keyword, keyIndex) => {
  console.log(`Keyword: "${keyword}"`);

  testCases.slice(0, 2).forEach((input, index) => {
    const polyConfig = {
      keyword: keyword,
    };

    const encoded = obscure(input, { method: "polyalphabetic", polyConfig });
    const decoded = reveal(encoded, { method: "polyalphabetic", polyConfig });

    console.log(
      `  "${input}" → "${encoded}" → "${decoded}" ${
        input === decoded ? "✅" : "❌"
      }`
    );
  });
  console.log("");
});

console.log("=== Advanced Multi-Layer Cipher ===\n");

testCases.slice(0, 2).forEach((input, index) => {
  console.log(`Test ${index + 1}: "${input}"`);

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

  const encoded = obscure(input, { method: "advanced", layers });
  const decoded = reveal(encoded, { method: "advanced", layers });

  console.log(`  Encoded: ${encoded}`);
  console.log(`  Decoded: ${decoded}`);
  console.log(`  Match: ${input === decoded ? "✅" : "❌"}\n`);
});

console.log("=== Pattern Comparison ===\n");

const testString = "ABCDEFGHIJK";
const patterns = ["even-odd", "fibonacci", "prime", "progressive"];

patterns.forEach((pattern) => {
  console.log(`Pattern: ${pattern}`);

  const tableConfig = {
    tables: ["abcdefghijklmnopqrstuvwxyz"],
    shiftPattern: pattern,
    baseShift: 1,
  };

  const encoded = obscure(testString, { method: "multiTable", tableConfig });
  console.log(`  ${testString} → ${encoded}\n`);
});

console.log("🎉 Advanced features demo completed!");
