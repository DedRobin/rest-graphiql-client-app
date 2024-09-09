import { Route } from "@/app/routes";
import Link from "next/link";

export function DataItem({ item }: { item: { [key: string]: string } }) {
  return (
    <Link
      href={["GET", "POST"].includes(item.method) ? Route.Get : Route.GraphQL}
      className="request"
    >
      <div className="request-row grid grid-cols-4 *:border-2">
        <div className="request-method">{item.method}</div>
        <div className="request-url col-span-3">{JSON.stringify(item.url)}</div>
      </div>
    </Link>
  );
}
