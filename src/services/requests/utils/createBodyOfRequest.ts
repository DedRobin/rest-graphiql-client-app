export function createBodyOfRequest(query: string, variables?: string) {
  if (!variables) {
    return JSON.stringify({ query });
  }
  const parsedVariables = JSON.parse(variables);
  return JSON.stringify({ query, variables: parsedVariables });
}
