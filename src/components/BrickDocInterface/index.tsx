import React, { useMemo } from "react";
import { InterfaceDeclaration } from "../interface";
import { GeneralType } from "../BrickDocTypes/generalType";

export default function BrickDocInterface({
  interfaceDeclaration,
}: {
  interfaceDeclaration: InterfaceDeclaration;
}): JSX.Element {
  const body = useMemo(() => {
    return interfaceDeclaration.annotation.map((item) => {
      if (item.type === "propertySignature") {
        const { name, property, required, description } = item;
        return {
          name: name,
          type: GeneralType(property),
          required,
          description,
        };
      } else if (item.type === "indexSignature") {
        const { parameters, property, required, description } = item;
        return {
          name: GeneralType(parameters),
          type: GeneralType(property),
          required,
          description,
        };
      }
    });
  }, [interfaceDeclaration]);

  return (
    <>
      <h3 id={interfaceDeclaration.name}>
        {interfaceDeclaration.name}
        {interfaceDeclaration.typeParameters ? (
          <>
            {"<"}
            {GeneralType(interfaceDeclaration.typeParameters)}
            {">"}
          </>
        ) : null}
      </h3>
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
          {body.map((prop) => (
            <tr key={prop.name}>
              <td>
                <code>{prop.name}</code>
              </td>
              <td>{prop.type}</td>
              <td>{prop.required}</td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
