import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-page justify-self-center flex flex-col justify-center items-center gap-2">
      <h2 className="text-5xl">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="border-2 border-white rounded-lg  p-1" href="/">
        Return Home
      </Link>
    </div>
  );
}
