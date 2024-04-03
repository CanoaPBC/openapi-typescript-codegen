import { writeFileSync } from 'node:fs';
import path from 'node:path';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { writeClientCore } from '../core';
import { mockTemplates } from './mocks';

vi.mock('node:fs');

describe('writeClientCore', () => {
    let templates: Parameters<typeof writeClientCore>[1];
    beforeEach(() => {
        templates = mockTemplates;
    });

    it('should write to filesystem', async () => {
        const client: Parameters<typeof writeClientCore>[0] = {
            enumNames: [],
            models: [],
            server: 'http://localhost:8080',
            services: [],
            version: '1.0',
        };

        const config: Parameters<typeof writeClientCore>[3] = {
            client: 'fetch',
            debug: false,
            enums: 'javascript',
            experimental: false,
            exportCore: true,
            exportModels: true,
            exportSchemas: true,
            exportServices: true,
            format: false,
            input: '',
            lint: false,
            name: 'AppClient',
            operationId: true,
            output: '',
            postfixModels: '',
            postfixServices: '',
            serviceResponse: 'body',
            useDateType: false,
            useOptions: true,
            write: true,
        };

        await writeClientCore(client, templates, '/', config);

        expect(writeFileSync).toHaveBeenCalledWith(path.resolve('/', '/OpenAPI.ts'), 'settings');
        expect(writeFileSync).toHaveBeenCalledWith(path.resolve('/', '/ApiError.ts'), 'apiError');
        expect(writeFileSync).toHaveBeenCalledWith(path.resolve('/', '/ApiRequestOptions.ts'), 'apiRequestOptions');
        expect(writeFileSync).toHaveBeenCalledWith(path.resolve('/', '/ApiResult.ts'), 'apiResult');
        expect(writeFileSync).toHaveBeenCalledWith(path.resolve('/', '/CancelablePromise.ts'), 'cancelablePromise');
        expect(writeFileSync).toHaveBeenCalledWith(path.resolve('/', '/request.ts'), 'request');
        expect(writeFileSync).toHaveBeenCalledWith(path.resolve('/', '/types.ts'), 'types');
    });

    it('uses client server value for base', async () => {
        const client: Parameters<typeof writeClientCore>[0] = {
            enumNames: [],
            models: [],
            server: 'http://localhost:8080',
            services: [],
            version: '1.0',
        };

        const config: Parameters<typeof writeClientCore>[3] = {
            client: 'fetch',
            debug: false,
            enums: 'javascript',
            experimental: false,
            exportCore: true,
            exportModels: true,
            exportSchemas: true,
            exportServices: true,
            format: false,
            input: '',
            lint: false,
            name: 'AppClient',
            operationId: true,
            output: '',
            postfixModels: '',
            postfixServices: '',
            serviceResponse: 'body',
            useDateType: false,
            useOptions: true,
            write: true,
        };

        await writeClientCore(client, templates, '/', config);

        expect(templates.core.settings).toHaveBeenCalledWith({
            $config: config,
            httpRequest: 'FetchHttpRequest',
            server: 'http://localhost:8080',
            version: '1.0',
        });
    });

    it('uses custom value for base', async () => {
        const client: Parameters<typeof writeClientCore>[0] = {
            enumNames: [],
            models: [],
            server: 'http://localhost:8080',
            services: [],
            version: '1.0',
        };

        const config: Parameters<typeof writeClientCore>[3] = {
            base: 'foo',
            client: 'fetch',
            debug: false,
            enums: 'javascript',
            experimental: false,
            exportCore: true,
            exportModels: true,
            exportSchemas: true,
            exportServices: true,
            format: false,
            input: '',
            lint: false,
            name: 'AppClient',
            operationId: true,
            output: '',
            postfixModels: '',
            postfixServices: '',
            serviceResponse: 'body',
            useDateType: false,
            useOptions: true,
            write: true,
        };

        await writeClientCore(client, templates, '/', config);

        expect(templates.core.settings).toHaveBeenCalledWith({
            $config: config,
            httpRequest: 'FetchHttpRequest',
            server: 'foo',
            version: '1.0',
        });
    });
});
