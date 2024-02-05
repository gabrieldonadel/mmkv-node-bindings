const { spawn } = require("child_process");
const path = require("path");

const runner = spawn("node", [path.join(__dirname, "compile.js")], {
  stdio: "inherit",
});

runner.on("close", () => {
  console.log("[mmkv-node-bindings] compile close");
});
runner.on("error", (err) => {
  console.log("[mmkv-node-bindings] compile error", err);
});
