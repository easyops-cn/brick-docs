import React from "react";
import type { Annotation, PropertyManifest } from "@next-core/brick-manifest";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";
import { GeneralType } from "../BrickDocTypes/generalType";

interface Property extends PropertyManifest {
  types: Annotation;
}

export default function BrickDocProperties({
  properties,
}: {
  properties: Property[];
}): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((prop) => (
          <tr key={prop.name}>
            <td>
              <code>{prop.name}</code>
            </td>
            <td>{prop.description}</td>
            <td>
              {prop.types ? (
                GeneralType(prop.types) || prop.type
              ) : (
                <MaybeEmptyCode>{prop.type}</MaybeEmptyCode>
              )}{" "}
            </td>
            <td>
              <MaybeEmptyCode>{prop.default}</MaybeEmptyCode>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
