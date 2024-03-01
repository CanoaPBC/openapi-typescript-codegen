import { resolve } from 'path';

import type { Model } from '../client/interfaces/Model';
import type { Options } from '../client/interfaces/Options';
import { writeFile } from './fileSystem';
import { formatCode as f } from './formatCode';
import { formatIndentation as i } from './formatIndentation';
import type { Templates } from './registerHandlebarTemplates';

/**
 * Generate Models using the Handlebar template and write to disk.
 * @param models Array of Models to write
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param options Options passed to the `generate()` function
 */
export const writeClientModels = async (
    models: Model[],
    templates: Templates,
    outputPath: string,
    options: Pick<Required<Options>, 'httpClient' | 'indent' | 'useDateType' | 'useUnionTypes'>
): Promise<void> => {
    const { httpClient, indent, useDateType, useUnionTypes } = options;
    for (const model of models) {
        const file = resolve(outputPath, `${model.name}.ts`);
        const templateResult = templates.exports.model({
            ...model,
            httpClient,
            useDateType,
            useUnionTypes,
        });
        await writeFile(file, i(f(templateResult), indent));
    }
};
