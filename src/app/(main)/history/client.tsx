"use client";

import { Route } from "@/app/routes";
import Link from "next/link";
import { LocalStorage } from "./constants";
import { useLocalStorage } from "@/hooks/localStorageHook";

export default function History() {
  const historyRequests = useLocalStorage(LocalStorage.Requests);

  return (
    <div className="history flex flex-col justify-center gap-3">
      {historyRequests ? (
        <div className="history-requests">Here must be some requests</div>
      ) : (
        <>
          <div className="histoty-empty text-5xl">
            {"You haven't executed any requests yet"}
          </div>
          <div className="history-link flex justify-around text-3xl hover:*:text-lime-500">
            <Link className="history-link-rest" href={Route.RESTfull}>
              REST Client
            </Link>
            <Link className="history-link-graphql" href={Route.GraphiQL}>
              GraphQL Client
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
