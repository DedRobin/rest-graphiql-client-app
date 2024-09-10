import React from "react";
import { GraphQLField } from "graphql";
import { TypeToDisplay } from "./types";
import { Field } from "./ui/Field";

type SidebarProps = {
  queries: GraphQLField<unknown, unknown, unknown>[];
  openedTypes: TypeToDisplay[];
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
  setIsAccordionVisible: React.Dispatch<React.SetStateAction<boolean>>; // Добавляем пропс
};

export function Sidebar({
  queries,
  openedTypes,
  setOpenedTypes,
  setIsAccordionVisible,
}: SidebarProps) {
  // Функция для переключения состояния типа
  const toggleType = (field: TypeToDisplay) => {
    setOpenedTypes((prev) => {
      const isAlreadyOpen = prev.some(
        (openedType) => openedType.name === field.name,
      );
      // Закрываем все вкладки и открываем только выбранную
      return isAlreadyOpen
        ? [] // Если вкладка уже открыта, закрываем её
        : [field]; // Иначе открываем только выбранную вкладку
    });
    setIsAccordionVisible(true); // Открываем аккордеон при нажатии на таб
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row items-center"></div>
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
