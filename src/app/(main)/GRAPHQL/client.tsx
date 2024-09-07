"use client";

import { Playground } from "@/components/Playground/Playground";
import { PlaygroundSettings } from "@/components/Playground/usePlayground";

export default function GraphiQL({
  settings,
}: {
  settings: PlaygroundSettings;
}) {
  return (
    <div className="col-span-8 grid grid-cols-8 gap-6 h-full">
      <Playground settings={settings} />
    </div>
  );
}

// "use client";

// import { Playground } from "@/components/Playground/Playground";
// import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";
// import {
//   PlaygroundSettings,
//   usePlayground,
// } from "@/components/Playground/usePlayground";
// import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput";
// import React, { useState, useEffect } from "react";

// export default function GraphiQL({
//   settings,
// }: {
//   settings: PlaygroundSettings;
// }) {
//   const {
//     endpoint,
//     schema: graphqlSchema,
//     getSchema,
//     setNewSetting,
//     isLoading,
//   } = usePlayground(settings);

//   const [inputValue, setInputValue] = useState(endpoint);

//   useEffect(() => {
//     if (!graphqlSchema) {
//       getSchema();
//     }
//   }, [graphqlSchema, getSchema]);

//   const schemaStatus =
//     (isLoading && "Loading...") || (graphqlSchema ? null : "No schema");

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   const handleBlur = () => {
//     setNewSetting("endpoint", inputValue);
//   };

//   return (
//     <>
//       <div className="col-span-8 sm:col-span-8 md:col-span-4 lg:col-span-2 h-full flex flex-col gap-4 py-8">
//         <h2>GraphiQL Editor</h2>
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center gap-4">
//             <TextInput
//               label="Endpoint URL"
//               placeholder="Endpoint"
//               value={inputValue}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//             />

//           </div>
//           <div className="flex items-center gap-4">
//             <TextInput
//               label="SDL URL"
//               placeholder="SDL"
//               value={inputValue}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//             />

//           </div>
//         </div>
//         <div>
//           {schemaStatus ? (
//             <p>{schemaStatus}</p>
//           ) : (
//             <SchemaViewer schema={graphqlSchema!} />
//           )}
//         </div>
//       </div>
//       <div className="lg:col-start-3 lg:col-span-3 h-full py-8">
//       <h3 className="text-mediumGray">{inputValue}</h3>
//         <Playground settings={settings} />
//       </div>
//     </>
//   );
// }
