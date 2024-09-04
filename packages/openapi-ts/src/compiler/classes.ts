import ts from 'typescript';

import { createCallExpression } from './module';
import {
  type AccessLevel,
  createTypeNode,
  type FunctionParameter,
  type FunctionTypeParameter,
  toAccessLevelModifiers,
  toExpression,
  toParameterDeclarations,
  toTypeParameters,
} from './types';
import {
  addLeadingComments,
  Comments,
  createIdentifier,
  isType,
} from './utils';

/**
 * Create a class constructor declaration.
 * @param accessLevel - the access level of the constructor.
 * @param comment - comment to add to function.
 * @param multiLine - if it should be multi line.
 * @param parameters - parameters for the constructor.
 * @param statements - statements to put in the contructor body.
 * @returns ts.ConstructorDeclaration
 */
export const createConstructorDeclaration = ({
  accessLevel,
  comment,
  multiLine = true,
  parameters = [],
  statements = [],
}: {
  accessLevel?: AccessLevel;
  comment?: Comments;
  multiLine?: boolean;
  parameters?: FunctionParameter[];
  statements?: ts.Statement[];
}) => {
  const node = ts.factory.createConstructorDeclaration(
    toAccessLevelModifiers(accessLevel),
    toParameterDeclarations(parameters),
    ts.factory.createBlock(statements, multiLine),
  );

  addLeadingComments({
    comments: comment,
    node,
  });

  return node;
};

/**
 * Create a class method declaration.
 * @param accessLevel - the access level of the method.
 * @param comment - comment to add to function.
 * @param isStatic - if the function is static.
 * @param multiLine - if it should be multi line.
 * @param name - name of the method.
 * @param parameters - parameters for the method.
 * @param returnType - the return type of the method.
 * @param statements - statements to put in the contructor body.
 * @returns ts.MethodDeclaration
 */
export const createMethodDeclaration = ({
  accessLevel,
  comment,
  isStatic = false,
  multiLine = true,
  name,
  parameters = [],
  returnType,
  statements = [],
  types = [],
}: {
  accessLevel?: AccessLevel;
  comment?: Comments;
  isStatic?: boolean;
  multiLine?: boolean;
  name: string;
  parameters?: FunctionParameter[];
  returnType?: string | ts.TypeNode;
  statements?: ts.Statement[];
  types?: FunctionTypeParameter[];
}) => {
  let modifiers = toAccessLevelModifiers(accessLevel);

  if (isStatic) {
    modifiers = [
      ...modifiers,
      ts.factory.createModifier(ts.SyntaxKind.StaticKeyword),
    ];
  }
  const node = ts.factory.createMethodDeclaration(
    modifiers,
    undefined,
    createIdentifier({ text: name }),
    undefined,
    types ? toTypeParameters(types) : undefined,
    toParameterDeclarations(parameters),
    returnType ? createTypeNode(returnType) : undefined,
    ts.factory.createBlock(statements, multiLine),
  );

  addLeadingComments({
    comments: comment,
    node,
  });

  return node;
};

type ClassDecorator = {
  args: any[];
  name: string;
};

/**
 * Create a class declaration.
 * @param decorator - the class decorator
 * @param members - elements in the class.
 * @param name - name of the class.
 * @returns ts.ClassDeclaration
 */
export const createClassDeclaration = ({
  decorator,
  members = [],
  name,
  spaceBetweenMembers = true,
}: {
  decorator?: ClassDecorator;
  members?: ts.ClassElement[];
  name: string;
  spaceBetweenMembers?: boolean;
}) => {
  let modifiers: ts.ModifierLike[] = [
    ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
  ];

  if (decorator) {
    modifiers = [
      ts.factory.createDecorator(
        createCallExpression({
          functionName: decorator.name,
          parameters: decorator.args
            .map((arg) => toExpression({ value: arg }))
            .filter(isType<ts.Expression>),
        }),
      ),
      ...modifiers,
    ];
  }

  // Add newline between each class member.
  let m: ts.ClassElement[] = [];
  if (spaceBetweenMembers) {
    members.forEach((member) => {
      // @ts-ignore
      m = [...m, member, createIdentifier({ text: '\n' })];
    });
  } else {
    m = members;
  }

  return ts.factory.createClassDeclaration(
    modifiers,
    createIdentifier({ text: name }),
    [],
    [],
    m,
  );
};

/**
 * Create a class property declaration.
 * @param accessLevel - the access level of the constructor.
 * @param comment - comment to add to function.
 * @param isReadonly - if the property is readonly.
 * @param name - name of the property.
 * @param type - the type of the property.
 * @param value - the value of the property.
 * @returns ts.PropertyDeclaration
 */
export const createPropertyDeclaration = ({
  accessLevel,
  comment,
  isReadonly = false,
  name,
  type,
  value,
}: {
  accessLevel?: AccessLevel;
  comment?: Comments;
  isReadonly?: boolean;
  name: string;
  type?: string | ts.TypeNode;
  value?: string | ts.Expression;
}) => {
  let modifiers = toAccessLevelModifiers(accessLevel);

  if (isReadonly) {
    modifiers = [
      ...modifiers,
      ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword),
    ];
  }

  const node = ts.factory.createPropertyDeclaration(
    modifiers,
    createIdentifier({ text: name }),
    undefined,
    type ? createTypeNode(type) : undefined,
    value ? toExpression({ value }) : undefined,
  );

  addLeadingComments({
    comments: comment,
    node,
  });

  return node;
};

/**
 * Create a class new instance expression.
 * @param name - name of the class.
 * @returns ts.NewExpression
 */
export const newExpression = ({
  expression,
  args,
  types,
}: {
  args?: ts.Expression[];
  expression: ts.Expression;
  types?: ts.TypeNode[];
}) => ts.factory.createNewExpression(expression, types, args);
