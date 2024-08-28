import { useState } from "react";
import { PLAYGROUND_DEFAULTS } from "@/constantes/playgroundDefaults";

export function usePlayground() {
  const [endpoint, setEndpoint] = useState<string>(
    PLAYGROUND_DEFAULTS.endpoint,
  );

  return { endpoint, setEndpoint };
}
