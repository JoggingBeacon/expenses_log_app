import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <div className="p-4 bg-cyan-300 ">
      {/* header */}
      <div className="max-w-[720px] mx-auto">
        <header className="mb-4">
          <p className="text-2xl font-bold">Catatan Uang Belanja</p>
        </header>
        {/* Main */}
        <main className="rounded-lg shadow-md bg-slate-100 shadow-purple-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
