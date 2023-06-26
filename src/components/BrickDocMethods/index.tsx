import React from "react";
import type { Annotation, MethodManifest } from "@next-core/brick-manifest";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";
import { GeneralType } from "../BrickDocTypes/generalType";

interface Method {
  return: {
    types: Annotation;
  };
}

export default function BrickDocMethods({
  methods,
}: {
  methods: MethodManifest[];
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
        {methods.map((method) => (
          <tr key={method.name}>
            <td>
              <code>{method.name}</code>
            </td>
            <td>{method.description}</td>
            <td>
              {method.params.map((param, index, array) => (
                <React.Fragment key={index}>
                  <code>{param as string}</code>
                  {index < array.length - 1 ? ", " : ""}
                </React.Fragment>
              ))}
            </td>
            <td>
              {(method as unknown as Method).return?.types ? (
                GeneralType((method as unknown as Method).return.types)
              ) : (
                <MaybeEmptyCode>{method.return?.type}</MaybeEmptyCode>
              )}
              {method.return?.description
                ? ` - ${method.return?.description}`
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
