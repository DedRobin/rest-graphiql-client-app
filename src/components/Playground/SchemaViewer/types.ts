import { GraphQLField, GraphQLArgument } from "graphql";

export type TypeToDisplay =
  | GraphQLField<unknown, unknown, unknown>
  | GraphQLArgument;
