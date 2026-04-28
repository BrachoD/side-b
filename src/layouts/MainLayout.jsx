import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";

function MainLayout({ children }) {
    return (
        <div className="flex h-screen bg-[#0B0F0E] text-white">
            <Sidebar />

            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>

            <RightPanel />
        </div>
    );
}

export default MainLayout;