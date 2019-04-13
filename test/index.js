const { execSync } = require("child_process");
const { resolve } = require("path");
const assert = require("assert");

const command =
  "./bin/migrate-go-mod.js -i=./test/fixtures -m=test -o=./test/dist";

console.log(execSync(command, { encoding: "utf-8" }));

const output = execSync("go run entry.go", {
  cwd: resolve("./test/dist"),
  encoding: "utf-8"
});

assert.equal(output.trim(), "it works");
