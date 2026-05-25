import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";
import MobileNav from "../components/MobileNav";

function MainLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#0B0F0E] text-white">

            {/* Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main */}
            <main className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 md:px-6 pb-16 md:pb-6">
                {children}
            </main>

            {/* Right panel */}
            <div className="hidden lg:block">
                <RightPanel />
            </div>

            <MobileNav />

        </div>
    );
}

export default MainLayout;