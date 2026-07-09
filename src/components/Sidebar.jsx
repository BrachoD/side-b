import { NavLink } from "react-router-dom";
import LogoutButton from "./ui/LogoutButton";

function Sidebar() {
    return (
        <aside className="h-screen sticky top-0 w-64 bg-surface p-6 flex flex-col border-r border-white/5">
            <div className="flex flex-col h-full">
                <h1 className="text-2xl font-bold tracking-tight mb-10">Side B</h1>

                <nav className="space-y-2">
                    <NavLink to="/" className={({ isActive }) =>
                        `block rounded-lg px-4 py-2 transition-all duration-200
        ${isActive
                            ? "bg-surfaceHover text-accent font-semibold"
                            : "hover:bg-surfaceHover hover:text-accent"
                        }`
                    }>
                        Home
                    </NavLink>
                    <NavLink to="/explore" className={({ isActive }) =>
                        `block rounded-lg px-4 py-2 transition-all duration-200
        ${isActive
                            ? "bg-surfaceHover text-accent font-semibold"
                            : "hover:bg-surfaceHover hover:text-accent"
                        }`
                    }>
                        Explore
                    </NavLink>
                    <NavLink to="/search" className={({ isActive }) =>
                        `block rounded-lg px-4 py-2 transition-all duration-200
        ${isActive
                            ? "bg-surfaceHover text-accent font-semibold"
                            : "hover:bg-surfaceHover hover:text-accent"
                        }`
                    }>
                        Search
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) =>
                        `block rounded-lg px-4 py-2 transition-all duration-200
        ${isActive
                            ? "bg-surfaceHover text-accent font-semibold"
                            : "hover:bg-surfaceHover hover:text-accent"
                        }`
                    }>
                        Profile
                    </NavLink>
                </nav>
                <div className="mt-6">
                    <button className="w-full bg-accent text-black font-semibold py-2.5 rounded-lg transition-all duration-200 hover:brightness-110 active:scale-95 ">
                        New Review
                    </button>
                </div>
            </div>


            <div className="mt-auto pt-8 border-t border-white/5">
                <LogoutButton />
            </div>
        </aside>
    );
}

export default Sidebar;