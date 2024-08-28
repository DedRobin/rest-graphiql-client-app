export const mockHistoryData = [
  {
    type: "REST",
    url: "http://example1.com/api",
    method: "POST",
    params: null,
    body: {
      name: "Foo1",
      surname: "Bar2",
    },
  },
  {
    type: "REST",
    url: "http://example.com/api/rest",
    method: "GET",
    params: {
      name: "Foo2",
      surname: "Bar2",
    },
    body: null,
  },
  {
    type: "GraphQL",
    url: "http://example.com/api/graphql",
    method: "POST",
    body: {
      users: {
        name: "Foo3",
        surname: "Bar3",
      },
    },
  },
  {
    type: "GraphQL",
    url: "http://example.com/api/graphql",
    method: "POST",
    body: {
      users: {
        name: "Foo4",
        surname: "Bar4",
      },
    },
  },
];
