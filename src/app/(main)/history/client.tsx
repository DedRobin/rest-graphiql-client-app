"use client";

import { Route } from "@/app/routes";
import Link from "next/link";
import { LocalStorage } from "./constants";
import { useLocalStorage } from "@/hooks/localStorageHook";

export default function History() {
  const [historyData] = useLocalStorage(LocalStorage.Requests);

  return (
    <div className="history flex flex-col justify-center gap-3">
      {historyData ? (
        <div className="history-requests">Here must be some requests</div>
      ) : (
        <>
          <div className="histoty-empty text-center text-5xl">
            <p>{"You haven't executed any requests yet"}</p>
            <p>{"It's empty here."}</p>
            <p>{"Try those options:"}</p>
          </div>

          <div className="history-link flex justify-around text-3xl m-10 *:border-2 *:rounded *:p-2 hover:*:text-lime-500 hover:*:border-lime-400">
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
