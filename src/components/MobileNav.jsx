import { NavLink, useLocation } from "react-router-dom";

function MobileNav() {

    const location = useLocation();

    const items = [
        {
            label: "Home",
            path: "/",
            isActive: (pathname) => pathname === "/",
        },
        {
            label: "Search",
            path: "/search",
            isActive: (pathname) => pathname === "/search",
        },
        {
            label: "Profile",
            path: "/profile",
            isActive: (pathname) => pathname === "/profile",
        },
    ];

    return (
        <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 w-full bg-surface border-t border-white/10 flex justify-around items-center py-2 md:hidden z-50">
            {items.map((item) => {
                const isActive = item.isActive(location.pathname);

                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        aria-current={isActive ? "page" : undefined}
                        className={`
                            flex flex-col items-center justify-center
                            text-xs
                            transition-all duration-200
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-accent
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-[#0B0F0E]
                            rounded-md
                            ${isActive ? "text-accent" : "text-gray-400"}
                        `}
                    >
                        <span>{item.label}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
}

export default MobileNav;