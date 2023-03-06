const { build } = require("esbuild");

const options = {
  entryPoints: ["./server.js"],
  target: ["node18.12.1"],
  outdir: "dist",
  sourcemap: true,
  // splitting: true, //only works with the "esm" format
  minify: true,
  bundle: true,
  platform: "node",
  format: "cjs",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  // external: ["./node_modules/*"],
  loader: {
    ".glsl": "text",
  },
};

// run build with esbuild
build(options).catch(() => process.exit(1));
