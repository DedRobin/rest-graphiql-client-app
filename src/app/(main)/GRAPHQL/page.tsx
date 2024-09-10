import { redirect } from "next/navigation";
import { PLAYGROUND_DEFAULT_SETTINGS } from "@/constants/playgroundDefaults";
import { createPlaygroundURL } from "@/components/Playground/utils";

export default function GraphiQLRootPage() {
  redirect(createPlaygroundURL(PLAYGROUND_DEFAULT_SETTINGS)); // временно заполняем поля

  // return <GraphiQL />;
}
