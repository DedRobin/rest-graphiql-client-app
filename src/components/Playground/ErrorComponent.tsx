import { useLocale } from "@/services/locale/contex";
import React from "react";
import errorData from "@/services/locale/lang.json";

interface ErrorMessages {
  [key: string]: {
    en: string;
    ru: string;
  };
}

interface ErrorComponentProps {
  errorCode: string;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorCode,
}) => {
  const { language } = useLocale();

  const messages = errorData.errors as ErrorMessages;

  const errorMessage =
    messages[errorCode]?.[language] ||
    messages["default"]?.[language] ||
    "An unknown error occurred. Please try again.";

  return (
    <div className="text-red text-span font-span leading-span tracking-span -mt-0.5 ml-1 max-w-[440px]">
      {errorMessage}
    </div>
  );
};
