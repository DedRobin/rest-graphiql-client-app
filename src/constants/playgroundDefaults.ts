export const PLAYGROUND_DEFAULTS = {
  endpoint: encodeURI("https://rickandmortyapi.com/graphql"),
  query:
    "query ($filter: FilterCharacter) {characters(filter: $filter) { results { name } }}",
  variables: '{"filter":{"name":"black"}}',
  headers: "",
} as const;
