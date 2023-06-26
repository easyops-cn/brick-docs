import React from "react";
import { Annotation, Types } from "@next-core/brick-manifest";

let types: Types[] = [];

export function initTypes(params: Types[]) {
  console.log(params);
  types = params;
}

export const GeneralType = (typeAnnotation: Annotation) => {
  if (!typeAnnotation) return;
  const { type, description, required } = typeAnnotation;

  switch (type) {
    case "interface":
      return {
        name: typeAnnotation.name,
        type: type,
        description,
        required,
        body: typeAnnotation.annotation.map(GeneralType),
        typeParameters: GeneralType(typeAnnotation.typeParameters),
      };
    case "typeAlias":
      return {
        name: typeAnnotation.name,
        type,
        annotation: Array.isArray(typeAnnotation.annotation)
          ? typeAnnotation.annotation.map(GeneralType)
          : GeneralType(typeAnnotation.annotation),
        typeParameters: GeneralType(typeAnnotation.typeParameters),
      };
    case "enums":
      return {
        name: typeAnnotation.name,
        member: typeAnnotation.members,
      };
    case "reference":
      return (
        <>
          {typeAnnotation.typeName &&
          types.find((item) => item.name === typeAnnotation.typeName) ? (
            <a href={`#${typeAnnotation.typeName}`}>
              {typeAnnotation.typeName}
            </a>
          ) : typeAnnotation.qualified ? (
            <GeneralType {...typeAnnotation.qualified} />
          ) : (
            <span>{typeAnnotation.typeName}</span>
          )}
          {typeAnnotation.typeParameters &&
          typeAnnotation.typeParameters.length ? (
            <>
              {"<"}
              {typeAnnotation.typeParameters.map((item, index) => (
                <React.Fragment key={index}>
                  <GeneralType {...item} />
                  {index < typeAnnotation.typeParameters.length - 1
                    ? ","
                    : null}
                </React.Fragment>
              ))}
              {">"}
            </>
          ) : null}
        </>
      );
    case "qualifiedName": {
      const getName = (str: unknown) =>
        typeof str === "string" ? str : GeneralType(str as Annotation);

      return (
        <>
          {getName(typeAnnotation.left)}.{getName(typeAnnotation.right)}
        </>
      );
    }
    case "propertySignature":
      return (
        <>
          {typeAnnotation.name}:
          <GeneralType {...typeAnnotation.property} />
          {","}
        </>
      );
    case "indexSignature": {
      return (
        <>
          {typeAnnotation.parameters ? (
            <>
              <GeneralType {...typeAnnotation.parameters} />
              {": "}
            </>
          ) : null}
          <GeneralType {...typeAnnotation.property} />
          {","}
        </>
      );
    }
    case "indexedAccess":
      return (
        <>
          <GeneralType {...typeAnnotation.objectType} />
          [<GeneralType {...typeAnnotation.indexType} />]
        </>
      );
    case "typeParameterDeclaration":
      return typeAnnotation.params.map(GeneralType);
    case "typeParameter":
      return (
        <span>
          {typeAnnotation.value}
          {typeAnnotation.default ? (
            <>
              {" = "}
              <GeneralType {...typeAnnotation.default} />
            </>
          ) : null}
        </span>
      );
    case "union":
      return typeAnnotation.types.filter(Boolean).map((item, index, array) => (
        <React.Fragment key={index}>
          <GeneralType {...item} />
          {index < array.length - 1 ? " | " : null}
        </React.Fragment>
      ));
    case "array":
      return <>{GeneralType(typeAnnotation.elementType)}[]</>;
    case "tuple":
      return <>[{typeAnnotation.elementTypes.map(GeneralType)}]</>;
    case "intersection": {
      return typeAnnotation.types.map((item, index, array) => (
        <React.Fragment key={index}>
          <GeneralType {...item} />
          {index < array.length - 1 ? " & " : null}
        </React.Fragment>
      ));
    }
    case "typeLiteral":
      return (
        <>
          {"{"}
          {typeAnnotation.members.map(GeneralType)}
          {"}"}
        </>
      );
    case "literal":
      return <span>&quot;{typeAnnotation.value}&quot;</span>;
    case "identifier":
    case "stringLiteral":
    case "keyword":
      return (
        <span>
          {typeAnnotation.name
            ? `[${typeAnnotation.name}: ${typeAnnotation.value}]`
            : typeAnnotation.value}
        </span>
      );
  }
};
