import { TMockHistoryData } from "@/app/(main)/history/__mocks__/mockHistoryData";
import { Route } from "@/app/routes";
import Link from "next/link";

export function HistoryData({
  historyData,
}: {
  historyData: TMockHistoryData;
}) {
  return (
    <>
      <h1 className="text-5xl">History Requests</h1>
      <div className="history-requests flex flex-col justify-center gap-3 hover:*:text-lime-500 hover:*:border-lime-500">
        {historyData.map((request, index) => (
          <Link
            href={
              ["GET", "POST"].includes(request.method)
                ? Route.RESTfull
                : Route.GraphiQL
            }
            key={index}
            className="request"
          >
            <div
              key={index}
              className="request-row grid grid-cols-4 *:border-2"
            >
              <div className="request-method">{request.method}</div>
              <div className="request-url col-span-3">
                {JSON.stringify(request.url)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
