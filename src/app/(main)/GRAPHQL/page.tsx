import { redirect } from "next/navigation";
import { encodePlaygroundSettings } from "@/utils/urlUtils";
import { PLAYGROUND_DEFAULT_SETTINGS } from "@/constants/playgroundDefaults";
import { Route } from "@/app/routes";

export default function GraphiQLRootPage() {
  const encodedDefaultSettings = encodePlaygroundSettings(
    PLAYGROUND_DEFAULT_SETTINGS,
  );
  redirect(`${Route.GraphQL}/${encodedDefaultSettings}`);

  // const settings: PlaygroundSettings = {
  //   variables: "",
  //   query: "",
  //   endpoint: "",
  // };
  // return <GraphiQL settings={settings} />;
}
