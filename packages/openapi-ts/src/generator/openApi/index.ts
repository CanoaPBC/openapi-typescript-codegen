import type { Client } from './common/interfaces/client';
import type { Config } from './common/interfaces/config';
import type { OpenApi } from './common/interfaces/OpenApi';
import { parse as parseV2 } from './v2/index';
import { parse as parseV3 } from './v3/index';

export * from './common/interfaces/client';
export { OpenApi } from './common/interfaces/OpenApi';

/**
 * Parse the OpenAPI specification to a Client model that contains
 * all the models, services and schema's we should output.
 * @param openApi The OpenAPI spec that we have loaded from disk.
 */
export function parse({
  openApi,
  config,
}: {
  config: Config;
  openApi: OpenApi;
}): Client {
  if ('openapi' in openApi) {
    return parseV3({ config, openApi });
  }

  if ('swagger' in openApi) {
    return parseV2({ config, openApi });
  }

  throw new Error(
    `Unsupported Open API specification: ${JSON.stringify(openApi, null, 2)}`,
  );
}
