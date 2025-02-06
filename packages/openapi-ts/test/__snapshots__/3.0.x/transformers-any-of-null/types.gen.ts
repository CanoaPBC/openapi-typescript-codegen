// This file is auto-generated by @hey-api/openapi-ts

export type Foo = {
    foo?: Date;
    bar?: Date | null;
};

export type GetFooData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/foo';
};

export type GetFooResponses = {
    /**
     * OK
     */
    200: Array<Foo>;
};

export type GetFooResponse = GetFooResponses[keyof GetFooResponses];

export type ClientOptions = {
    baseUrl: `${string}://${string}` | (string & {});
};