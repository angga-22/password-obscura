import { Command } from "commander";
import { obscure, reveal, ObscureOptions } from "../src/index.js";

const program = new Command();

program
  .name("password-obscura")
  .description(
    "A lightweight tool to visually obscure passwords or strings using various cipher methods"
  )
  .version("1.0.0");

program
  .command("encode")
  .argument("<text>", "Text to encode")
  .option(
    "-m, --method <method>",
    "Method to use (caesar, rot13, symbolMap, mirror, multiTable, polyalphabetic, advanced)",
    "caesar"
  )
  .option("-s, --shift <shift>", "Shift amount (for caesar method)", "3")
  .option("-k, --keyword <keyword>", "Keyword for polyalphabetic cipher")
  .option(
    "-p, --pattern <pattern>",
    "Shift pattern for multiTable (even-odd, fibonacci, prime, progressive, custom)",
    "even-odd"
  )
  .option(
    "--custom-shifts <shifts>",
    "Custom shifts for multiTable (comma-separated numbers)"
  )
  .action((text: string, options: any) => {
    try {
      const obscureOptions: ObscureOptions = {
        method: options.method as ObscureOptions["method"],
      };

      // Validate method
      const validMethods = [
        "caesar",
        "rot13",
        "symbolMap",
        "mirror",
        "multiTable",
        "polyalphabetic",
        "advanced",
      ];
      if (!validMethods.includes(obscureOptions.method)) {
        console.error(
          `Invalid method. Must be one of: ${validMethods.join(", ")}`
        );
        process.exit(1);
      }

      // Configure based on method
      switch (obscureOptions.method) {
        case "caesar":
          obscureOptions.shift = parseInt(options.shift) || 3;
          break;

        case "multiTable":
          obscureOptions.tableConfig = {
            tables: [
              "abcdefghijklmnopqrstuvwxyz",
              "zyxwvutsrqponmlkjihgfedcba",
            ],
            shiftPattern: options.pattern || "even-odd",
            baseShift: parseInt(options.shift) || 3,
            customShifts: options.customShifts
              ? options.customShifts.split(",").map((n: string) => parseInt(n))
              : undefined,
          };
          break;

        case "polyalphabetic":
          if (!options.keyword) {
            console.error(
              "Keyword is required for polyalphabetic method. Use --keyword option."
            );
            process.exit(1);
          }
          obscureOptions.polyConfig = {
            keyword: options.keyword,
          };
          break;

        case "advanced":
          // Use default advanced configuration
          break;
      }

      const result = obscure(text, obscureOptions);
      console.log(result);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      process.exit(1);
    }
  });

program
  .command("decode")
  .argument("<text>", "Text to decode")
  .option(
    "-m, --method <method>",
    "Method to use (caesar, rot13, symbolMap, mirror, multiTable, polyalphabetic, advanced)",
    "caesar"
  )
  .option("-s, --shift <shift>", "Shift amount (for caesar method)", "3")
  .option("-k, --keyword <keyword>", "Keyword for polyalphabetic cipher")
  .option(
    "-p, --pattern <pattern>",
    "Shift pattern for multiTable (even-odd, fibonacci, prime, progressive, custom)",
    "even-odd"
  )
  .option(
    "--custom-shifts <shifts>",
    "Custom shifts for multiTable (comma-separated numbers)"
  )
  .action((text: string, options: any) => {
    try {
      const obscureOptions: ObscureOptions = {
        method: options.method as ObscureOptions["method"],
      };

      // Validate method
      const validMethods = [
        "caesar",
        "rot13",
        "symbolMap",
        "mirror",
        "multiTable",
        "polyalphabetic",
        "advanced",
      ];
      if (!validMethods.includes(obscureOptions.method)) {
        console.error(
          `Invalid method. Must be one of: ${validMethods.join(", ")}`
        );
        process.exit(1);
      }

      // Configure based on method (same as encode)
      switch (obscureOptions.method) {
        case "caesar":
          obscureOptions.shift = parseInt(options.shift) || 3;
          break;

        case "multiTable":
          obscureOptions.tableConfig = {
            tables: [
              "abcdefghijklmnopqrstuvwxyz",
              "zyxwvutsrqponmlkjihgfedcba",
            ],
            shiftPattern: options.pattern || "even-odd",
            baseShift: parseInt(options.shift) || 3,
            customShifts: options.customShifts
              ? options.customShifts.split(",").map((n: string) => parseInt(n))
              : undefined,
          };
          break;

        case "polyalphabetic":
          if (!options.keyword) {
            console.error(
              "Keyword is required for polyalphabetic method. Use --keyword option."
            );
            process.exit(1);
          }
          obscureOptions.polyConfig = {
            keyword: options.keyword,
          };
          break;

        case "advanced":
          // Use default advanced configuration
          break;
      }

      const result = reveal(text, obscureOptions);
      console.log(result);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      process.exit(1);
    }
  });

program.parse(process.argv);
