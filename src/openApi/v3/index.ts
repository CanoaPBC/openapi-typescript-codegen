import type { Client } from '../../types/client';
import type { Config } from '../../types/config';
import { getServiceVersion } from '../common/parser/service';
import type { OpenApi } from './interfaces/OpenApi';
import { getModels } from './parser/getModels';
import { getServer } from './parser/getServer';
import { getServices } from './parser/getServices';

/**
 * Parse the OpenAPI specification to a Client model that contains
 * all the models, services and schema's we should output.
 * @param openApi The OpenAPI spec that we have loaded from disk.
 * @param options {@link Config} passed to the `createClient()` method
 */
export const parse = (openApi: OpenApi, options: Config): Client => {
    const version = getServiceVersion(openApi.info.version);
    const server = getServer(openApi);
    const models = getModels(openApi);
    const services = getServices(openApi, options);

    return {
        enumNames: [],
        models,
        server,
        services,
        version,
    };
};
