import React from "react";
import type { Annotation, EventManifest } from "@next-core/brick-manifest";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";
import { GeneralType } from "../BrickDocTypes/generalType";

interface Event {
  detail: {
    types: Annotation;
  };
}

export default function BrickDocEvents({
  events,
}: {
  events: EventManifest[];
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
              {(event as unknown as Event).detail?.types ? (
                <MaybeEmptyCode>
                  {GeneralType((event as unknown as Event).detail.types)}
                </MaybeEmptyCode>
              ) : (
                <MaybeEmptyCode>{event.detail?.type}</MaybeEmptyCode>
              )}
              {event.detail?.description
                ? ` - ${event.detail?.description}`
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
