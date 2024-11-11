import { writeFileSync } from 'node:fs';
import path from 'node:path';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { setConfig } from '../../utils/config';
import { generateLegacyCore } from '../core';
import { mockTemplates } from './mocks';

vi.mock('node:fs');

describe('generateLegacyCore', () => {
  let templates: Parameters<typeof generateLegacyCore>[2];
  beforeEach(() => {
    templates = mockTemplates;
  });

  it('writes to filesystem', async () => {
    const client: Parameters<typeof generateLegacyCore>[1] = {
      models: [],
      server: 'http://localhost:8080',
      services: [],
      types: {},
      version: '1.0',
    };

    setConfig({
      client: {
        name: 'legacy/fetch',
      },
      configFile: '',
      debug: false,
      dryRun: false,
      experimentalParser: false,
      exportCore: true,
      input: {
        path: '',
      },
      name: 'AppClient',
      output: {
        path: '',
      },
      pluginOrder: ['@hey-api/types', '@hey-api/schemas', '@hey-api/services'],
      plugins: {
        '@hey-api/schemas': {
          _handler: () => {},
          _handlerLegacy: () => {},
          name: '@hey-api/schemas',
        },
        '@hey-api/services': {
          _handler: () => {},
          _handlerLegacy: () => {},
          name: '@hey-api/services',
        },
        '@hey-api/types': {
          _handler: () => {},
          _handlerLegacy: () => {},
          enums: 'javascript',
          name: '@hey-api/types',
        },
      },
      useOptions: true,
    });

    await generateLegacyCore('/', client, templates);

    expect(writeFileSync).toHaveBeenCalledWith(
      path.resolve('/', '/OpenAPI.ts'),
      'settings',
    );
    expect(writeFileSync).toHaveBeenCalledWith(
      path.resolve('/', '/ApiError.ts'),
      'apiError',
    );
    expect(writeFileSync).toHaveBeenCalledWith(
      path.resolve('/', '/ApiRequestOptions.ts'),
      'apiRequestOptions',
    );
    expect(writeFileSync).toHaveBeenCalledWith(
      path.resolve('/', '/ApiResult.ts'),
      'apiResult',
    );
    expect(writeFileSync).toHaveBeenCalledWith(
      path.resolve('/', '/CancelablePromise.ts'),
      'cancelablePromise',
    );
    expect(writeFileSync).toHaveBeenCalledWith(
      path.resolve('/', '/request.ts'),
      'request',
    );
  });

  it('uses client server value for base', async () => {
    const client: Parameters<typeof generateLegacyCore>[1] = {
      models: [],
      server: 'http://localhost:8080',
      services: [],
      types: {},
      version: '1.0',
    };

    const config = setConfig({
      client: {
        name: 'legacy/fetch',
      },
      configFile: '',
      debug: false,
      dryRun: false,
      experimentalParser: false,
      exportCore: true,
      input: {
        path: '',
      },
      name: 'AppClient',
      output: {
        path: '',
      },
      pluginOrder: ['@hey-api/types', '@hey-api/schemas', '@hey-api/services'],
      plugins: {
        '@hey-api/schemas': {
          _handler: () => {},
          _handlerLegacy: () => {},
          name: '@hey-api/schemas',
        },
        '@hey-api/services': {
          _handler: () => {},
          _handlerLegacy: () => {},
          name: '@hey-api/services',
        },
        '@hey-api/types': {
          _handler: () => {},
          _handlerLegacy: () => {},
          enums: 'javascript',
          name: '@hey-api/types',
        },
      },
      useOptions: true,
    });

    await generateLegacyCore('/', client, templates);

    expect(templates.core.settings).toHaveBeenCalledWith({
      $config: config,
      httpRequest: 'FetchHttpRequest',
      server: 'http://localhost:8080',
      version: '1.0',
    });
  });

  it('uses custom value for base', async () => {
    const client: Parameters<typeof generateLegacyCore>[1] = {
      models: [],
      server: 'http://localhost:8080',
      services: [],
      types: {},
      version: '1.0',
    };

    const config = setConfig({
      base: 'foo',
      client: {
        name: 'legacy/fetch',
      },
      configFile: '',
      debug: false,
      dryRun: false,
      experimentalParser: false,
      exportCore: true,
      input: {
        path: '',
      },
      name: 'AppClient',
      output: {
        path: '',
      },
      pluginOrder: ['@hey-api/types', '@hey-api/schemas', '@hey-api/services'],
      plugins: {
        '@hey-api/schemas': {
          _handler: () => {},
          _handlerLegacy: () => {},
          name: '@hey-api/schemas',
        },
        '@hey-api/services': {
          _handler: () => {},
          _handlerLegacy: () => {},
          name: '@hey-api/services',
        },
        '@hey-api/types': {
          _handler: () => {},
          _handlerLegacy: () => {},
          enums: 'javascript',
          name: '@hey-api/types',
        },
      },
      useOptions: true,
    });

    await generateLegacyCore('/', client, templates);

    expect(templates.core.settings).toHaveBeenCalledWith({
      $config: config,
      httpRequest: 'FetchHttpRequest',
      server: 'foo',
      version: '1.0',
    });
  });
});
