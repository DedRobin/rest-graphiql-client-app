export function createBodyOfRequest(variables: string, query: string) {
  if (!variables) {
    return JSON.stringify({ query });
  }
  const parsedVariables = JSON.parse(variables);
  return JSON.stringify({ query, variables: parsedVariables });
}
