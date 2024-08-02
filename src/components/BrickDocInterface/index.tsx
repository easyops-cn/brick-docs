import React from "react";
import Heading from "@theme/Heading";
import { DeclarationInterface } from "@next-core/brick-manifest";
import GeneralType, { GeneralTypeList } from "@site/src/components/GeneralType";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";
import SimpleMarkdown from "@site/src/components/SimpleMarkdown";

export default function BrickDocInterface({
  interfaceDeclaration,
}: {
  interfaceDeclaration: DeclarationInterface;
}): JSX.Element {
  return (
    <>
      <Heading as="h3" id={`ref-${interfaceDeclaration.name}`}>
        {interfaceDeclaration.name}
      </Heading>
      {(interfaceDeclaration.extends?.length ||
        interfaceDeclaration.typeParameters) && (
        <pre>
          <code>
            <GeneralType annotation={interfaceDeclaration.typeParameters} />
            {interfaceDeclaration.extends?.length && (
              <>
                {interfaceDeclaration.typeParameters && " "}
                {"extends "}
                <GeneralTypeList list={interfaceDeclaration.extends} />
              </>
            )}
          </code>
        </pre>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {interfaceDeclaration.body.map((item, index) => (
            <tr key={index}>
              <td>
                <MaybeEmptyCode>
                  <GeneralType
                    annotation={item}
                    signaturePart="name"
                    ignoreOptional
                  />
                </MaybeEmptyCode>
              </td>
              <td>
                <MaybeEmptyCode>
                  <GeneralType annotation={item} signaturePart="type" />
                </MaybeEmptyCode>
              </td>
              <td style={{ textAlign: "center" }}>
                {item.type === "indexSignature" || item.optional ? "" : "✅"}
              </td>
              <td>
                <SimpleMarkdown content={item.description} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
