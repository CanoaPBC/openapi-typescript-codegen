import { readFileSync } from 'node:fs';

import { sync } from 'glob';
import { describe, expect, it } from 'vitest';

import { createClient } from '../';
import type { UserConfig } from '../src/types/config';

const V2_SPEC_PATH = './test/spec/v2.json';
const V3_SPEC_PATH = './test/spec/v3.json';

const OUTPUT_PREFIX = './test/generated/';

const toOutputPath = (name: string) => `${OUTPUT_PREFIX}${name}/`;
const toSnapshotPath = (file: string) =>
  `./__snapshots__/${file.replace(OUTPUT_PREFIX, '')}.snap`;

describe('OpenAPI v2', () => {
  it.each([
    {
      config: {
        client: 'fetch',
        exportCore: true,
        input: '',
        output: '',
        schemas: true,
        services: true,
        types: {
          enums: 'javascript',
        },
        useOptions: true,
      } as UserConfig,
      description: 'generate fetch client',
      name: 'v2',
    },
  ])('$description', async ({ name, config }) => {
    const output = toOutputPath(name);
    await createClient({
      ...config,
      input: V2_SPEC_PATH,
      output,
    });
    sync(`${output}**/*.ts`).forEach((file) => {
      const content = readFileSync(file, 'utf8').toString();
      expect(content).toMatchFileSnapshot(toSnapshotPath(file));
    });
  });
});

describe('OpenAPI v3', () => {
  const config: UserConfig = {
    client: 'fetch',
    exportCore: true,
    input: '',
    output: '',
    schemas: true,
    services: true,
    types: {
      enums: 'javascript',
    },
    useOptions: true,
  };

  const createConfig = (userConfig?: Partial<UserConfig>): UserConfig => ({
    ...config,
    ...userConfig,
  });

  it.each([
    {
      config: createConfig(),
      description: 'generate fetch client',
      name: 'v3',
    },
    {
      config: createConfig({
        client: 'angular',
        schemas: false,
        types: {},
      }),
      description: 'generate angular client',
      name: 'v3_angular',
    },
    {
      config: createConfig({
        client: 'node',
        schemas: false,
        services: false,
        types: false,
      }),
      description: 'generate node client',
      name: 'v3_node',
    },
    {
      config: createConfig({
        client: 'axios',
        schemas: false,
        services: false,
        types: false,
      }),
      description: 'generate axios client',
      name: 'v3_axios',
    },
    {
      config: createConfig({
        client: 'xhr',
        schemas: false,
        services: false,
        types: false,
      }),
      description: 'generate xhr client',
      name: 'v3_xhr',
    },
    {
      config: createConfig({
        exportCore: false,
        schemas: false,
        services: false,
        types: {
          dates: true,
          include: '^ModelWithPattern',
        },
      }),
      description: 'generate Date types',
      name: 'v3_date',
    },
    {
      config: createConfig({
        schemas: false,
        services: '^Defaults',
        types: {
          dates: true,
          include: '^ModelWithString',
        },
        useOptions: false,
      }),
      description: 'generate legacy positional arguments',
      name: 'v3_legacy_positional_args',
    },
    {
      config: createConfig({
        schemas: false,
        services: '^Defaults',
        types: {
          dates: true,
          include: '^ModelWithString',
        },
      }),
      description: 'generate optional arguments',
      name: 'v3_options',
    },
    {
      config: createConfig({
        name: 'ApiClient',
        schemas: false,
        types: {
          dates: true,
        },
      }),
      description: 'generate client',
      name: 'v3_client',
    },
    {
      config: createConfig({
        schemas: false,
        types: {
          enums: 'typescript',
        },
      }),
      description: 'generate TypeScript enums',
      name: 'v3_enums_typescript',
    },
    {
      config: createConfig({
        exportCore: false,
        schemas: false,
        services: false,
        types: {},
      }),
      description: 'generate models',
      name: 'v3_models',
    },
    {
      config: createConfig({
        exportCore: false,
        schemas: false,
        services: false,
        types: {
          include: '^(CamelCaseCommentWithBreaks|ArrayWithProperties)',
          name: 'PascalCase',
        },
      }),
      description: 'generate pascalcase types',
      name: 'v3_pascalcase',
    },
    {
      config: createConfig({
        exportCore: false,
        schemas: false,
        services: {
          include: '^(Simple|Parameters)',
          name: 'myAwesome{{name}}Api',
        },
        types: false,
      }),
      description: 'generate services with custom name',
      name: 'v3_services_name',
    },
    {
      config: createConfig({
        exportCore: false,
        schemas: {
          type: 'json',
        },
        services: false,
        types: false,
      }),
      description: 'generate JSON Schemas',
      name: 'v3_schemas_json',
    },
    {
      config: createConfig({
        exportCore: false,
        schemas: {
          type: 'form',
        },
        services: false,
        types: false,
      }),
      description: 'generate form validation schemas',
      name: 'v3_schemas_form',
    },
  ])('$description', async ({ name, config }) => {
    const output = toOutputPath(name);
    await createClient({
      ...config,
      input: V3_SPEC_PATH,
      output,
    });
    sync(`${output}**/*.ts`).forEach((file) => {
      const content = readFileSync(file, 'utf8').toString();
      expect(content).toMatchFileSnapshot(toSnapshotPath(file));
    });
  });
});
