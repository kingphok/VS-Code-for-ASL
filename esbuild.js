const esbuild = require('esbuild');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

async function main() {
  const commonConfig = {
    entryPoints: ['src-ts/extension.ts'],
    bundle: true,
    format: 'cjs',
    minify: production,
    sourcemap: !production,
    external: ['vscode'],
    logLevel: 'info',
    drop: production ? ['console'] : [],
  };

  const desktopConfig = {
    ...commonConfig,
    platform: 'node',
    outfile: 'out/extension.js',
  };

  const webConfig = {
    ...commonConfig,
    platform: 'browser',
    outfile: 'out/web/extension.js',
  };

  const ctxDesktop = await esbuild.context(desktopConfig);
  const ctxWeb = await esbuild.context(webConfig);

  if (watch) {
    await Promise.all([
      ctxDesktop.watch(),
      ctxWeb.watch()
    ]);
  } else {
    await Promise.all([
      ctxDesktop.rebuild(),
      ctxWeb.rebuild()
    ]);
    await Promise.all([
      ctxDesktop.dispose(),
      ctxWeb.dispose()
    ]);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
