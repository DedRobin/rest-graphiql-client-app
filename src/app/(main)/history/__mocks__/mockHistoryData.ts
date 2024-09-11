export const mockHistoryData = [
  {
    method: "GET",
    url: "http://example1.com/api/endpoint&foo=foo&bar=bar",
    headers: {
      "Content-Type": "application/json",
    },
    responseStatus: 200,
    responseBody: {
      message: "Success",
      data: {
        foo: "foo",
        bar: "bar",
      },
    },
    timestamp: "2024-09-10T12:00:00Z", // ISO формат времени
  },
  {
    method: "POST",
    url: "http://example1.com/api/endpoint/post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer token123",
    },
    requestBody: {
      foo: "fooValue",
      bar: "barValue",
    },
    responseStatus: 201,
    responseBody: {
      message: "Created",
      id: 1,
    },
    timestamp: "2024-09-10T12:05:00Z", // ISO формат времени
  },
  {
    method: "GRAPHQL",
    url: "http://example1.com/graphql",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer token123",
    },
    query: `
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
        }
      }
    `,
    variables: {
      id: "1",
    },
    responseStatus: 200,
    responseBody: {
      data: {
        user: {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
        },
      },
    },
    timestamp: "2024-09-10T12:10:00Z", // ISO формат времени
  },
];

export type TMockHistoryItem = (typeof mockHistoryData)[0];
