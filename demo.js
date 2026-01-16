/**
 * 🔐 Password Obscura - Comprehensive Test Suite
 *
 * This demo file tests all cipher methods and configurations to ensure
 * the library works correctly across all use cases.
 */

import {
  obscure,
  reveal,
  DEFAULT_TABLES,
} from "./dist/index.js";

function logHeader(title) {
  console.log(
    `\n${colors.cyan}${colors.bright}=== ${title} ===${colors.reset}\n`
  );
}

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function logTest(testName, input, output, expected, success) {
  const status = success
    ? `${colors.green}✅${colors.reset}`
    : `${colors.red}❌${colors.reset}`;
  console.log(`${colors.yellow}${testName}${colors.reset}: "${input}"`);
  console.log(`  → Encoded: "${output}"`);
  console.log(`  → Decoded: "${expected}"`);
  console.log(`  → Status: ${status} ${success ? "PASS" : "FAIL"}\n`);
}

function logSection(title) {
  console.log(
    `${colors.magenta}${colors.bright}--- ${title} ---${colors.reset}\n`
  );
}

// Test data
const testCases = {
  simple: ["hello", "world", "test123", "ABC"],
  complex: [
    "Hello World!",
    "Secret123@#$",
    "Advanced Cipher Test",
    "Multiple Tables Rock!",
    "Mixed-CASE with Numbers123 and Symbols!@#",
  ],
  edge: [
    "",
    " ",
    "   ",
    "123456",
    "!@#$%^&*()",
    "aA1!",
    "z",
    "Z",
    "The quick brown fox jumps over the lazy dog 1234567890",
  ],
};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(testName, input, method, options = {}) {
  totalTests++;
  try {
    const encoded = obscure(input, { method, ...options });
    const decoded = reveal(encoded, { method, ...options });
    const success = input === decoded;

    if (success) {
      passedTests++;
    } else {
      failedTests++;
    }

    logTest(testName, input, encoded, decoded, success);
    return { success, encoded, decoded };
  } catch (error) {
    failedTests++;
    console.log(
      `${colors.red}❌ ERROR${colors.reset} in ${testName}: ${error.message}\n`
    );
    return { success: false, error: error.message };
  }
}

console.log(
  `${colors.bright}${colors.blue}🚀 Password Obscura - Comprehensive Test Suite${colors.reset}`
);
console.log(
  `${colors.bright}Version: 2.0.0 | Testing all 7 cipher methods${colors.reset}`
);

// ========== BASIC CIPHER METHODS ==========

logHeader("1. Caesar Cipher Tests");
logSection("Default shift (3)");
testCases.simple.forEach((input, i) => {
  runTest(`Caesar-${i + 1}`, input, "caesar");
});

logSection("Custom shifts");
[1, 5, 13, 25].forEach((shift, i) => {
  runTest(`Caesar-Shift-${shift}`, testCases.simple[0], "caesar", { shift });
});

logHeader("2. ROT13 Cipher Tests");
testCases.simple.forEach((input, i) => {
  runTest(`ROT13-${i + 1}`, input, "rot13");
});

logHeader("3. Mirror (Atbash) Cipher Tests");
testCases.simple.forEach((input, i) => {
  runTest(`Mirror-${i + 1}`, input, "mirror");
});

// ========== ADVANCED CIPHER METHODS ==========

logHeader("4. Multi-Table Caesar Cipher Tests");

logSection("Even-Odd Pattern");
const evenOddConfig = {
  tables: ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"],
  shiftPattern: "even-odd",
  baseShift: 3,
};
testCases.complex.slice(0, 3).forEach((input, i) => {
  runTest(`MultiTable-EvenOdd-${i + 1}`, input, "multiTable", {
    tableConfig: evenOddConfig,
  });
});

logSection("Fibonacci Pattern");
const fibonacciConfig = {
  tables: DEFAULT_TABLES,
  shiftPattern: "fibonacci",
  baseShift: 2,
};
testCases.complex.slice(0, 3).forEach((input, i) => {
  runTest(`MultiTable-Fibonacci-${i + 1}`, input, "multiTable", {
    tableConfig: fibonacciConfig,
  });
});

logSection("Prime Number Pattern");
const primeConfig = {
  tables: ["abcdefghijklmnopqrstuvwxyz"],
  shiftPattern: "prime",
  baseShift: 1,
};
testCases.simple.forEach((input, i) => {
  runTest(`MultiTable-Prime-${i + 1}`, input, "multiTable", {
    tableConfig: primeConfig,
  });
});

logSection("Progressive Pattern");
const progressiveConfig = {
  tables: ["abcdefghijklmnopqrstuvwxyz", "nopqrstuvwxyzabcdefghijklm"],
  shiftPattern: "progressive",
  baseShift: 1,
};
testCases.simple.forEach((input, i) => {
  runTest(`MultiTable-Progressive-${i + 1}`, input, "multiTable", {
    tableConfig: progressiveConfig,
  });
});

logSection("Custom Shifts Pattern");
const customShiftsConfig = {
  tables: ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"],
  shiftPattern: "custom",
  baseShift: 1,
  customShifts: [1, 3, 5, 7, 2, 4, 6, 8, 9, 11],
};
testCases.simple.forEach((input, i) => {
  runTest(`MultiTable-Custom-${i + 1}`, input, "multiTable", {
    tableConfig: customShiftsConfig,
  });
});

logHeader("5. Polyalphabetic Cipher Tests");

logSection("Various Keywords");
const keywords = ["SECRET", "CIPHER", "KEY", "DYNAMIC", "POLYALPHABETIC"];
keywords.forEach((keyword, i) => {
  const polyConfig = { keyword };
  runTest(
    `Polyalphabetic-${keyword}`,
    testCases.complex[i % testCases.complex.length],
    "polyalphabetic",
    { polyConfig }
  );
});

logSection("Long Text with Short Keywords");
const longText = "The quick brown fox jumps over the lazy dog";
["ABC", "XYZ", "KEY"].forEach((keyword, i) => {
  const polyConfig = { keyword };
  runTest(`Polyalphabetic-Long-${keyword}`, longText, "polyalphabetic", {
    polyConfig,
  });
});

logHeader("6. Advanced Multi-Layer Cipher Tests");

logSection("Default Layers");
testCases.complex.slice(0, 3).forEach((input, i) => {
  runTest(`Advanced-Default-${i + 1}`, input, "advanced");
});

logSection("Custom Layer Combinations");
const customLayers1 = [
  { type: "shift", config: { shift: 5 } },
  { type: "reverse" },
  { type: "shift", config: { shift: 3 } },
];
runTest("Advanced-Custom-1", "Hello World", "advanced", {
  layers: customLayers1,
});

const customLayers2 = [
  {
    type: "table",
    config: {
      tables: ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"],
      shiftPattern: "prime",
      baseShift: 2,
    },
  },
  { type: "transpose", config: { blockSize: 4 } },
  { type: "reverse" },
];
runTest("Advanced-Custom-2", "Secret Message", "advanced", {
  layers: customLayers2,
});

const complexLayers = [
  { type: "shift", config: { shift: 7 } },
  {
    type: "table",
    config: {
      tables: [
        "abcdefghijklmnopqrstuvwxyz",
        "nopqrstuvwxyzabcdefghijklm",
        "zyxwvutsrqponmlkjihgfedcba",
      ],
      shiftPattern: "fibonacci",
      baseShift: 3,
    },
  },
  { type: "transpose", config: { blockSize: 3 } },
  { type: "reverse" },
  { type: "shift", config: { shift: 2 } },
];
runTest("Advanced-Complex", "Complex Multi-Layer Test", "advanced", {
  layers: complexLayers,
});

// ========== EDGE CASES AND STRESS TESTS ==========

logHeader("7. Edge Case Tests");

logSection("Empty and Whitespace");
testCases.edge.slice(0, 3).forEach((input, i) => {
  runTest(`Edge-Empty-${i + 1}`, input, "caesar");
});

logSection("Numbers and Symbols Only");
testCases.edge.slice(3, 6).forEach((input, i) => {
  runTest(`Edge-NumSymbol-${i + 1}`, input, "caesar");
  runTest(`Edge-NumSymbol-Mirror-${i + 1}`, input, "mirror");
});

logSection("Single Characters");
["a", "A", "1", "!", "z", "Z"].forEach((input, i) => {
  runTest(`Edge-Single-${i + 1}`, input, "caesar");
});

logSection("Long Text Stress Test");
const longStressText = testCases.edge[testCases.edge.length - 1];
["caesar", "rot13", "mirror", "multiTable"].forEach((method, i) => {
  const options = method === "multiTable" ? { tableConfig: evenOddConfig } : {};
  runTest(`Stress-${method}`, longStressText, method, options);
});

// ========== CONFIGURATION VALIDATION TESTS ==========

logHeader("8. Error Handling and Validation Tests");

logSection("Invalid Method Handling");
totalTests++;
try {
  obscure("test", { method: "invalid" });
  console.log(
    `${colors.red}❌ FAIL${colors.reset}: Should throw error for invalid method\n`
  );
  failedTests++;
} catch (error) {
  console.log(
    `${colors.green}✅ PASS${colors.reset}: Correctly threw error for invalid method: ${error.message}\n`
  );
  passedTests++;
}

logSection("Missing Required Configuration");
totalTests++;
try {
  obscure("test", { method: "polyalphabetic" });
  console.log(
    `${colors.red}❌ FAIL${colors.reset}: Should throw error for missing polyConfig\n`
  );
  failedTests++;
} catch (error) {
  console.log(
    `${colors.green}✅ PASS${colors.reset}: Correctly threw error for missing polyConfig: ${error.message}\n`
  );
  passedTests++;
}

// ========== PATTERN ANALYSIS ==========

logHeader("9. Pattern Analysis and Comparison");

logSection("Shift Pattern Comparison");
const patternTestString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const patterns = ["even-odd", "fibonacci", "prime", "progressive"];

patterns.forEach((pattern) => {
  const config = {
    tables: ["abcdefghijklmnopqrstuvwxyz"],
    shiftPattern: pattern,
    baseShift: 1,
  };

  const encoded = obscure(patternTestString, {
    method: "multiTable",
    tableConfig: config,
  });
  console.log(`${colors.yellow}${pattern.toUpperCase()}${colors.reset}:`);
  console.log(`  Input:  ${patternTestString}`);
  console.log(`  Output: ${encoded}`);
  console.log(
    `  Decode: ${reveal(encoded, {
      method: "multiTable",
      tableConfig: config,
    })}`
  );
  console.log("");
});

// ========== PERFORMANCE BENCHMARKS ==========

logHeader("10. Performance Benchmarks");

const performanceTestString =
  "The quick brown fox jumps over the lazy dog. ".repeat(100);
const methods = [
  "caesar",
  "rot13",
  "mirror",
  "multiTable",
  "polyalphabetic",
  "advanced",
];

methods.forEach((method) => {
  const options = {};
  if (method === "multiTable") {
    options.tableConfig = evenOddConfig;
  } else if (method === "polyalphabetic") {
    options.polyConfig = { keyword: "BENCHMARK" };
  }

  const start = Date.now();
  for (let i = 0; i < 100; i++) {
    const encoded = obscure(performanceTestString, { method, ...options });
    reveal(encoded, { method, ...options });
  }
  const end = Date.now();

  console.log(
    `${colors.yellow}${method.toUpperCase()}${colors.reset}: ${
      end - start
    }ms (100 iterations)`
  );
});

// ========== SUMMARY REPORT ==========

logHeader("📊 Test Summary Report");

console.log(`${colors.bright}Total Tests Run: ${totalTests}${colors.reset}`);
console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);
console.log(
  `${colors.cyan}Success Rate: ${((passedTests / totalTests) * 100).toFixed(
    1
  )}%${colors.reset}`
);

if (failedTests === 0) {
  console.log(
    `\n${colors.green}${colors.bright}🎉 ALL TESTS PASSED! 🎉${colors.reset}`
  );
  console.log(
    `${colors.green}The password-obscura library is working perfectly!${colors.reset}`
  );
} else {
  console.log(
    `\n${colors.yellow}⚠️  Some tests failed. Please review the results above.${colors.reset}`
  );
}

console.log(
  `\n${colors.cyan}${colors.bright}🔐 Password Obscura v2.0.0 - Test Suite Complete${colors.reset}\n`
);
