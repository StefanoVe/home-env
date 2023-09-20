const fixNodeRequire = (code: string) => {
  const result = code
    .replace(
      /(var|const|let)\s+(\w+\s*)=\s*\(\s*\w+\s*\)\s*=>\s*\{\s*return\s*import\.meta\.require\s*\(\s*\w+\s*\)\s*;?\s*\}\s*;?/i,
      `import{createRequire as zz_requireFix}from'node:module';\n$1 $2=zz_requireFix(import.meta.url);`
    )
    .replace(
      //use a regex to replace all instances of Bun.env with process.env
      /Bun\.env/g,
      'process.env'
    );

  return `
  import fs from 'fs';
  const env = fs.readFileSync('${Bun.env.SSH_SERVER_PATH}/${Bun.env.PRODUCTION_ENV_FILE}', 'utf-8');
  console.log(env);
  process.env = JSON.parse(env);
    ${result}`;
};

const _asyncForEach = async <T>(
  array: T[],
  callback: (item: T, index: number, array: any[]) => Promise<void>
) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const result = await Bun.build({
  entrypoints: ['./server/src/index.ts'],
  outdir: './dist/server',
  target: 'node',
});

_asyncForEach(result.outputs, async (file) => {
  const code = await file.text();
  const result = fixNodeRequire(code);

  await Bun.write(file.path.replace('js', 'mjs'), result);
});
