import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav flex">
      <ul className="nav-links flex items-center gap-2">
        <li className="nav-link-item">
          <Link
            className={`hover:text-lime-500 ${pathname === "/" ? "text-lime-500 underline" : ""}`}
            href="/"
          >
            Main
          </Link>
        </li>
        <li className="nav-link-item">
          <Link
            className="hover:text-lime-500 pointer-events-none"
            href="/graphiql"
          >
            GraphQL
          </Link>
        </li>
        <li className="nav-link-item">
          <Link
            className="hover:text-lime-500 pointer-events-none"
            href="/restfull"
          >
            RESTfull
          </Link>
        </li>
      </ul>
    </nav>
  );
}
