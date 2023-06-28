import React from "react";
import type { Annotation, EventManifest } from "@next-core/brick-manifest";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";
import GeneralType from "../GeneralType";

interface Event extends EventManifest {
  detail?: EventManifest["detail"] & {
    annotation?: Annotation;
  };
}

export default function BrickDocEvents({
  events,
}: {
  events: Event[];
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
        {events.map((event) => (
          <tr key={event.name}>
            <td>
              <code>{event.name}</code>
            </td>
            <td>{event.description}</td>
            <td>
              <MaybeEmptyCode>
                {event.detail?.annotation ? (
                  <GeneralType annotation={event.detail.annotation} />
                ) : (
                  event.detail?.type
                )}
              </MaybeEmptyCode>
              {event.detail?.description && ` - ${event.detail.description}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
