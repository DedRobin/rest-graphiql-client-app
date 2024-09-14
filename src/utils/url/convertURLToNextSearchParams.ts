export function convertURLToNextSearchParams(
  searchParams: string,
): undefined | { [p: string]: string | undefined } {
  if (!searchParams) return undefined;
  const params = new URLSearchParams(searchParams);
  const result: { [p: string]: string | undefined } = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
