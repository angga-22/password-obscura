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
    "Method to use (caesar, rot13, symbolMap, mirror)",
    "caesar"
  )
  .option("-s, --shift <shift>", "Shift amount (for caesar method)", "3")
  .action((text: string, options: any) => {
    try {
      const obscureOptions: ObscureOptions = {
        method: options.method as ObscureOptions["method"],
        shift: parseInt(options.shift) || 3,
      };

      // Validate method
      const validMethods = ["caesar", "rot13", "symbolMap", "mirror"];
      if (!validMethods.includes(obscureOptions.method)) {
        console.error(
          `Invalid method. Must be one of: ${validMethods.join(", ")}`
        );
        process.exit(1);
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
    "Method to use (caesar, rot13, symbolMap, mirror)",
    "caesar"
  )
  .option("-s, --shift <shift>", "Shift amount (for caesar method)", "3")
  .action((text: string, options: any) => {
    try {
      const obscureOptions: ObscureOptions = {
        method: options.method as ObscureOptions["method"],
        shift: parseInt(options.shift) || 3,
      };

      // Validate method
      const validMethods = ["caesar", "rot13", "symbolMap", "mirror"];
      if (!validMethods.includes(obscureOptions.method)) {
        console.error(
          `Invalid method. Must be one of: ${validMethods.join(", ")}`
        );
        process.exit(1);
      }

      const result = reveal(text, obscureOptions);
      console.log(result);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      process.exit(1);
    }
  });

program.parse(process.argv);
