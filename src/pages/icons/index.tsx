import React, { Suspense } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Layout from "@theme/Layout";
import LoadingRingBox from "@site/src/components/LoadingRingBox";

export default function IconsPage(): JSX.Element {
  return (
    <Layout title="Icons" description="Search icons">
      <BrowserOnly fallback={<LoadingRingBox height={200} />}>
        {() => {
          const LazyIconsComponent =
            require("./_comonents/IconsComponent").default;
          return (
            <Suspense fallback={<LoadingRingBox height={200} />}>
              <LazyIconsComponent />
            </Suspense>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
}
