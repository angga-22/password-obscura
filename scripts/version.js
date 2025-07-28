#!/usr/bin/env node

// Version utility for password-obscura
// Usage: node scripts/version.js [check|current]

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packagePath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

const command = process.argv[2] || "current";

switch (command) {
  case "current":
    console.log(packageJson.version);
    break;

  case "check":
    console.log(`📦 Password Obscura v${packageJson.version}`);
    console.log(`📅 Package created: ${packageJson.name}`);
    console.log(`👤 Author: ${packageJson.author}`);
    console.log(`📝 Description: ${packageJson.description}`);

    // Check if built files exist
    const distPath = path.join(__dirname, "..", "dist");
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      console.log(`🔨 Built files: ${files.join(", ")}`);
    } else {
      console.log("⚠️  No built files found. Run `npm run build` first.");
    }

    // Check if changelog exists
    const changelogPath = path.join(__dirname, "..", "CHANGELOG.md");
    if (fs.existsSync(changelogPath)) {
      console.log("📋 CHANGELOG.md exists");
    } else {
      console.log("⚠️  CHANGELOG.md not found");
    }
    break;

  case "help":
  default:
    console.log("Usage: node scripts/version.js [command]");
    console.log("");
    console.log("Commands:");
    console.log("  current  Show current version");
    console.log("  check    Show detailed version information");
    console.log("  help     Show this help message");
    break;
}
