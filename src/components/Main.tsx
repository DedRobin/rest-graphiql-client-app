import { PropsWithChildren } from "react";

export function Main({ children }: PropsWithChildren) {
  return (
    <main className="main flex justify-center items-center grow">
      {children}
    </main>
  );
}
