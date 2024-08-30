import { PropsWithChildren } from "react";

export function Main({ children }: PropsWithChildren) {
  return (
    <main className="relative grid grid-cols-8 gap-6 items-center justify-center min-h-[calc(100vh-96px)] sm:px-8 lg:px-12">
      {children}
      <div className="absolute inset-x-0 bottom-0 h-[36px] bg-gradient-to-t from-black via-transparent to-transparent" />
    </main>
  );
}
