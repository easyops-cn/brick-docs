import { wrapBrick } from "./wrapBrick";

export const WrappedSlInput = wrapBrick<
  SlInputElement,
  SlInputProps,
  SlInputEvents,
  SlInputMapEvents
>("sl-input", {
  onSlChange: "sl-change",
});

export interface SlInputProps {
  type?: string;
  placeholder?: string;
  clearable?: boolean;
  autofocus?: boolean;
  size?: "small" | "medium" | "large";
  value?: string;
  // defaultValue?: string;
  // "default-value"?: string;
}

export interface SlInputEvents {
  "sl-change": Event;
}

export interface SlInputMapEvents {
  onSlChange: "sl-change";
}

export interface SlInputElement extends HTMLElement {
  //
}
