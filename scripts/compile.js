const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const runtime = process.env.npm_config_cmake_node_runtime || "node";
const runtimeVersion =
  process.env.npm_config_cmake_node_runtimeversion || process.version;

function readConfig() {
  const packageJsonPath = path.join(process.cwd(), "package.json");

  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);

    return packageJson["mmkv-node-bindings"];
  } catch (error) {
    return {};
  }
}

const configValue = readConfig();
const arch = configValue?.["arch"] || [process.arch];

for (const i in arch) {
  spawn(
    "npx",
    [
      "cmake-js",
      "compile",
      "-r",
      runtime,
      "-v",
      runtimeVersion.replace("v", ""),
      "-a",
      arch[i],
      "-O",
      `build/${arch[i]}`,
    ],
    { stdio: "inherit" }
  );
}
