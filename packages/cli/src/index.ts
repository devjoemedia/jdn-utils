#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import prompts from "prompts";
import { reset } from "kolorist";
import { HOOK_REGISTRY } from "./registry/index.js";

const [, , ...args] = process.argv;

const defaultUtilityTargetDir = "utils";
const defaultHooksTargetDir = "hooks";

const init = async () => {
  const argv = minimist(process.argv.slice(2), { string: ["_"] });

  // STEP 1: check for add command
  const [add, filename] = argv._;
  if (add !== "add") {
    return console.log("Please specify a command like: npx add usePagination");
  }
  if (!filename) {
    return console.log(
      "Please specify a file name like: npx add usePagination"
    );
  }

  const fileExists = HOOK_REGISTRY.find((f) => f.name === filename);
  if (!fileExists) {
    return console.log("We have no such file");
  }

  let userChoices;

  try {
    userChoices = await prompts([
      {
        type: "select",
        name: "type",
        message: reset("Select a type:"),
        choices: [
          { title: "hook", value: "hook" },
          { title: "utility", value: "utility" },
        ],
      },
      {
        type: "select",
        name: "variant",
        message: reset("Select a variant:"),
        choices: [
          { title: "JavaScript", value: "JavaScript" },
          { title: "TypeScript", value: "TypeScript" },
        ],
      },
    ]);
    console.log({ userChoices, args, argv });
  } catch (error) {
    console.log(error);
    return;
  }

  const { type: fileType, variant } = userChoices;
  const ext = variant.toLowerCase() === "typescript" ? ".ts" : ".js";
  const dir = fileType === "hook" ? "hooks" : "utils";
  const filePath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    `../${dir}/${filename}${ext}`
  );
  const defaultDir =
    fileType === "hook" ? defaultHooksTargetDir : defaultUtilityTargetDir;

  try {
    await copyFile(filePath, defaultDir);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

/**
 * Copies a file from one directory to another.
 * @param filePath - The path to the source file.
 * @param destPath - The path to the destination directory.
 */
async function copyFile(filePath, destPath) {
  try {
    // Ensure the destination directory exists, create if it doesn't
    await fs.mkdir(destPath, { recursive: true });

    // Construct the destination file path
    const destFilePath = path.join(destPath, path.basename(filePath));

    // Check if the source file exists
    try {
      await fs.access(filePath);
    } catch {
      throw new Error(`Source file does not exist: ${filePath}`);
    }

    // Copy the file from source to destination
    await fs.copyFile(filePath, destFilePath);

    console.log(`File copied from ${filePath} to ${destFilePath}`);
  } catch (error) {
    console.error(`Error copying file from ${filePath} to ${destPath}:`, error);
    throw error;
  }
}

init();
