import { writeFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it, vi } from 'vitest';

import { writeClientModels } from '../models';
import { mockTemplates } from './mocks';

vi.mock('node:fs');

describe('writeClientModels', () => {
    it('should write to filesystem', async () => {
        const client: Parameters<typeof writeClientModels>[0] = {
            enumNames: [],
            models: [
                {
                    $refs: [],
                    base: 'User',
                    description: null,
                    enum: [],
                    enums: [],
                    export: 'interface',
                    imports: [],
                    isDefinition: true,
                    isNullable: false,
                    isReadOnly: false,
                    isRequired: false,
                    link: null,
                    name: 'User',
                    properties: [],
                    template: null,
                    type: 'User',
                },
            ],
            server: 'http://localhost:8080',
            services: [],
            version: 'v1',
        };

        await writeClientModels(client, mockTemplates, '/', {
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
        });

        expect(writeFileSync).toHaveBeenCalledWith(path.resolve('/', '/models.ts'), 'model');
    });
});
