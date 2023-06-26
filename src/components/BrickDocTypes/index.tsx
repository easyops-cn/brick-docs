import React from "react";
import { Types } from "@next-core/brick-manifest";
import BrickDocInterface from "@site/src/components/BrickDocInterface";
import BrickDocTypeAlias from "@site/src/components/BrickDocTypeAlias";
import BrickDocEnums from "@site/src/components/BrickDocEnums";

const sortInfo = {
  interface: 1,
  typeAlias: 2,
  enums: 3,
};

export default function BrickDocTypes({
  types,
}: {
  types: Types[];
}): JSX.Element {
  const renderType = (typeAnnotation: Types) => {
    const { type } = typeAnnotation;
    switch (type) {
      case "interface":
        return <BrickDocInterface interfaceDeclaration={typeAnnotation} />;
      case "typeAlias":
        return <BrickDocTypeAlias typeAliasDeclaration={typeAnnotation} />;
      case "enums":
        return <BrickDocEnums enumDeclaration={typeAnnotation} />;
      default:
        return <div>{type}</div>;
    }
  };

  return (
    <div>
      {types
        .sort((a, b) => {
          return sortInfo[a.type] - sortInfo[b.type];
        })
        .map(renderType)}
    </div>
  );
}
