const { build } = require("esbuild");
// const { aliasPath } = require("esbuild-plugin-alias-path");
// const path = require("path");
// const externalPackage = require("esbuild-plugin-external-package");
// const copyStaticFiles = require('esbuild-copy-static-files')
const { copy } = require('esbuild-plugin-copy');

const options = {
  entryPoints: ["./src/server.js"],
  target: ["node18.12.1"],
  outfile: "dist/server.js",
  sourcemap: true,
  // splitting: true, //only works with the "esm" format
  minify: true,
  bundle: true,
  // watch: true,
  platform: "node",
  format: "cjs",
  define: { "process.env.NODE_ENV": "\"production\"" },
  // external: [
  //   "./node_modules/*",
  //   "./keys/*",
  //   "./logs/*",
  // ],
  // packages: 'external',
  loader: {
    // ".pem": "file",
    ".glsl": "text",
  },
  plugins: [
    copy({
      assets: [
        {
          from: ['./keys/**/*'],
          to: ['./keys'],
        },
       
      ],
    }),
    // externalPackage
  ],
};

// run build with esbuild
// build(options).catch(() => process.exit(1));
(async () => {
  const res = await build(options);
  if (!res) {
    process.exit(1);
  }
})();
