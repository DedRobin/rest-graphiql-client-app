import { PropsWithChildren } from "react";

export function Main({ children }: PropsWithChildren) {
  return (
    <main className=" px-8 relative grid grid-cols-8 gap-6 items-center justify-center h-[calc(100vh-96px)] max-w-[1520px] sm:px-8 lg:px-12">
      {children}
    </main>
  );
}
