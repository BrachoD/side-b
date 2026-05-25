import { useNavigate, useLocation } from "react-router-dom";

function MobileNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { label: "Home", path: "/" },
        { label: "Search", path: "/search" },
        { label: "Profile", path: "/profile" },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-base border-t border-white/10 flex justify-around items-center py-2 md:hidden z-50">
            {items.map((item) => {
                const isActive = item.path === "/profile"
                    ? location.pathname.startsWith("/profile")
                    : location.pathname === item.path;

                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`
                            flex flex-col items-center justify-center
                            text-xs
                            transition-all duration-200
                            ${isActive ? "text-accent" : "text-gray-400"}
                            `}
                    >
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default MobileNav;