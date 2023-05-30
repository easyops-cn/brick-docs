declare module "*.yaml" {
  const content: string;
  export default content;
}

declare module "*.raw.css" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const url: string;
  export default url;
}
