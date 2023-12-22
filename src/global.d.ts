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

declare module "@next-core/loader/standalone" {
  export declare function add(
    pkgList: BrickPackage[],
    bricksDir?: string
  ): void;
  export declare function loadBricks(
    bricks: string[] | Set<string>
  ): Promise<void>;
}
