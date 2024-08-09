import {
  type PluginTanStackAngularQueryExperimental,
  pluginTanStackAngularQueryExperimentalDefaultConfig,
} from './@tanstack/angular-query-experimental/config';
import {
  type PluginTanStackReactQuery,
  pluginTanStackReactQueryDefaultConfig,
} from './@tanstack/react-query/config';
import {
  type PluginTanStackSolidQuery,
  pluginTanStackSolidQueryDefaultConfig,
} from './@tanstack/solid-query/config';
import {
  type PluginTanStackSvelteQuery,
  pluginTanStackSvelteQueryDefaultConfig,
} from './@tanstack/svelte-query/config';
import {
  type PluginTanStackVueQuery,
  pluginTanStackVueQueryDefaultConfig,
} from './@tanstack/vue-query/config';

export type Plugins =
  | PluginTanStackAngularQueryExperimental
  | PluginTanStackReactQuery
  | PluginTanStackSolidQuery
  | PluginTanStackSvelteQuery
  | PluginTanStackVueQuery;

type KeyTypes = string | number | symbol;

type ExtractFromPluginConfig<T> = T extends { name: infer U }
  ? U extends KeyTypes
    ? U
    : never
  : never;

type DefaultPluginConfigsMap<
  T,
  U extends KeyTypes = ExtractFromPluginConfig<T>,
> = {
  [K in U]: Required<Extract<T, { name: K }>>;
};

export const defaultPluginConfigs: DefaultPluginConfigsMap<Plugins> = {
  '@tanstack/angular-query-experimental':
    pluginTanStackAngularQueryExperimentalDefaultConfig,
  '@tanstack/react-query': pluginTanStackReactQueryDefaultConfig,
  '@tanstack/solid-query': pluginTanStackSolidQueryDefaultConfig,
  '@tanstack/svelte-query': pluginTanStackSvelteQueryDefaultConfig,
  '@tanstack/vue-query': pluginTanStackVueQueryDefaultConfig,
};
