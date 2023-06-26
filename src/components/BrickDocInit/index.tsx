import React from "react";
import { Types } from "@next-core/brick-manifest";
import { initTypes } from "../BrickDocTypes/generalType";

export default function BrickDocInit({
  types,
}: {
  types: Types[];
}): JSX.Element {
  types && initTypes(types);

  return <></>;
}
