export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">관리자 페이지</h1>
        <a href="/" className="text-sm text-blue-600 hover:underline">
          메인으로 돌아가기
        </a>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
