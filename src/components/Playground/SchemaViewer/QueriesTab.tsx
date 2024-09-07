// import React from "react";
// import { GraphQLField } from "graphql";
// import { TypeToDisplay } from "./types";

// export function QueriesTab({
//   queries,
//   setOpenedTypes,
// }: {
//   queries: GraphQLField<unknown, unknown, unknown>[];
//   setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
// }) {
//   return (
//     <div>
//       <h3>Queries</h3>
//       <ul>
//         {queries.map((field) => {
//           return (
//             <li key={field.name} onClick={() => setOpenedTypes([field])}>
//               <p>
//                 name={field.name}: {field.type.toString()}
//               </p>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

import React from "react";
import { GraphQLField } from "graphql";
import { TypeToDisplay } from "./types";
import { QueryMenuItem } from "@/components/UI/buttons/QueryMenuItem/QueryMenuItem";

export function QueriesTab({
  queries,
  setOpenedTypes,
}: {
  queries: GraphQLField<unknown, unknown, unknown>[];
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
}) {
  return (
    <div className="flex flex-col h-full">
      <h5 className="text-green pb-1">Schema queries</h5>
      <div className="custom-scroll max-h-[34vh] overflow-y-auto">
        <ul>
          {queries.map((field) => (
            <li key={field.name}>
              <QueryMenuItem
                field={field}
                onClick={(field) => setOpenedTypes([field])}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
