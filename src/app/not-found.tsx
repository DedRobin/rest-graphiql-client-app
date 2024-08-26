import Link from "next/link";
import { Route } from "./routes";

export default function NotFound() {
  return (
    <div className="error-page w-screen h-screen justify-self-center flex flex-col justify-center items-center gap-2">
      <h2 className="text-5xl">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="border-2 border-white rounded-lg p-1" href={Route.Main}>
        Return Home
      </Link>
    </div>
  );
}
