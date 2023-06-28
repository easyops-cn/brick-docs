import React from "react";
import Heading from "@theme/Heading";
import { DeclarationEnum } from "@next-core/brick-manifest";
import clsx from "clsx";
import GeneralType from "../GeneralType";
import styles from "./style.module.css";

export default function BrickDocEnums({
  enumDeclaration,
}: {
  enumDeclaration: DeclarationEnum;
}): JSX.Element {
  return (
    <>
      <Heading as="h3" id={`ref-${enumDeclaration.name}`}>
        {enumDeclaration.name}
        <span className={clsx(styles.tag, "badge badge--info")}>enum</span>
      </Heading>
      <pre>
        <code>
          {enumDeclaration.members.map((item, index) => (
            <React.Fragment key={index}>
              <GeneralType annotation={item.id} />
              {item.initializer && " = "}
              <GeneralType annotation={item.initializer} />
              {",\n"}
            </React.Fragment>
          ))}
        </code>
      </pre>
    </>
  );
}
