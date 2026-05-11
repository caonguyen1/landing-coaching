import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { Toaster } from "sonner";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-100">
      <Header />

      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-auto h-[calc(100lvh-64px)]">
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster
          position="top-right"
          richColors
          closeButton
        />
    </div>
  );
}