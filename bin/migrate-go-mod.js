#!/usr/bin/env node

const { dirname, resolve, relative } = require("path");
const { execSync } = require("child_process");
const globby = require("globby");
const yargs = require("yargs");
const { readFile, writeFile, copy, exists } = require("fs-extra");

const importRegexp = /\bimport\s+(\(.*?\)|\w*\s*\".*?\")/s;
const pathRegexp = /\"(\..*?)\"/;

async function main() {
  const { i: input, m: name, o: output } = yargs
    .usage("Usage: $0 -m <module> -i <input> -o <output>")
    .demandOption(["m", "i", "o"]).argv;

  const baseDir = resolve(input);
  const cwd = resolve(output);

  if (baseDir !== cwd) await copy(baseDir, cwd);

  const isGoModFileExists = await exists(resolve(cwd, "go.mod"));
  if (!isGoModFileExists) {
    console.log(execSync(`go mod init ${name}`, { cwd, encoding: "utf-8" }));
  }

  const modules = await globby("**/*.go", { absolute: true, cwd });
  for (const filePath of modules) {
    const replacePath = (match, modulePath) => {
      const absolutePath = resolve(dirname(filePath), modulePath);
      const relatedPath = relative(cwd, absolutePath);
      return `"${name}/${relatedPath}"`;
    };

    const content = await readFile(filePath, "utf-8");
    const replaced = content.replace(importRegexp, match =>
      match
        .split("\n")
        .map(line => line.replace(pathRegexp, replacePath))
        .join("\n")
    );
    await writeFile(filePath, replaced, "utf-8");
    console.log("✅ ", relative(cwd, filePath));
  }
}

main().catch(console.error);
