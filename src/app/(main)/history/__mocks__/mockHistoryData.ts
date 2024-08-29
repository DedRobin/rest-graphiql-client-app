export const mockHistoryData = [
  {
    method: "GET",
    url: "http://example1.com/api/endpoint&foo=foo&bar=bar",
  },
  {
    method: "POST",
    url: "http://example1.com/api/endpoint/post",
  },
  {
    method: "GRAPHQL",
    url: "http://example1.com/graphql",
  },
];

export type TMockHistoryData = typeof mockHistoryData;
