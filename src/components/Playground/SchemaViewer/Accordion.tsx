import { TypeToDisplay } from "@/components/Playground/SchemaViewer/types";
import { TypeTab } from "@/components/Playground/SchemaViewer/TypeTab/TypeTab";
import { Button } from "@/components/UI/buttons/Button/Button";
import { CrossIcon } from "@/components/UI/buttons/Button/CrossIcon";

type AccordionProps = {
  openedTypes: TypeToDisplay[];
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
  addNewTypeToDisplay: (newType: TypeToDisplay, tabIndex: number) => void; // Пропс добавлен сюда
  setIsAccordionVisible: React.Dispatch<React.SetStateAction<boolean>>; // Добавляем пропс
};

export function Accordion({
  openedTypes,
  setOpenedTypes,
  addNewTypeToDisplay,
  setIsAccordionVisible, // Деструктурируем пропс
}: AccordionProps) {
  // Функция для закрытия всего аккордеона
  const closeAccordion = () => {
    setOpenedTypes([]);
    setIsAccordionVisible(false); // Скрываем аккордеон
  };

  return (
    <div className="w-full h-full flex flex-row fixed z-50 bg-black">
      <div className="fixed right-12 top-20 z-1000">
        <Button
          title="Remove"
          onClick={closeAccordion}
          IconComponent={CrossIcon}
        ></Button>
      </div>
      {openedTypes.map((openedType, index) => (
        <TypeTab
          key={index}
          typeToDisplay={openedType}
          tabIndex={index}
          addNewTypeToDisplay={addNewTypeToDisplay}
        />
      ))}
    </div>
  );
}
