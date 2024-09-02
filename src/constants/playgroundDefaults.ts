import { PlaygroundSettings } from "@/components/Playground/usePlayground";

export const PLAYGROUND_DEFAULT_SETTINGS: PlaygroundSettings = {
  endpoint: encodeURI("https://rickandmortyapi.com/graphql"),
  query:
    "query ($filter: FilterCharacter) {characters(filter: $filter) { results { name } }}",
  variables: '{"filter":{"name":"black"}}',
} as const;
