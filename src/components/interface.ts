export type TypeAnnotation =
  | InterfaceDeclaration
  | TypeAliasDeclaration
  | EnumDeclaration
  | PropertySignature
  | IndexSignature
  | Union
  | Tuple
  | ArrayType
  | Intersection
  | TypeLiteral
  | IndexedAccess
  | Reference
  | TypeParameterDeclaration
  | TypeParameter
  | Qualified
  | Literal
  | Identifer
  | Keyword
  | StringLiteral;

export interface Base {
  description?: string;
  required?: boolean;
  tags?: string[];
}

export interface PropertySignature extends Base {
  type: "propertySignature";
  name: string;
  property: TypeAnnotation;
}

export interface IndexSignature extends Base {
  type: "indexSignature";
  parameters?: TypeAnnotation & { name: string };
  property: TypeAnnotation;
}

export interface TypeParameters extends Base {
  type: "typeParameterDeclaration";
  params: TypeParameter[];
}

export interface TypeParameter extends Base {
  type: "typeParameter";
  value: string;
  default: TypeAnnotation;
}

export interface Member extends Base {
  name: TypeAnnotation;
  value?: TypeAnnotation;
}

export interface Reference extends Base {
  type: "reference";
  typeName?: string;
  typeParameters?: TypeParameter[];
  qualified?: Qualified;
}

export interface Qualified extends Base {
  type: "qualifiedName";
  left: TypeAnnotation;
  right: TypeAnnotation;
}

export interface Union extends Base {
  type: "union";
  types: TypeAnnotation[];
}

export interface ArrayType extends Base {
  type: "array";
  elementType: TypeAnnotation;
}

export interface Tuple extends Base {
  type: "tuple";
  elementTypes: TypeAnnotation[];
}

export interface Intersection extends Base {
  type: "intersection";
  types: TypeAnnotation[];
}

export interface TypeLiteral extends Base {
  type: "typeLiteral";
  members: TypeAnnotation[];
}

export interface IndexedAccess extends Base {
  type: "indexedAccess";
  objectType: TypeAnnotation;
  indexType: TypeAnnotation;
}

export interface TypeParameterDeclaration extends Base {
  type: "typeParameterDeclaration";
  params: TypeParameter[];
}

export interface Literal extends Base {
  type: "literal";
  value: string | number | boolean | undefined | null;
}

export interface Identifer extends Base {
  type: "identifier";
  value: string;
  name?: string;
}

export interface StringLiteral extends Base {
  type: "stringLiteral";
  value: string;
  name?: string;
}

export interface Keyword extends Base {
  type: "keyword";
  value: string;
  name?: string;
}

export interface InterfaceDeclaration extends Base {
  name: string;
  type: "interface";
  annotation: TypeAnnotation[];
  typeParameters?: TypeParameters;
}

export interface TypeAliasDeclaration extends Base {
  name: string;
  type: "typeAlias";
  annotation: TypeAnnotation | TypeAnnotation[];
  typeParameters?: TypeParameters;
}

export interface EnumDeclaration extends Base {
  name: string;
  type: "enums";
  members: Member[];
}

export type Types =
  | InterfaceDeclaration
  | TypeAliasDeclaration
  | EnumDeclaration;
