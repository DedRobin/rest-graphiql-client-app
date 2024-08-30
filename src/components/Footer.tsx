// import { Route } from "@/app/routes";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer flex justify-between sm:px-8 lg:px-12 opacity-60">
      <div className="flex gap-6">
        <Link
          href={"https://github.com/DedRobin"}
          className="text-span font-span leading-span tracking-span  text-mediumGray"
        >
          DedRobin
        </Link>
        <Link
          href={"https://github.com/GBRJo"}
          className="text-span font-span leading-span tracking-span  text-mediumGray"
        >
          GBRJo
        </Link>
        <Link
          href={"https://github.com/Zhybuliou"}
          className="text-span font-span leading-span tracking-span  text-mediumGray"
        >
          Zhybuliou
        </Link>
      </div>
      <span>2024</span>
      <Link
        href={"https://rs.school/"}
        className="text-span font-span leading-span tracking-span  text-mediumGray"
      >
        The Rolling Scopes
      </Link>
    </footer>
  );
}
