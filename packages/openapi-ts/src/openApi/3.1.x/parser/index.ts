import type { IRContext } from '../../../ir/context';
import { canProcessRef } from '../../shared/utils/filter';
import type {
  OpenApiV3_1_X,
  ParameterObject,
  PathItemObject,
  PathsObject,
} from '../types/spec';
import { parseOperation } from './operation';
import {
  mergeParametersObjects,
  parametersArrayToObject,
  parseParameter,
} from './parameter';
import { parseSchema } from './schema';

export const parseV3_1_X = (context: IRContext<OpenApiV3_1_X>) => {
  const operationIds = new Map<string, string>();

  const regexp = context.config.input.include
    ? new RegExp(context.config.input.include)
    : undefined;

  for (const path in context.spec.paths) {
    const pathItem = context.spec.paths[path as keyof PathsObject];

    const finalPathItem = pathItem.$ref
      ? {
          ...context.resolveRef<PathItemObject>(pathItem.$ref),
          ...pathItem,
        }
      : pathItem;

    const operationArgs: Omit<Parameters<typeof parseOperation>[0], 'method'> =
      {
        context,
        operation: {
          description: finalPathItem.description,
          id: '',
          parameters: parametersArrayToObject({
            context,
            parameters: finalPathItem.parameters,
          }),
          servers: finalPathItem.servers,
          summary: finalPathItem.summary,
        },
        operationIds,
        path: path as keyof PathsObject,
      };

    const $refDelete = `#/paths${path}/delete`;
    if (finalPathItem.delete && canProcessRef($refDelete, regexp)) {
      parseOperation({
        ...operationArgs,
        method: 'delete',
        operation: {
          ...operationArgs.operation,
          ...finalPathItem.delete,
          parameters: mergeParametersObjects({
            source: parametersArrayToObject({
              context,
              parameters: finalPathItem.delete.parameters,
            }),
            target: operationArgs.operation.parameters,
          }),
        },
      });
    }

    const $refGet = `#/paths${path}/get`;
    if (finalPathItem.get && canProcessRef($refGet, regexp)) {
      parseOperation({
        ...operationArgs,
        method: 'get',
        operation: {
          ...operationArgs.operation,
          ...finalPathItem.get,
          parameters: mergeParametersObjects({
            source: parametersArrayToObject({
              context,
              parameters: finalPathItem.get.parameters,
            }),
            target: operationArgs.operation.parameters,
          }),
        },
      });
    }

    const $refHead = `#/paths${path}/head`;
    if (finalPathItem.head && canProcessRef($refHead, regexp)) {
      parseOperation({
        ...operationArgs,
        method: 'head',
        operation: {
          ...operationArgs.operation,
          ...finalPathItem.head,
          parameters: mergeParametersObjects({
            source: parametersArrayToObject({
              context,
              parameters: finalPathItem.head.parameters,
            }),
            target: operationArgs.operation.parameters,
          }),
        },
      });
    }

    const $refOptions = `#/paths${path}/options`;
    if (finalPathItem.options && canProcessRef($refOptions, regexp)) {
      parseOperation({
        ...operationArgs,
        method: 'options',
        operation: {
          ...operationArgs.operation,
          ...finalPathItem.options,
          parameters: mergeParametersObjects({
            source: parametersArrayToObject({
              context,
              parameters: finalPathItem.options.parameters,
            }),
            target: operationArgs.operation.parameters,
          }),
        },
      });
    }

    const $refPatch = `#/paths${path}/patch`;
    if (finalPathItem.patch && canProcessRef($refPatch, regexp)) {
      parseOperation({
        ...operationArgs,
        method: 'patch',
        operation: {
          ...operationArgs.operation,
          ...finalPathItem.patch,
          parameters: mergeParametersObjects({
            source: parametersArrayToObject({
              context,
              parameters: finalPathItem.patch.parameters,
            }),
            target: operationArgs.operation.parameters,
          }),
        },
      });
    }

    const $refPost = `#/paths${path}/post`;
    if (finalPathItem.post && canProcessRef($refPost, regexp)) {
      parseOperation({
        ...operationArgs,
        method: 'post',
        operation: {
          ...operationArgs.operation,
          ...finalPathItem.post,
          parameters: mergeParametersObjects({
            source: parametersArrayToObject({
              context,
              parameters: finalPathItem.post.parameters,
            }),
            target: operationArgs.operation.parameters,
          }),
        },
      });
    }

    const $refPut = `#/paths${path}/put`;
    if (finalPathItem.put && canProcessRef($refPut, regexp)) {
      parseOperation({
        ...operationArgs,
        method: 'put',
        operation: {
          ...operationArgs.operation,
          ...finalPathItem.put,
          parameters: mergeParametersObjects({
            source: parametersArrayToObject({
              context,
              parameters: finalPathItem.put.parameters,
            }),
            target: operationArgs.operation.parameters,
          }),
        },
      });
    }

    const $refTrace = `#/paths${path}/trace`;
    if (finalPathItem.trace && canProcessRef($refTrace, regexp)) {
      parseOperation({
        ...operationArgs,
        method: 'trace',
        operation: {
          ...operationArgs.operation,
          ...finalPathItem.trace,
          parameters: mergeParametersObjects({
            source: parametersArrayToObject({
              context,
              parameters: finalPathItem.trace.parameters,
            }),
            target: operationArgs.operation.parameters,
          }),
        },
      });
    }
  }

  // TODO: parser - handle more component types, old parser handles only parameters and schemas
  if (context.spec.components) {
    for (const name in context.spec.components.parameters) {
      const $ref = `#/components/parameters/${name}`;
      if (!canProcessRef($ref, regexp)) {
        continue;
      }

      const parameterOrReference = context.spec.components.parameters[name];
      const parameter =
        '$ref' in parameterOrReference
          ? context.resolveRef<ParameterObject>(parameterOrReference.$ref)
          : parameterOrReference;

      parseParameter({
        context,
        name,
        parameter,
      });
    }

    for (const name in context.spec.components.schemas) {
      const $ref = `#/components/schemas/${name}`;
      if (!canProcessRef($ref, regexp)) {
        continue;
      }

      const schema = context.spec.components.schemas[name];

      parseSchema({
        $ref,
        context,
        schema,
      });
    }
  }
};
