import ts from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json" assert { type: "json" };

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];
const config = {
  plugins: [
    json(),
    nodeResolve(),
    commonjs({ transformMixedEsModules: true }),
    ts({ clean: true, tsconfig: "tsconfig.json" }),
  ],
  treeshake: true,
  external,
}
export default [
  {
    input: "./index.ts",
    output: [
      {
        file: `./lib/index.cjs`,
        format: "cjs",
      },
      {
        file: `./lib/index.mjs`,
        format: "esm",
      },
    ],
    ...config,
  },
  {
    input: "./util.ts",
    output: [
      {
        file: `./lib/util.cjs`,
        format: "cjs",
      },
      {
        file: `./lib/util.mjs`,
        format: "esm",
      },
    ],
    ...config,
  }
];
