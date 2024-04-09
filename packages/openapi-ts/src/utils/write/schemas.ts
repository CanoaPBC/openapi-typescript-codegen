import path from 'node:path';

import { compiler, TypeScriptFile } from '../../compiler';
import type { OpenApi } from '../../openApi';

/**
 * Generate Schemas using the Handlebar template and write to disk.
 * @param openApi {@link OpenApi} Dereferenced OpenAPI specification
 * @param outputPath Directory to write the generated files to
 */
export const writeClientSchemas = async (openApi: OpenApi, outputPath: string): Promise<void> => {
    const file = new TypeScriptFile();

    const addSchema = (name: string, obj: any) => {
        // openapi might add dashes to schema names, which breaks the whole TS file
        name = name.replace(/-/g, '_');
        const expression = compiler.types.object(obj);
        const statement = compiler.export.asConst(name, expression);
        file.add(statement);
    };

    // OpenAPI 2.0
    if ('swagger' in openApi) {
        for (const name in openApi.definitions) {
            if (openApi.definitions.hasOwnProperty(name)) {
                const definition = openApi.definitions[name];
                addSchema(`$${name}`, definition);
            }
        }
    }

    // OpenAPI 3.x
    if ('openapi' in openApi) {
        if (openApi.components) {
            for (const name in openApi.components.schemas) {
                if (openApi.components.schemas.hasOwnProperty(name)) {
                    const schema = openApi.components.schemas[name];
                    addSchema(`$${name}`, schema);
                }
            }
            for (const name in openApi.components.parameters) {
                if (openApi.components.parameters.hasOwnProperty(name)) {
                    const parameter = openApi.components.parameters[name];
                    addSchema(`$${name}`, parameter);
                }
            }
        }
    }

    file.write(path.resolve(outputPath, 'schemas.ts'), '\n\n');
};
