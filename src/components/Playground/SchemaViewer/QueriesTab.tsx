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
import { Field } from "./ui/Field";

export function QueriesTab({
  queries,
  setOpenedTypes,
  openedTypes,
}: {
  queries: GraphQLField<unknown, unknown, unknown>[];
  openedTypes: TypeToDisplay[];
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
}) {
  const toggleType = (field: TypeToDisplay) => {
    setOpenedTypes((prev) => {
      const isAlreadyOpen = prev.some(
        (openedType) => openedType.name === field.name,
      );
      if (isAlreadyOpen) {
        // Закрываем вкладку, если она уже открыта
        return prev.filter((openedType) => openedType.name !== field.name);
      } else {
        // Открываем новую вкладку
        return [...prev, field];
      }
    });
  };

  return (
    <div className="flex flex-col w-full">
      <h5 className="text-green pb-1">Schema queries</h5>
      <div className="custom-scroll max-h-[calc(100vh-464px)] overflow-y-auto pr-2">
        <ul>
          {queries.map((field) => {
            const isActive = openedTypes.some(
              (openedType) => openedType.name === field.name,
            );
            return (
              <li key={field.name} className={isActive ? "active-class" : ""}>
                <Field
                  name={`${field.name}`}
                  type={`${field.type.toString()}`}
                  isOpen={isActive}
                  onClick={() => toggleType(field)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
