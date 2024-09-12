import { compiler, TypeScriptFile } from '../compiler';
import type { OpenApi, OpenApiV2Schema, OpenApiV3Schema } from '../openApi';
import { ensureValidTypeScriptJavaScriptIdentifier } from '../openApi';
import type { Files } from '../types/utils';
import { getConfig } from '../utils/config';

const ensureValidSchemaOutput = (
  schema: unknown,
  parentKey?: string,
): object => {
  const config = getConfig();

  if (Array.isArray(schema)) {
    return schema.map((item) => ensureValidSchemaOutput(item));
  }

  if (typeof schema !== 'object' || schema === null) {
    return schema as object;
  }

  const result = { ...schema };

  if ('oneOf' in result && Array.isArray(result.oneOf)) {
    const oneOfArray = result.oneOf as any[];
    const hasNull = oneOfArray.some((item) => item === null || item?.nullable);

    if (hasNull) {
      result.oneOf = oneOfArray.filter(
        (item, index) =>
          !(item === null || item?.nullable) ||
          index === oneOfArray.findIndex((i) => i === null || i?.nullable),
      );
    }
  }

  Object.entries(result).forEach(([key, value]) => {
    if (config.schemas.type === 'form') {
      if (
        [
          'description',
          'x-enum-descriptions',
          'x-enum-varnames',
          'x-enumNames',
          'title',
        ].includes(key) &&
        parentKey !== 'properties'
      ) {
        // @ts-expect-error
        delete result[key];
        return;
      }
    }

    // refs are encoded probably by json-schema-ref-parser, didn't investigate
    // further
    if (key === '$ref' && typeof value === 'string') {
      // @ts-expect-error
      result[key] = decodeURIComponent(value);
    }

    if (value && typeof value === 'object') {
      // @ts-expect-error
      result[key] = ensureValidSchemaOutput(value, key);
    }
  });
  return result;
};

const toSchemaName = (
  name: string,
  schema: OpenApiV2Schema | OpenApiV3Schema,
): string => {
  const config = getConfig();

  const validName = ensureValidTypeScriptJavaScriptIdentifier(name);

  if (config.schemas.name) {
    return config.schemas.name(validName, schema);
  }

  return `${validName}Schema`;
};

export const generateSchemas = async ({
  files,
  openApi,
}: {
  files: Files;
  openApi: OpenApi;
}): Promise<void> => {
  const config = getConfig();

  if (!config.schemas.export) {
    return;
  }

  files.schemas = new TypeScriptFile({
    dir: config.output.path,
    name: 'schemas.ts',
  });

  const addSchema = (
    name: string,
    schema: OpenApiV2Schema | OpenApiV3Schema,
  ) => {
    const obj = ensureValidSchemaOutput(schema);
    const expression = compiler.objectExpression({ obj });
    const statement = compiler.constVariable({
      assertion: 'const',
      exportConst: true,
      expression,
      name: toSchemaName(name, schema),
    });
    files.schemas.add(statement);
  };

  // OpenAPI 2.0
  if ('swagger' in openApi) {
    Object.entries(openApi.definitions ?? {}).forEach(([name, definition]) => {
      addSchema(name, definition);
    });
  }

  // OpenAPI 3.x
  if ('openapi' in openApi) {
    Object.entries(openApi.components?.schemas ?? {}).forEach(
      ([name, schema]) => {
        addSchema(name, schema);
      },
    );
  }
};
