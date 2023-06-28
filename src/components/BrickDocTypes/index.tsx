import React, { useMemo } from "react";
import { Declaration } from "@next-core/brick-manifest";
import BrickDocInterface from "@site/src/components/BrickDocInterface";
import BrickDocTypeAlias from "@site/src/components/BrickDocTypeAlias";
import BrickDocEnums from "@site/src/components/BrickDocEnums";
import { TypeReferencesContext } from "../GeneralType";

const sortInfo = {
  interface: 1,
  typeAlias: 2,
  enums: 3,
};

export default function BrickDocTypes({
  types,
}: {
  types: Declaration[];
}): JSX.Element {
  const typeReferences = useMemo(() => types.map((item) => item.name), [types]);
  return (
    <TypeReferencesContext.Provider value={typeReferences}>
      {types
        .sort((a, b) => {
          return sortInfo[a.type] - sortInfo[b.type];
        })
        .map((annotation, index) => {
          switch (annotation.type) {
            case "interface":
              return (
                <BrickDocInterface
                  key={index}
                  interfaceDeclaration={annotation}
                />
              );
            case "typeAlias":
              return (
                <BrickDocTypeAlias
                  key={index}
                  typeAliasDeclaration={annotation}
                />
              );
            case "enum":
              return <BrickDocEnums key={index} enumDeclaration={annotation} />;
          }
        })}
    </TypeReferencesContext.Provider>
  );
}
