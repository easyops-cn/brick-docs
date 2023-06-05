import { useMemo } from "react";
import { useLocation } from "@docusaurus/router";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const PARAM_MODE = "mode";
const PARAM_EXAMPLE = "example";

function usePlaygroundQuery(): {
  paramMode: string;
  paramExample: string;
  hash: string;
} {
  const location = useLocation();

  const params = ExecutionEnvironment.canUseDOM ? new URLSearchParams(location.search) : null;
  const paramMode = params?.get(PARAM_MODE) || "";
  const paramExample = params?.get(PARAM_EXAMPLE) || "";

  return useMemo(
    () => ({
      paramMode,
      paramExample,
      hash: location.hash.slice(1),
    }),
    // Always return the initial query and hash.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}

export default usePlaygroundQuery;
