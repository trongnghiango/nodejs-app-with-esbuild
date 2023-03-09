// eslint-disable-next-line import/no-extraneous-dependencies
const { build } = require('esbuild');
// eslint-disable-next-line import/no-extraneous-dependencies
const esBuildDevServer = require('esbuild-dev-server');

esBuildDevServer.start(
  build({
    entryPoints: ['./src/server.js'],
    outdir: 'distt',
    incremental: true,
    // and more options ...
  }),
  {
    port: '8888', // optional, default: 8080
    watchDir: '.', // optional, default: "src"
    index: 'dist/index.html', // optional
    staticDir: 'dist', // optional
    // @ts-ignore
    onBeforeRebuild: {}, // optional
    // @ts-ignore
    onAfterRebuild: {}, // optional
  }
);
