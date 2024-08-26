import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { Main } from "@/components/Main";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
