import React from "react";
import { EnumDeclaration } from "@next-core/brick-manifest";
import { GeneralType } from "../BrickDocTypes/generalType";
import styles from "./style.module.css";

export default function BrickDocTypeAlias({
  enumDeclaration,
}: {
  enumDeclaration: EnumDeclaration;
}): JSX.Element {
  return (
    <div>
      <h3 id={enumDeclaration.name}>
        {enumDeclaration.name}
        <span className={styles.tag}>enum</span>
      </h3>
      <div className={styles.enumWrapper}>
        {enumDeclaration.members.map((item, index) => (
          <div key={index}>
            {GeneralType(item.name)}
            {" = "}
            {GeneralType(item.value)}
          </div>
        ))}
      </div>
    </div>
  );
}
