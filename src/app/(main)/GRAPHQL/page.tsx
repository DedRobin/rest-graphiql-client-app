import { redirect } from "next/navigation";
import { createPlaygroundURL } from "@/utils/urlUtils";
import { PLAYGROUND_DEFAULT_SETTINGS } from "@/constants/playgroundDefaults";

export default function GraphiQLRootPage() {
  redirect(
    createPlaygroundURL(PLAYGROUND_DEFAULT_SETTINGS, new URLSearchParams()),
  );

  // const settings: PlaygroundSettings = {
  //   variables: "",
  //   query: "",
  //   endpoint: "",
  // };
  // return <GraphiQL settings={settings} />;
}
