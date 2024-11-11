import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { createClient } from '../';
import type { UserConfig } from '../src/types/config';
import { getFilePaths } from './utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION = '3.0.x';

const outputDir = path.join(__dirname, 'generated', VERSION);

describe(`OpenAPI ${VERSION}`, () => {
  const createConfig = (userConfig: UserConfig): UserConfig => ({
    client: '@hey-api/client-fetch',
    experimentalParser: true,
    plugins: ['@hey-api/types'],
    ...userConfig,
    input: path.join(
      __dirname,
      'spec',
      VERSION,
      typeof userConfig.input === 'string' ? userConfig.input : '',
    ),
    output: path.join(
      outputDir,
      typeof userConfig.output === 'string' ? userConfig.output : '',
    ),
  });

  const scenarios = [
    {
      config: createConfig({
        input: 'additional-properties-false.json',
        output: 'additional-properties-false',
      }),
      description: 'forbids arbitrary properties on objects',
    },
    {
      config: createConfig({
        input: 'additional-properties-true.json',
        output: 'additional-properties-true',
      }),
      description: 'allows arbitrary properties on objects',
    },
    {
      config: createConfig({
        input: 'array-items-one-of-length-1.json',
        output: 'array-items-one-of-length-1',
      }),
      description:
        'generates correct array when items are oneOf array with single item',
    },
    {
      config: createConfig({
        input: 'discriminator-all-of.yaml',
        output: 'discriminator-all-of',
      }),
      description: 'handles discriminator with and without mapping',
    },
    {
      config: createConfig({
        input: 'discriminator-any-of.yaml',
        output: 'discriminator-any-of',
      }),
      description: 'handles discriminator with and without mapping',
    },
    {
      config: createConfig({
        input: 'discriminator-one-of.yaml',
        output: 'discriminator-one-of',
      }),
      description: 'handles discriminator with and without mapping',
    },
    {
      config: createConfig({
        input: 'enum-escape.json',
        output: 'enum-escape',
      }),
      description: 'escapes enum values',
    },
    {
      config: createConfig({
        input: 'enum-null.json',
        output: 'enum-null',
      }),
      description: 'handles null enums',
    },
    {
      config: createConfig({
        input: 'operation-204.json',
        output: 'operation-204',
        plugins: [
          {
            name: '@hey-api/types',
            tree: true,
          },
        ],
      }),
      description: 'handles empty response status codes',
    },
    {
      config: createConfig({
        input: 'parameter-explode-false.json',
        output: 'parameter-explode-false',
        plugins: ['@hey-api/services'],
      }),
      description: 'handles non-exploded array query parameters',
    },
  ];

  it.each(scenarios)('$description', async ({ config }) => {
    await createClient(config);

    const outputPath = typeof config.output === 'string' ? config.output : '';
    const filePaths = getFilePaths(outputPath);

    filePaths.forEach((filePath) => {
      const fileContent = readFileSync(filePath, 'utf-8');
      expect(fileContent).toMatchFileSnapshot(
        path.join(
          __dirname,
          '__snapshots__',
          VERSION,
          filePath.slice(outputDir.length + 1),
        ),
      );
    });
  });
});
