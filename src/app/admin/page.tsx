import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">대시보드</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/rooms" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">회의실 관리 &rarr;</h3>
          <p className="text-gray-600">회의실을 추가하거나 삭제합니다.</p>
        </Link>
        <div className="p-6 bg-white rounded-lg shadow opacity-50 cursor-not-allowed">
          <h3 className="text-xl font-semibold mb-2 text-gray-400">예약 전체 관리 (예정) &rarr;</h3>
          <p className="text-gray-400">모든 예약을 조회하고 강제 취소합니다.</p>
        </div>
      </div>
    </div>
  );
}
