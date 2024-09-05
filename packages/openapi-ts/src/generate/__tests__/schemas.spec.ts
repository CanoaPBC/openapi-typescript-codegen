import { writeFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it, vi } from 'vitest';

import type { OpenApiSchemaV3 } from '../../generator/openApi';
import type { Files } from '../../types/utils';
import { setConfig } from '../../utils/config';
import { generateSchemas } from '../schemas';
import { openApi } from './mocks';

vi.mock('node:fs');

describe('generateSchemas', () => {
  it('writes to filesystem', async () => {
    setConfig({
      client: {
        name: 'legacy/fetch',
      },
      configFile: '',
      debug: false,
      dryRun: false,
      experimental_parser: false,
      exportCore: true,
      input: '',
      name: 'AppClient',
      output: {
        path: '',
      },
      plugins: [],
      schemas: {
        export: true,
      },
      services: {},
      types: {
        enums: 'javascript',
      },
      useOptions: true,
    });

    if ('openapi' in openApi) {
      openApi.components = {
        schemas: {
          foo: {
            type: 'object',
          },
        },
      };
    }

    const files: Files = {};

    await generateSchemas({ files, openApi });

    files.schemas.write();

    expect(writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining(path.resolve('schemas.gen.ts')),
      expect.anything(),
    );
  });

  it('uses custom schema name', async () => {
    const nameFn = vi.fn().mockReturnValue('customName');

    setConfig({
      client: {
        name: 'legacy/fetch',
      },
      configFile: '',
      debug: false,
      dryRun: false,
      experimental_parser: false,
      exportCore: true,
      input: '',
      name: 'AppClient',
      output: {
        path: '',
      },
      plugins: [],
      schemas: {
        export: true,
        name: nameFn,
      },
      services: {},
      types: {
        enums: 'javascript',
      },
      useOptions: true,
    });

    const schema: OpenApiSchemaV3 = {
      type: 'object',
    };

    if ('openapi' in openApi) {
      openApi.components = {
        schemas: {
          foo: schema,
        },
      };
    }

    const files: Files = {};

    await generateSchemas({ files, openApi });

    files.schemas.write();

    expect(writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining(path.resolve('schemas.gen.ts')),
      expect.anything(),
    );

    expect(nameFn).toHaveBeenCalledWith('foo', schema);
  });
});
