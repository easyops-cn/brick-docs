import React from "react";
import Heading from "@theme/Heading";
import { DeclarationTypeAlias } from "@next-core/brick-manifest";
import GeneralType from "@site/src/components/GeneralType";
import SimpleMarkdown from "@site/src/components/SimpleMarkdown";

export default function BrickDocTypeAlias({
  typeAliasDeclaration,
}: {
  typeAliasDeclaration: DeclarationTypeAlias;
}): JSX.Element {
  return (
    <>
      <Heading as="h3" id={`ref-${typeAliasDeclaration.name}`}>
        {typeAliasDeclaration.name}
      </Heading>
      {typeAliasDeclaration.description && (
        <p>
          <SimpleMarkdown content={typeAliasDeclaration.description} />
        </p>
      )}
      <pre>
        <code>
          <GeneralType annotation={typeAliasDeclaration.typeParameters} />
          {typeAliasDeclaration.typeParameters && " "}
          <GeneralType annotation={typeAliasDeclaration.annotation} />
        </code>
      </pre>
    </>
  );
}
