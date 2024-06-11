import Header from "./_components/layout/Header/Header";

export default function HeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="h-screen w-screen">{children}</main>
    </div>
  );
}
