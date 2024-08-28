import { GraphQLSchema } from "graphql/type";

export function SchemaViewer({ schema }: { schema: GraphQLSchema }) {
  const queryType = schema.getQueryType();
  const queries = queryType ? Object.values(queryType.getFields()) : [];

  return (
    <ul>
      {queries.map((field) => {
        return (
          <li key={field.name}>
            <p>
              name={field.name}: {field.type.toString()}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
