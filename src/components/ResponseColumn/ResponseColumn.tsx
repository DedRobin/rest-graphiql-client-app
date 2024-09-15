import React from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import { cn } from "@/utils/cn";
import { ErrorComponent } from "../Playground/ErrorComponent";

interface ResponseColumnProps {
  response: {
    status?: number;
    body: string;
    error?: string;
  };
  isLoading: boolean;
}

export function ResponseColumn({ response, isLoading }: ResponseColumnProps) {
  const responseValue =
    (isLoading && "Loading...") || response.body || "No data";
  const error = response.error;
  const errorCode = error?.match(/\d{3}/)?.[0] || "default";

  return (
    <div className="flex flex-col gap-2 overflow-hidden w-full">
      <div className="sticky top-0 z-10">
        <div className="flex justify-between items-center pr-3">
          <h5 className="text-green">Response</h5>
          <div className="flex flex-row gap-1">
            {response.status && (
              <span className="text-mediumGray">Status:</span>
            )}
            <h6
              className={cn("text-mediumGray", {
                "text-darkGreen":
                  response.status !== undefined &&
                  response.status >= 200 &&
                  response.status < 300,
                "text-red":
                  response.status !== undefined &&
                  response.status >= 400 &&
                  response.status < 600,
              })}
            >
              {response.status ?? "No status"}
            </h6>
          </div>
        </div>
      </div>
      <div className="custom-scroll flex-1 overflow-auto pr-2 flex flex-col gap-2">
        <h6 className="mt-1">Body</h6>
        <ReadOnlyEditor value={responseValue} />
        {error && <ErrorComponent errorCode={errorCode} />}
      </div>
    </div>
  );
}
