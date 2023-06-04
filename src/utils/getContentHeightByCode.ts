import {
  EDITOR_SCROLLBAR_SIZE,
  EDITOR_PADDING_TOP,
  EXAMPLE_CODE_LINE_HEIGHT,
  EXAMPLE_MIN_HEIGHT,
} from "@site/src/constants";

export default function getContentHeightByCode(code: string): number {
  return Math.max(EXAMPLE_MIN_HEIGHT, code.split("\n").length * EXAMPLE_CODE_LINE_HEIGHT +
    EDITOR_SCROLLBAR_SIZE +
    EDITOR_PADDING_TOP);
}
