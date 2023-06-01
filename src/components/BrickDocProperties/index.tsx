import React from "react";
import type { PropertyManifest } from "@next-core/brick-manifest";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";

export default function BrickDocProperties({
  properties
}: {
  properties: PropertyManifest[]
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
        {
          properties.map(prop => (
            <tr key={prop.name}>
              <td><code>{prop.name}</code></td>
              <td>{prop.description}</td>
              <td><MaybeEmptyCode>{prop.type}</MaybeEmptyCode></td>
              <td><MaybeEmptyCode>{prop.default}</MaybeEmptyCode></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
