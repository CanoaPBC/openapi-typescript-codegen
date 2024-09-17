const path = require('node:path');

const main = async () => {
  /** @type {import('../src/node').UserConfig} */
  const config = {
    client: {
      // bundle: true,
      // name: '@hey-api/client-axios',
      name: '@hey-api/client-fetch',
    },
    // debug: true,
    experimental_parser: true,
    // input: './test/spec/v3-transforms.json',
    input: './test/spec/v3.json',
    // input: './test/spec/v2.json',
    // input: 'https://mongodb-mms-prod-build-server.s3.amazonaws.com/openapi/2caffd88277a4e27c95dcefc7e3b6a63a3b03297-v2-2023-11-15.json',
    // name: 'foo',
    output: {
      path: './test/generated/sample/',
    },
    plugins: [
      {
        // infiniteQueryOptions: false,
        // mutationOptions: false,
        name: '@tanstack/react-query',
        // queryOptions: false,
      },
      // '@hey-api/services',
    ],
    schemas: {
      export: false,
    },
    services: {
      // export: false,
      // asClass: true,
      filter: '^POST /api/v{api-version}/upload$',
      // export: false,
      // name: '^Parameters',
    },
    types: {
      // dates: 'types+transform',
      // enums: 'javascript',
      // export: false,
      // include:
      //   '^(_400|CompositionWithOneOfAndProperties)',
      // name: 'PascalCase',
      tree: false,
    },
    // useOptions: false,
  };

  const { createClient } = await import(
    path.resolve(process.cwd(), 'dist/node/index.cjs')
  );
  await createClient(config);
};

main();
