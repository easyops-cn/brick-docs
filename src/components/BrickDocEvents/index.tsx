import React from "react";
import type { EventManifest } from "@next-core/brick-manifest";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";

export default function BrickDocEvents({
  events
}: {
  events: EventManifest[]
}): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Event Detail</th>
        </tr>
      </thead>
      <tbody>
        {
          events.map(event => (
            <tr key={event.name}>
              <td><code>{event.name}</code></td>
              <td>{event.description}</td>
              <td>
                <MaybeEmptyCode>{event.detail?.type}</MaybeEmptyCode>
                {
                  event.detail?.description
                    ? ` - ${event.detail?.description}`
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
