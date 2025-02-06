// This file is auto-generated by @hey-api/openapi-ts

/**
 * Testing multiline comments in string: First line
 * Second line
 *
 * Fourth line
 */
export type CommentWithBreaks = number;

/**
 * Testing backticks in string: `backticks` and ```multiple backticks``` should work
 */
export type CommentWithBackticks = number;

/**
 * Testing backticks and quotes in string: `backticks`, 'quotes', "double quotes" and ```multiple backticks``` should work
 */
export type CommentWithBackticksAndQuotes = number;

/**
 * Testing slashes in string: \backwards\\\ and /forwards/// should work
 */
export type CommentWithSlashes = number;

/**
 * Testing expression placeholders in string: ${expression} should work
 */
export type CommentWithExpressionPlaceholders = number;

/**
 * Testing quotes in string: 'single quote''' and "double quotes""" should work
 */
export type CommentWithQuotes = number;

/**
 * Testing reserved characters in string: * inline * and ** inline ** should work
 */
export type CommentWithReservedCharacters = number;

/**
 * This is a simple number
 */
export type SimpleInteger = number;

/**
 * This is a simple boolean
 */
export type SimpleBoolean = boolean;

/**
 * This is a simple string
 */
export type SimpleString = string;

/**
 * A string with non-ascii (unicode) characters valid in typescript identifiers (æøåÆØÅöÔèÈ字符串)
 */
export type NonAsciiStringæøåÆøÅöôêÊ字符串 = string;

/**
 * This is a simple file
 */
export type SimpleFile = Blob | File;

export type SimpleReference = ModelWithString;

/**
 * This is a simple string
 */
export type SimpleStringWithPattern = string;

/**
 * This is a simple enum with strings
 */
export type EnumWithStrings = 'Success' | 'Warning' | 'Error' | "'Single Quote'" | '"Double Quotes"' | 'Non-ascii: øæåôöØÆÅÔÖ字符串';

/**
 * This is a simple enum with numbers
 */
export type EnumWithNumbers = 1 | 2 | 3 | 1.1 | 1.2 | 1.3 | 100 | 200 | 300 | -100 | -200 | -300 | -1.1 | -1.2 | -1.3;

/**
 * Success=1,Warning=2,Error=3
 */
export type EnumFromDescription = number;

/**
 * This is a simple enum with numbers
 */
export type EnumWithExtensions = 200 | 400 | 500;

/**
 * This is a simple array with numbers
 */
export type ArrayWithNumbers = Array<number>;

/**
 * This is a simple array with booleans
 */
export type ArrayWithBooleans = Array<boolean>;

/**
 * This is a simple array with strings
 */
export type ArrayWithStrings = Array<string>;

/**
 * This is a simple array with references
 */
export type ArrayWithReferences = Array<ModelWithString>;

/**
 * This is a simple array containing an array
 */
export type ArrayWithArray = Array<Array<ModelWithString>>;

/**
 * This is a simple array with properties
 */
export type ArrayWithProperties = Array<{
    foo?: string;
    bar?: string;
}>;

/**
 * This is a string dictionary
 */
export type DictionaryWithString = {
    [key: string]: string;
};

/**
 * This is a string reference
 */
export type DictionaryWithReference = {
    [key: string]: ModelWithString;
};

/**
 * This is a complex dictionary
 */
export type DictionaryWithArray = {
    [key: string]: Array<ModelWithString>;
};

/**
 * This is a string dictionary
 */
export type DictionaryWithDictionary = {
    [key: string]: {
        [key: string]: string;
    };
};

/**
 * This is a complex dictionary
 */
export type DictionaryWithProperties = {
    [key: string]: {
        foo?: string;
        bar?: string;
    };
};

/**
 * This is a type-only model that defines Date as a string
 */
export type _Date = string;

/**
 * This is a model with one number property
 */
export type ModelWithInteger = {
    /**
     * This is a simple number property
     */
    prop?: number;
};

/**
 * This is a model with one boolean property
 */
export type ModelWithBoolean = {
    /**
     * This is a simple boolean property
     */
    prop?: boolean;
};

/**
 * This is a model with one string property
 */
export type ModelWithString = {
    /**
     * This is a simple string property
     */
    prop?: string;
};

/**
 * This is a model with one string property
 */
export type ModelWithStringError = {
    /**
     * This is a simple string property
     */
    prop?: string;
};

/**
 * This is a model with one string property
 */
export type ModelWithNullableString = {
    /**
     * This is a simple string property
     */
    nullableProp?: string | null;
    /**
     * This is a simple string property
     */
    nullableRequiredProp: string | null;
};

/**
 * This is a model with one enum
 */
export type ModelWithEnum = {
    /**
     * This is a simple enum with strings
     */
    test?: 'Success' | 'Warning' | 'Error' | 'ØÆÅ字符串';
    /**
     * These are the HTTP error code enums
     */
    statusCode?: '100' | '200 FOO' | '300 FOO_BAR' | '400 foo-bar' | '500 foo.bar' | '600 foo&bar';
    /**
     * Simple boolean enum
     */
    bool?: true;
};

/**
 * This is a model with one enum
 */
export type ModelWithEnumFromDescription = {
    /**
     * Success=1,Warning=2,Error=3
     */
    test?: number;
};

/**
 * This is a model with nested enums
 */
export type ModelWithNestedEnums = {
    dictionaryWithEnum?: {
        [key: string]: 'Success' | 'Warning' | 'Error';
    };
    dictionaryWithEnumFromDescription?: {
        [key: string]: number;
    };
    arrayWithEnum?: Array<'Success' | 'Warning' | 'Error'>;
    arrayWithDescription?: Array<number>;
};

/**
 * This is a model with one property containing a reference
 */
export type ModelWithReference = {
    prop?: ModelWithProperties;
};

/**
 * This is a model with one property containing an array
 */
export type ModelWithArray = {
    prop?: Array<ModelWithString>;
    propWithFile?: Array<Blob | File>;
    propWithNumber?: Array<number>;
};

/**
 * This is a model with one property containing a dictionary
 */
export type ModelWithDictionary = {
    prop?: {
        [key: string]: string;
    };
};

/**
 * This is a model with one property containing a circular reference
 */
export type ModelWithCircularReference = {
    prop?: ModelWithCircularReference;
};

/**
 * This is a model with one nested property
 */
export type ModelWithProperties = {
    required: string;
    readonly requiredAndReadOnly: string;
    string?: string;
    number?: number;
    boolean?: boolean;
    reference?: ModelWithString;
    'property with space'?: string;
    default?: string;
    try?: string;
    readonly '@namespace.string'?: string;
    readonly '@namespace.integer'?: number;
};

/**
 * This is a model with one nested property
 */
export type ModelWithNestedProperties = {
    readonly first: {
        readonly second: {
            readonly third: string;
        };
    };
};

/**
 * This is a model with duplicated properties
 */
export type ModelWithDuplicateProperties = {
    prop?: ModelWithString;
};

/**
 * This is a model with ordered properties
 */
export type ModelWithOrderedProperties = {
    zebra?: string;
    apple?: string;
    hawaii?: string;
};

/**
 * This is a model with duplicated imports
 */
export type ModelWithDuplicateImports = {
    propA?: ModelWithString;
    propB?: ModelWithString;
    propC?: ModelWithString;
};

/**
 * This is a model that extends another model
 */
export type ModelThatExtends = ModelWithString & {
    propExtendsA?: string;
    propExtendsB?: ModelWithString;
};

/**
 * This is a model that extends another model
 */
export type ModelThatExtendsExtends = ModelWithString & ModelThatExtends & {
    propExtendsC?: string;
    propExtendsD?: ModelWithString;
};

export type Default = {
    name?: string;
};

/**
 * This is a model that contains a some patterns
 */
export type ModelWithPattern = {
    key: string;
    name: string;
    readonly enabled?: boolean;
    readonly modified?: string;
    id?: string;
    text?: string;
    patternWithSingleQuotes?: string;
    patternWithNewline?: string;
    patternWithBacktick?: string;
};

export type ParameterActivityParams = {
    description?: string;
    graduate_id?: number;
    organization_id?: number;
    parent_activity?: number;
    post_id?: number;
};

export type ResponsePostActivityResponse = {
    description?: string;
    graduate_id?: number;
    organization_id?: number;
    parent_activity_id?: number;
    post_id?: number;
};

export type FailureFailure = {
    error?: string;
    message?: string;
    reference_code?: string;
};

export type ServiceWithEmptyTagData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/no-tag';
};

export type DeleteCallWithoutParametersAndResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/simple';
};

export type GetCallWithoutParametersAndResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/simple';
};

export type HeadCallWithoutParametersAndResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/simple';
};

export type OptionsCallWithoutParametersAndResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/simple';
};

export type PatchCallWithoutParametersAndResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/simple';
};

export type PostCallWithoutParametersAndResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/simple';
};

export type PutCallWithoutParametersAndResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/simple';
};

export type CallWithDescriptionsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Testing multiline comments in string: First line
         * Second line
         *
         * Fourth line
         */
        parameterWithBreaks?: string;
        /**
         * Testing backticks in string: `backticks` and ```multiple backticks``` should work
         */
        parameterWithBackticks?: string;
        /**
         * Testing slashes in string: \backwards\\\ and /forwards/// should work
         */
        parameterWithSlashes?: string;
        /**
         * Testing expression placeholders in string: ${expression} should work
         */
        parameterWithExpressionPlaceholders?: string;
        /**
         * Testing quotes in string: 'single quote''' and "double quotes""" should work
         */
        parameterWithQuotes?: string;
        /**
         * Testing reserved characters in string: * inline * and ** inline ** should work
         */
        parameterWithReservedCharacters?: string;
    };
    url: '/api/v{api-version}/descriptions/';
};

export type CallWithParametersData = {
    body?: never;
    headers: {
        /**
         * This is the parameter that goes into the header
         */
        parameterHeader: string;
    };
    path: {
        /**
         * This is the parameter that goes into the path
         */
        parameterPath: string;
        /**
         * api-version should be required in standalone clients
         */
        'api-version': string;
    };
    query: {
        /**
         * This is the parameter that goes into the query params
         */
        parameterQuery: string;
    };
    url: '/api/v{api-version}/parameters/{parameterPath}';
};

export type CallWithWeirdParameterNamesData = {
    body?: never;
    headers: {
        /**
         * This is the parameter that goes into the request header
         */
        'parameter.header': string;
    };
    path: {
        /**
         * This is the parameter that goes into the path
         */
        'parameter.path.1'?: string;
        /**
         * This is the parameter that goes into the path
         */
        'parameter-path-2'?: string;
        /**
         * This is the parameter that goes into the path
         */
        'PARAMETER-PATH-3'?: string;
        /**
         * api-version should be required in standalone clients
         */
        'api-version': string;
    };
    query: {
        /**
         * This is the parameter with a reserved keyword
         */
        default?: string;
        /**
         * This is the parameter that goes into the request query params
         */
        'parameter-query': string;
    };
    url: '/api/v{api-version}/parameters/{parameter.path.1}/{parameter-path-2}/{PARAMETER-PATH-3}';
};

export type CallWithDefaultParametersData = {
    body?: never;
    path?: never;
    query: {
        /**
         * This is a simple string with default value
         */
        parameterString: string;
        /**
         * This is a simple number with default value
         */
        parameterNumber: number;
        /**
         * This is a simple boolean with default value
         */
        parameterBoolean: boolean;
        /**
         * This is a simple enum with default value
         */
        parameterEnum: 'Success' | 'Warning' | 'Error';
    };
    url: '/api/v{api-version}/defaults';
};

export type CallWithDefaultOptionalParametersData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * This is a simple string that is optional with default value
         */
        parameterString?: string;
        /**
         * This is a simple number that is optional with default value
         */
        parameterNumber?: number;
        /**
         * This is a simple boolean that is optional with default value
         */
        parameterBoolean?: boolean;
        /**
         * This is a simple enum that is optional with default value
         */
        parameterEnum?: 'Success' | 'Warning' | 'Error';
    };
    url: '/api/v{api-version}/defaults';
};

export type CallToTestOrderOfParamsData = {
    body?: never;
    path?: never;
    query: {
        /**
         * This is a optional string with default
         */
        parameterOptionalStringWithDefault?: string;
        /**
         * This is a optional string with empty default
         */
        parameterOptionalStringWithEmptyDefault?: string;
        /**
         * This is a optional string with no default
         */
        parameterOptionalStringWithNoDefault?: string;
        /**
         * This is a string with default
         */
        parameterStringWithDefault: string;
        /**
         * This is a string with empty default
         */
        parameterStringWithEmptyDefault: string;
        /**
         * This is a string with no default
         */
        parameterStringWithNoDefault: string;
        /**
         * This is a string that can be null with no default
         */
        parameterStringNullableWithNoDefault?: string | null;
        /**
         * This is a string that can be null with default
         */
        parameterStringNullableWithDefault?: string | null;
    };
    url: '/api/v{api-version}/defaults';
};

export type DuplicateNameData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/duplicate';
};

export type DuplicateName2Data = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/duplicate';
};

export type DuplicateName3Data = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/duplicate';
};

export type DuplicateName4Data = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/duplicate';
};

export type CallWithNoContentResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/no-content';
};

export type CallWithNoContentResponseResponses = {
    /**
     * Success
     */
    204: unknown;
};

export type CallWithResponseAndNoContentResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/multiple-tags/response-and-no-content';
};

export type CallWithResponseAndNoContentResponseResponses = {
    /**
     * Response is a simple number
     */
    200: number;
    /**
     * Success
     */
    204: unknown;
};

export type CallWithResponseAndNoContentResponseResponse = CallWithResponseAndNoContentResponseResponses[keyof CallWithResponseAndNoContentResponseResponses];

export type DummyAData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/multiple-tags/a';
};

export type DummyAResponses = {
    /**
     * Success
     */
    204: unknown;
};

export type DummyBData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/multiple-tags/b';
};

export type DummyBResponses = {
    /**
     * Success
     */
    204: unknown;
};

export type CallWithResponseData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/response';
};

export type CallWithResponseResponses = {
    /**
     * Message for default response
     */
    default: ModelWithString;
};

export type CallWithResponseResponse = CallWithResponseResponses[keyof CallWithResponseResponses];

export type CallWithDuplicateResponsesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/response';
};

export type CallWithDuplicateResponsesErrors = {
    /**
     * Message for 500 error
     */
    500: ModelWithStringError;
    /**
     * Message for 501 error
     */
    501: ModelWithStringError;
    /**
     * Message for 502 error
     */
    502: ModelWithStringError;
    /**
     * Message for default response
     */
    default: ModelWithString;
};

export type CallWithDuplicateResponsesError = CallWithDuplicateResponsesErrors[keyof CallWithDuplicateResponsesErrors];

export type CallWithDuplicateResponsesResponses = {
    /**
     * Message for 201 response
     */
    201: ModelWithString;
    /**
     * Message for 202 response
     */
    202: ModelWithString;
};

export type CallWithDuplicateResponsesResponse = CallWithDuplicateResponsesResponses[keyof CallWithDuplicateResponsesResponses];

export type CallWithResponsesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/response';
};

export type CallWithResponsesErrors = {
    /**
     * Message for 500 error
     */
    500: ModelWithStringError;
    /**
     * Message for 501 error
     */
    501: ModelWithStringError;
    /**
     * Message for 502 error
     */
    502: ModelWithStringError;
    /**
     * Message for default response
     */
    default: ModelWithString;
};

export type CallWithResponsesError = CallWithResponsesErrors[keyof CallWithResponsesErrors];

export type CallWithResponsesResponses = {
    /**
     * Message for 200 response
     */
    200: {
        readonly '@namespace.string'?: string;
        readonly '@namespace.integer'?: number;
        readonly value?: Array<ModelWithString>;
    };
    /**
     * Message for 201 response
     */
    201: ModelThatExtends;
    /**
     * Message for 202 response
     */
    202: ModelThatExtendsExtends;
};

export type CallWithResponsesResponse = CallWithResponsesResponses[keyof CallWithResponsesResponses];

export type CollectionFormatData = {
    body?: never;
    path?: never;
    query: {
        /**
         * This is an array parameter that is sent as csv format (comma-separated values)
         */
        parameterArrayCSV: Array<string>;
        /**
         * This is an array parameter that is sent as ssv format (space-separated values)
         */
        parameterArraySSV: Array<string>;
        /**
         * This is an array parameter that is sent as tsv format (tab-separated values)
         */
        parameterArrayTSV: Array<string>;
        /**
         * This is an array parameter that is sent as pipes format (pipe-separated values)
         */
        parameterArrayPipes: Array<string>;
        /**
         * This is an array parameter that is sent as multi format (multiple parameter instances)
         */
        parameterArrayMulti: Array<string>;
    };
    url: '/api/v{api-version}/collectionFormat';
};

export type TypesData = {
    body?: never;
    path?: {
        /**
         * This is a number parameter
         */
        id?: number;
    };
    query: {
        /**
         * This is a number parameter
         */
        parameterNumber: number;
        /**
         * This is a string parameter
         */
        parameterString: string;
        /**
         * This is a boolean parameter
         */
        parameterBoolean: boolean;
        /**
         * This is an object parameter
         */
        parameterObject: {
            [key: string]: unknown;
        };
        /**
         * This is an array parameter
         */
        parameterArray: Array<string>;
        /**
         * This is a dictionary parameter
         */
        parameterDictionary: {
            [key: string]: unknown;
        };
        /**
         * This is an enum parameter
         */
        parameterEnum: 'Success' | 'Warning' | 'Error';
    };
    url: '/api/v{api-version}/types';
};

export type TypesResponses = {
    /**
     * Response is a simple number
     */
    200: number;
    /**
     * Response is a simple string
     */
    201: string;
    /**
     * Response is a simple boolean
     */
    202: boolean;
    /**
     * Response is a simple object
     */
    203: {
        [key: string]: unknown;
    };
};

export type TypesResponse = TypesResponses[keyof TypesResponses];

export type ComplexTypesData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Parameter containing object
         */
        parameterObject: {
            first?: {
                second?: {
                    third?: string;
                };
            };
        };
    };
    url: '/api/v{api-version}/complex';
};

export type ComplexTypesErrors = {
    /**
     * 400 server error
     */
    400: unknown;
    /**
     * 500 server error
     */
    500: unknown;
};

export type ComplexTypesResponses = {
    /**
     * Successful response
     */
    200: Array<ModelWithString>;
};

export type ComplexTypesResponse = ComplexTypesResponses[keyof ComplexTypesResponses];

export type CallWithResultFromHeaderData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/header';
};

export type CallWithResultFromHeaderErrors = {
    /**
     * 400 server error
     */
    400: unknown;
    /**
     * 500 server error
     */
    500: unknown;
};

export type CallWithResultFromHeaderResponses = {
    /**
     * Successful response
     */
    200: unknown;
};

export type TestErrorCodeData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Status code to return
         */
        status: string;
    };
    url: '/api/v{api-version}/error';
};

export type TestErrorCodeErrors = {
    /**
     * Custom message: Internal Server Error
     */
    500: unknown;
    /**
     * Custom message: Not Implemented
     */
    501: unknown;
    /**
     * Custom message: Bad Gateway
     */
    502: unknown;
    /**
     * Custom message: Service Unavailable
     */
    503: unknown;
};

export type TestErrorCodeResponses = {
    /**
     * Custom message: Successful response
     */
    200: unknown;
};

export type NonAsciiæøåÆøÅöôêÊ字符串Data = {
    body?: never;
    path?: never;
    query: {
        /**
         * Dummy input param
         */
        nonAsciiParamæøåÆØÅöôêÊ: number;
    };
    url: '/api/v{api-version}/non-ascii-æøåÆØÅöôêÊ字符串';
};

export type NonAsciiæøåÆøÅöôêÊ字符串Responses = {
    /**
     * Successful response
     */
    200: NonAsciiStringæøåÆøÅöôêÊ字符串;
};

export type NonAsciiæøåÆøÅöôêÊ字符串Response = NonAsciiæøåÆøÅöôêÊ字符串Responses[keyof NonAsciiæøåÆøÅöôêÊ字符串Responses];

export type PostApiVbyApiVersionBodyData = {
    /**
     * Body should not be unknown
     */
    body: ParameterActivityParams;
    path?: never;
    query?: never;
    url: '/api/v{api-version}/body';
};

export type PostApiVbyApiVersionBodyErrors = {
    /**
     * Bad Request
     */
    400: FailureFailure;
    /**
     * Internal Server Error
     */
    500: FailureFailure;
};

export type PostApiVbyApiVersionBodyError = PostApiVbyApiVersionBodyErrors[keyof PostApiVbyApiVersionBodyErrors];

export type PostApiVbyApiVersionBodyResponses = {
    /**
     * OK
     */
    200: ResponsePostActivityResponse;
};

export type PostApiVbyApiVersionBodyResponse = PostApiVbyApiVersionBodyResponses[keyof PostApiVbyApiVersionBodyResponses];

export type ClientOptions = {
    baseURL: 'http://localhost:3000/base' | (string & {});
};