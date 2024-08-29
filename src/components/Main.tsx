import { PropsWithChildren } from "react";

export function Main({ children }: PropsWithChildren) {
  return (
    <main className="grid grid-cols-8 gap-6 items-center justify-center min-h-[calc(100vh-96px)] px-12">
      {children}
    </main>
  );
}
