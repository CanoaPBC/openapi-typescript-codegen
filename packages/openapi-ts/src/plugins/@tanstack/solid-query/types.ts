import type { PluginDefinition } from '../../types';

export interface PluginConfig extends PluginDefinition {
  /**
   * Generate `createInfiniteQuery()` helpers? These will be generated from GET and POST requests where a pagination parameter is detected.
   * @default true
   */
  infiniteQueryOptions?: boolean;
  /**
   * Generate `createMutation()` helpers? These will be generated from DELETE, PATCH, POST, and PUT requests.
   * @default true
   */
  mutationOptions?: boolean;
  /**
   * Generate TanStack Solid Query output from the provided input.
   */
  name: '@tanstack/solid-query';
  /**
   * Name of the generated file.
   * @default '@tanstack/solid-query'
   */
  output?: string;
  /**
   * Generate {@link https://tanstack.com/query/v5/docs/framework/solid/reference/createQuery `createQuery()`} helpers?
   * These will be generated from all requests.
   * @default true
   */
  queryOptions?: boolean;
}

export interface UserConfig
  extends Pick<
    PluginConfig,
    'infiniteQueryOptions' | 'mutationOptions' | 'output' | 'queryOptions'
  > {}
