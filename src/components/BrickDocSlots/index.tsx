import React from "react";
import type { SlotManifest } from "@next-core/brick-manifest";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";
import SimpleMarkdown from "@site/src/components/SimpleMarkdown";

export default function BrickDocSlots({
  slots,
}: {
  slots: SlotManifest[];
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
        {slots.map((slot) => (
          <tr key={slot.name}>
            <td>
              <MaybeEmptyCode fallback="(default)">{slot.name}</MaybeEmptyCode>
            </td>
            <td>
              <SimpleMarkdown content={slot.description} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
