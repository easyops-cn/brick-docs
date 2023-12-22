// https://github.com/shoelace-style/shoelace/blob/e0fd6b210ea203100f90872181843ff59eb1267d/src/components/icon/icon.ts
const CACHEABLE_ERROR = Symbol();
const RETRYABLE_ERROR = Symbol();
type SVGResult =
  | SVGSVGElement
  | typeof RETRYABLE_ERROR
  | typeof CACHEABLE_ERROR;

let parser: DOMParser;
const iconCache = new Map<string, Promise<SVGResult>>();

/** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
async function resolveIcon(url: string): Promise<SVGResult> {
  let fileData: Response;
  try {
    fileData = await fetch(url, { mode: "cors" });
    if (!fileData.ok)
      return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
  } catch {
    return RETRYABLE_ERROR;
  }

  try {
    const div = document.createElement("div");
    div.innerHTML = await fileData.text();

    const svg = div.firstElementChild;
    if (svg?.tagName?.toLowerCase() !== "svg") return CACHEABLE_ERROR;

    if (!parser) parser = new DOMParser();
    const doc = parser.parseFromString(svg.outerHTML, "text/html");

    const svgEl = doc.body.querySelector("svg");
    if (!svgEl) return CACHEABLE_ERROR;

    // if (options?.currentColor) {
    //   const colorProps = [
    //     "color",
    //     "fill",
    //     "stroke",
    //     "stop-color",
    //     "flood-color",
    //     "lighting-color",
    //   ];
    //   for (const prop of colorProps) {
    //     const elements = svgEl.querySelectorAll(
    //       `[${prop}]:not([${prop}="none"])`
    //     );
    //     for (const e of elements) {
    //       e.setAttribute(prop, "currentColor");
    //     }
    //   }
    // }

    // svgEl.setAttribute("width", "1em");
    // svgEl.setAttribute("height", "1em");
    document.adoptNode(svgEl);
    const container = document.createElement("div");
    container.hidden = true;
    container.appendChild(svgEl);
    document.body.appendChild(container);
  } catch {
    return CACHEABLE_ERROR;
  }
}

export async function initializeIcon(url: string | undefined) {
  if (!url) {
    return;
  }

  let iconResolver = iconCache.get(url);
  if (!iconResolver) {
    iconResolver = resolveIcon(url);
    iconCache.set(url, iconResolver);
  }

  const svg = await iconResolver;
  if (svg === RETRYABLE_ERROR) {
    iconCache.delete(url);
  }
}
