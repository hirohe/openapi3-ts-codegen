import { JSONReference, OpenAPI3Type, ParameterObject } from './types/OpenAPI3'

export function isJSONReference(data: any): data is JSONReference {
  return data && typeof data.$ref === 'string'
}

export function isParameterObject(data: any): data is ParameterObject {
  return data && typeof data.name === 'string' && typeof data.in === 'string'
}

export function isBasicTypeSchemaObject(data: any): boolean {
  return data && !['object', 'array'].includes(data.type)
}

export function isJSONContentType(text: string) {
  return /application\/.*json/.test(text)
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar
export const ReservedKeywords: string[] = [
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
]

/**
 * just append '_' to string, if str is js keyword
 * @param str
 */
export function escapeKeywords(str: string) {
  if (ReservedKeywords.some((k) => k === str)) {
    return '_' + str
  }
  return str
}

/**
 * map OpenAPI3 Type to TypeScript basic type
 */
const OpenAPI3TypeInterfaceTypeMap: { [key: string]: string } = {
  array: 'any[]',
  boolean: 'boolean',
  integer: 'number',
  number: 'number',
  object: 'any',
  string: 'string',
}

export function openAPI3TypeToTypeName(type?: OpenAPI3Type) {
  return type ? OpenAPI3TypeInterfaceTypeMap[type] : 'any'
}

/**
 * try to remove some invalid character
 */
export function normalizeSchemaName(name: string) {
  if (name) {
    return name.replace(/[._]/g, '')
  }
  return name
}

/**
 * convert $ref of {@link JSONReference} to string array
 * e.g. '#/components/schemas/Pet' => ['components', 'schemas', 'Pet']
 * @param ref, $ref of {@link JSONReference}
 */
export function parseRefText(ref: string): string[] {
  if (ref) {
    return ref.replace('#', '').split('/')
  }
  return []
}
