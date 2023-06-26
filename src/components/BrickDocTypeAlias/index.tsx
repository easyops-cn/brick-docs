import React, { useMemo } from "react";
import { TypeAliasDeclaration } from "@next-core/brick-manifest";
import { GeneralType } from "../BrickDocTypes/generalType";
import styles from "./style.module.css";

export default function BrickDocTypeAlias({
  typeAliasDeclaration,
}: {
  typeAliasDeclaration: TypeAliasDeclaration;
}): JSX.Element {
  const body = useMemo(() => {
    if (Array.isArray(typeAliasDeclaration.annotation)) {
      return typeAliasDeclaration.annotation.map(GeneralType);
    } else {
      return GeneralType(typeAliasDeclaration.annotation);
    }
  }, [typeAliasDeclaration]);

  return (
    <div>
      <h3 id={typeAliasDeclaration.name}>
        {typeAliasDeclaration.name}
        {typeAliasDeclaration.typeParameters ? (
          <>
            {"<"}
            {GeneralType(typeAliasDeclaration.typeParameters)}
            {">"}
          </>
        ) : null}
      </h3>
      <div className={styles.typeAliasWrapper}>{body}</div>
    </div>
  );
}
