export function decorateAltCode(
  code: string,
  mode: string,
  altMode: string
): string {
  return `${
    altMode === mode
      ? ""
      : altMode === "yaml"
      ? "# NOTE: this example is originally written in HTML and auto-transpiled to YAML\n"
      : "<!-- NOTE: this example is originally written in YAML and auto-transpiled to HTML -->\n"
  }${code}`;
}
