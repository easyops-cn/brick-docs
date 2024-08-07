import React from "react";
import type { PartManifest } from "@next-core/brick-manifest";
import SimpleMarkdown from "@site/src/components/SimpleMarkdown";

export default function BrickDocParts({
  parts,
}: {
  parts: PartManifest[];
}): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {parts.map((part) => (
          <tr key={part.name}>
            <td>
              <code>{part.name}</code>
            </td>
            <td>
              <SimpleMarkdown content={part.description} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
