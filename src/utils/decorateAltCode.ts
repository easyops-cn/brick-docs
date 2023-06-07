export function decorateAltCode(
  code: string,
  mode: string,
  altMode: string
): string {
  return `${
    altMode === mode
      ? ""
      : altMode === "yaml"
      ? "# Note: this example is original written in HTML and auto-transpiled to YAML\n"
      : "<!-- Note: this example is original written in YAML and auto-transpiled to HTML -->\n"
  }${code}`;
}
