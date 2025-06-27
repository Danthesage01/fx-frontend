export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
