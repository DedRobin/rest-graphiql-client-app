export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="main flex justify-center items-center">{children}</main>
  );
}
