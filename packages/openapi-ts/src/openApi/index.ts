import { IRContext } from '../ir/context';
import type { Config } from '../types/config';
import { type OpenApiV3_0_X, parseV3_0_X } from './3.0.x';
import { type OpenApiV3_1_X, parseV3_1_X } from './3.1.x';
import type { Client } from './common/interfaces/client';
import type { OpenApi } from './common/interfaces/OpenApi';
import type { ParserConfig } from './config';
import { setParserConfig } from './config';
import { parse as parseV2 } from './v2';
import { parse as parseV3 } from './v3';

export type {
  Client,
  Enum,
  Method,
  Model,
  ModelMeta,
  Operation,
  OperationParameter,
  OperationResponse,
} from './common/interfaces/client';
export type { OpenApi } from './common/interfaces/OpenApi';
export { isOperationParameterRequired } from './common/parser/operation';
export {
  ensureValidTypeScriptJavaScriptIdentifier,
  sanitizeNamespaceIdentifier,
  sanitizeOperationParameterName,
} from './common/parser/sanitize';
export { getType } from './common/parser/type';
export type { OpenApiSchema as OpenApiV2Schema } from './v2/interfaces/OpenApiSchema';
export type { OpenApiSchema as OpenApiV3Schema } from './v3/interfaces/OpenApiSchema';

/**
 * Parse the OpenAPI specification to a Client model that contains
 * all the models, services and schema's we should output.
 * @param openApi The OpenAPI spec that we have loaded from disk.
 */
export function parseLegacy({
  openApi,
  parserConfig,
}: {
  openApi: unknown;
  parserConfig: ParserConfig;
}): Client {
  const spec = openApi as OpenApi;

  setParserConfig(parserConfig);

  if ('openapi' in spec) {
    return parseV3(spec);
  }

  if ('swagger' in spec) {
    return parseV2(spec);
  }

  throw new Error(
    `Unsupported OpenAPI specification: ${JSON.stringify(spec, null, 2)}`,
  );
}

// TODO: parser - add JSDoc comment
export const parseExperimental = ({
  config,
  parserConfig,
  spec,
}: {
  config: Config;
  parserConfig: ParserConfig;
  spec: unknown;
}): IRContext | undefined => {
  const context = new IRContext({
    config,
    parserConfig,
    spec: spec as Record<string, any>,
  });

  // TODO: parser - handle Swagger 2.0

  const ctx = context as IRContext<OpenApiV3_0_X | OpenApiV3_1_X>;
  switch (ctx.spec.openapi) {
    case '3.0.0':
    case '3.0.1':
    case '3.0.2':
    case '3.0.3':
    case '3.0.4':
      parseV3_0_X(context as IRContext<OpenApiV3_0_X>);
      return context;
    case '3.1.0':
    case '3.1.1':
      parseV3_1_X(context as IRContext<OpenApiV3_1_X>);
      return context;
    default:
      // TODO: parser - uncomment after removing legacy parser.
      // For now, we fall back to legacy parser if spec version
      // is not supported
      // throw new Error('Unsupported OpenAPI specification');
      return;
  }
};
