import React from "react";
import { Annotation } from "@next-core/brick-manifest";
import GeneralType from "../GeneralType";
import MaybeEmptyCode from "../MaybeEmptyCode";

export interface ProviderDocParamsProps {
  params?: ProviderParam[];
}

interface ProviderParam {
  name: string;
  description?: string;
  annotation?: Annotation;
  isRestElement?: boolean;
}

export default function ProviderDocParams({
  params,
}: ProviderDocParamsProps): JSX.Element {
  if (params.length === 0) {
    return <p>None</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {params.map((param, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <code>
                {param.isRestElement && "..."}
                {param.name}
              </code>
            </td>
            <td className="pre-wrap">{param.description}</td>
            <td>
              <MaybeEmptyCode>
                <GeneralType annotation={param.annotation} />
              </MaybeEmptyCode>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
