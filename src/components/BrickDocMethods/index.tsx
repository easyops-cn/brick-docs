import React from "react";
import type {
  Annotation,
  MethodManifest,
  MethodParamManifest,
} from "@next-core/brick-manifest";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";
import GeneralType from "../GeneralType";

interface Method extends MethodManifest {
  params: (MethodParamManifest & {
    annotation?: Annotation;
  })[];
  returns?: MethodManifest["returns"] & {
    annotation?: Annotation;
  };
}

export default function BrickDocMethods({
  methods,
}: {
  methods: Method[];
}): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Params</th>
          <th>Returns</th>
        </tr>
      </thead>
      <tbody>
        {methods.map((method) => (
          <tr key={method.name}>
            <td>
              <code
                title={
                  typeof method.deprecated === "string"
                    ? method.deprecated
                    : undefined
                }
              >
                {method.deprecated ? <del>{method.name}</del> : method.name}
              </code>
            </td>
            <td className="pre-wrap">{method.description}</td>
            <td>
              {method.params.map((param, index, array) => (
                <React.Fragment key={index}>
                  <code>
                    {param.isRestElement && "..."}
                    {param.name}
                    {param.annotation ? (
                      <>
                        {": "}
                        <GeneralType annotation={param.annotation} />
                      </>
                    ) : (
                      param.type
                    )}
                  </code>
                  {index < array.length - 1 && ", "}
                </React.Fragment>
              ))}
            </td>
            <td>
              <MaybeEmptyCode>
                {method.returns?.annotation ? (
                  <GeneralType annotation={method.returns.annotation} />
                ) : (
                  method.returns?.type
                )}
              </MaybeEmptyCode>
              {method.returns?.description &&
                ` - ${method.returns.description}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
