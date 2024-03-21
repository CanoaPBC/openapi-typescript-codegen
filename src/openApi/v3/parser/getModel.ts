import type { Model } from '../../../types/client';
import { getEnums } from '../../../utils/getEnums';
import { getPattern } from '../../../utils/getPattern';
import { getType } from '../../../utils/type';
import type { OpenApi } from '../interfaces/OpenApi';
import type { OpenApiSchema } from '../interfaces/OpenApiSchema';
import { findModelComposition, getModelComposition } from './getModelComposition';
import { getModelDefault } from './getModelDefault';
import { getAdditionalPropertiesModel, getModelProperties } from './getModelProperties';
import { inferType } from './inferType';

export const getModel = (
    openApi: OpenApi,
    definition: OpenApiSchema,
    isDefinition: boolean = false,
    name: string = '',
    parentDefinition: OpenApiSchema | null = null
): Model => {
    const inferredType = inferType(definition);
    const model: Model = {
        $refs: [],
        base: 'unknown',
        deprecated: Boolean(definition.deprecated),
        description: definition.description || null,
        enum: [],
        enums: [],
        exclusiveMaximum: definition.exclusiveMaximum,
        exclusiveMinimum: definition.exclusiveMinimum,
        export: 'interface',
        format: definition.format,
        imports: [],
        isDefinition,
        isNullable: definition.nullable === true,
        isReadOnly: definition.readOnly === true,
        isRequired: false,
        link: null,
        maximum: definition.maximum,
        maxItems: definition.maxItems,
        maxLength: definition.maxLength,
        maxProperties: definition.maxProperties,
        minimum: definition.minimum,
        minItems: definition.minItems,
        minLength: definition.minLength,
        minProperties: definition.minProperties,
        multipleOf: definition.multipleOf,
        name,
        pattern: getPattern(definition.pattern),
        properties: [],
        template: null,
        type: 'unknown',
        uniqueItems: definition.uniqueItems,
    };

    if (definition.$ref) {
        const definitionRef = getType(definition.$ref);
        model.$refs = [...model.$refs, definition.$ref];
        model.base = definitionRef.base;
        model.export = 'reference';
        model.imports = [...model.imports, ...definitionRef.imports];
        model.template = definitionRef.template;
        model.type = definitionRef.type;
        model.default = getModelDefault(definition, model);
        return model;
    }

    if (inferredType === 'enum') {
        const enums = getEnums(definition, definition.enum);
        if (enums.length) {
            model.base = 'string';
            model.enum = [...model.enum, ...enums];
            model.export = 'enum';
            model.type = 'string';
            model.default = getModelDefault(definition, model);
            return model;
        }
    }

    if (definition.type === 'array' && definition.items) {
        if (definition.items.$ref) {
            const arrayItems = getType(definition.items.$ref);
            model.$refs = [...model.$refs, definition.items.$ref];
            model.base = arrayItems.base;
            model.export = 'array';
            model.imports = [...model.imports, ...arrayItems.imports];
            model.template = arrayItems.template;
            model.type = arrayItems.type;
            model.default = getModelDefault(definition, model);
            return model;
        }

        if (definition.items.anyOf && parentDefinition && parentDefinition.type) {
            const foundComposition = findModelComposition(parentDefinition);
            if (foundComposition && foundComposition.definitions.some(definition => definition.type !== 'array')) {
                return getModel(openApi, definition.items);
            }
        }

        /**
         * if items are a plain array, infer any-of composition
         */
        const arrayItemsDefinition: OpenApiSchema = Array.isArray(definition.items)
            ? {
                  anyOf: definition.items,
              }
            : definition.items;
        const arrayItems = getModel(openApi, arrayItemsDefinition);
        model.base = arrayItems.base;
        model.export = 'array';
        model.$refs = [...model.$refs, ...arrayItems.$refs];
        model.imports = [...model.imports, ...arrayItems.imports];
        model.link = arrayItems;
        model.template = arrayItems.template;
        model.type = arrayItems.type;
        model.default = getModelDefault(definition, model);
        return model;
    }

    const foundComposition = findModelComposition(definition);
    if (foundComposition) {
        const composition = getModelComposition({
            ...foundComposition,
            definition,
            getModel,
            model,
            openApi,
        });
        return { ...model, ...composition };
    }

    if (definition.type === 'object' || definition.properties) {
        if (definition.properties) {
            model.base = 'any';
            model.export = 'interface';
            model.type = 'any';
            model.default = getModelDefault(definition, model);

            const modelProperties = getModelProperties(openApi, definition, getModel, model);
            modelProperties.forEach(modelProperty => {
                model.$refs = [...model.$refs, ...modelProperty.$refs];
                model.enums = [...model.enums, ...modelProperty.enums];
                model.imports = [...model.imports, ...modelProperty.imports];
                model.properties.push(modelProperty);
                if (modelProperty.export === 'enum') {
                    model.enums = [...model.enums, modelProperty];
                }
            });

            if (definition.additionalProperties === true) {
                const modelProperty = getAdditionalPropertiesModel(openApi, definition, getModel, model);
                model.properties.push(modelProperty);
            }

            return model;
        }

        return getAdditionalPropertiesModel(openApi, definition, getModel, model);
    }

    if (definition.const !== undefined) {
        const definitionConst = definition.const;
        const modelConst = typeof definitionConst === 'string' ? `"${definitionConst}"` : `${definitionConst}`;
        model.base = modelConst;
        model.export = 'const';
        model.type = modelConst;
        return model;
    }

    // If the schema has a type than it can be a basic or generic type.
    if (definition.type) {
        const definitionType = getType(definition.type, definition.format);
        model.base = definitionType.base;
        model.export = 'generic';
        model.$refs = [...model.$refs, ...definitionType.$refs];
        model.imports = [...model.imports, ...definitionType.imports];
        model.isNullable = definitionType.isNullable || model.isNullable;
        model.template = definitionType.template;
        model.type = definitionType.type;
        model.default = getModelDefault(definition, model);
        return model;
    }

    return model;
};
