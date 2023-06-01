import React from "react";
import type { MethodManifest } from "@next-core/brick-manifest";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";

export default function BrickDocMethods({
  methods
}: {
  methods: MethodManifest[]
}): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Params</th>
          <th>Return</th>
        </tr>
      </thead>
      <tbody>
        {
          methods.map(method => (
            <tr key={method.name}>
              <td><code>{method.name}</code></td>
              <td>{method.description}</td>
              <td>
                {
                  method.params.map(
                    (param, index, array) => (
                      <>
                        <code>{param as string}</code>
                        {index < array.length - 1 ? ", " : ""}
                      </>
                    )
                  )
                }
              </td>
              <td>
                <MaybeEmptyCode>{method.return?.type}</MaybeEmptyCode>
                {
                  method.return?.description
                    ? ` - ${method.return?.description}`
                    : ""
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
