// from https://github.com/manifoldco/swagger-to-ts/edit/master/src/types/OpenAPI3.ts

/**
 * OpenAPI3 types
 * These aren’t exhaustive or complete by any means; they simply provide only
 * the parts that swagger-to-ts needs to know about.
 */

export interface OpenAPI3 {
  openapi: string
  components: {
    schemas: { [key: string]: OpenAPI3SchemaObject | OpenAPI3Reference }
    responses?: { [key: string]: OpenAPI3SchemaObject | OpenAPI3Reference }
  }
  paths: { [path: string]: PathItem }
  [key: string]: any // handle other properties beyond swagger-to-ts’ concern
}

export type OpenAPI3Type =
  | 'array'
  | 'boolean'
  | 'integer'
  | 'number'
  | 'object'
  | 'string'

export type JSONReference = { $ref: string }

export type InlineOpenAPI3SchemaObject =
  | { anyOf: (OpenAPI3SchemaObject | OpenAPI3Reference)[] }
  | { oneOf: (OpenAPI3SchemaObject | OpenAPI3Reference)[] }

export type OpenAPI3Reference = JSONReference | InlineOpenAPI3SchemaObject

export interface OpenAPI3SchemaObject {
  additionalProperties?: OpenAPI3SchemaObject | OpenAPI3Reference | boolean
  allOf?: (OpenAPI3SchemaObject | OpenAPI3Reference)[]
  description?: string
  enum?: string[]
  items?: OpenAPI3SchemaObject | OpenAPI3Reference
  nullable?: boolean
  oneOf?: (OpenAPI3SchemaObject | OpenAPI3Reference)[]
  properties?: { [key: string]: OpenAPI3SchemaObject | OpenAPI3Reference }
  required?: string[]
  title?: string
  type?: OpenAPI3Type // allow this to be optional to cover cases when this is missing
  [key: string]: any // allow arbitrary x-something properties
}

/* extends from https://github.com/OAI/OpenAPI-Specification */

export interface ResponseObject {
  description: string
  // headers?:
  content?: { [key: string]: MediaTypeObject }
  // links
}

export interface MediaTypeObject {
  schema: OpenAPI3SchemaObject | JSONReference
}

export interface RequestBodyObject {
  description?: string
  content: { [key: string]: MediaTypeObject }
  required: boolean
}

export type ParameterPlaceIn = 'query' | 'header' | 'path' | 'cookie'

export interface ParameterObject {
  name: string
  in: string | ParameterPlaceIn
  description?: string
  required: boolean
  schema: OpenAPI3SchemaObject | JSONReference
  deprecated?: boolean
  allowEmptyValue?: boolean
}

export interface Operation {
  tags: string[]
  summary: string
  description: string
  // externalDocs
  operationId: string
  parameters: (ParameterObject | JSONReference)[]
  requestBody: RequestBodyObject | JSONReference
  responses: { [httpStatus: string]: ResponseObject | JSONReference }
}

export interface PathItem {
  description?: string
  get?: Operation
  put?: Operation
  post?: Operation
  delete?: Operation
  options?: Operation
  head?: Operation
  patch?: Operation
  trace?: Operation
}

export type HttpMethod = keyof Omit<PathItem, 'description'>
