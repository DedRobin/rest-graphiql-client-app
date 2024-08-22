import { ReactNode } from "react";

type TMainProps = {
  children: ReactNode;
};

export default function Main({ children }: TMainProps) {
  return (
    <main className="main flex justify-center items-center">{children}</main>
  );
}
