import { Route } from "@/app/routes";
import Link from "next/link";
import { Tag } from "../UI/tags/Tag";

function keyValue(key: string, value: unknown) {
  return (
    <div className="flex flex-row gap-1" key={key}>
      <h5 className="text-mediumGray">{key}:</h5>
      {typeof value === "object" && value !== null ? (
        <h5 className="truncate">
          <pre>{JSON.stringify(value, null, 1)}</pre>
        </h5>
      ) : (
        <h5>{String(value)}</h5>
      )}
    </div>
  );
}

export function DataItem({ item }: { item: { [key: string]: unknown } }) {
  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-1 flex justify-end items-start">
        <Tag>{item.method as string}</Tag>
      </div>
      <div className="col-start-2 col-span-5 flex flex-col gap-2">
        <Link
          href={
            ["GET", "POST"].includes(item.method as string)
              ? Route.Get
              : Route.GraphQL
          }
        >
          <h4 className="mb-3 truncate">{item.url as string}</h4>
        </Link>
        {Object.entries(item).map(([key, value]) => {
          if (key === "method" || key === "url") return null;
          return keyValue(key, value);
        })}
      </div>
    </div>
  );
}
