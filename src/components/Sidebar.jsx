import { Link } from "react-router-dom";
import LogoutButton from "./ui/LogoutButton";

function Sidebar() {
    return (
        <aside className="w-64 bg-[#0F1513] p-6 flex flex-col justify-between">
            <div>
                <h1 className="text-xl font-bold mb-8">🎵 Side B</h1>

                <nav className="space-y-4">
                    <Link to="/" className="block hover:text-green-400">
                        Home
                    </Link>
                    <Link to="/explore" className="block hover:text-green-400">
                        Explore
                    </Link>
                    <Link to="/search" className="block hover:text-green-400">
                        Search
                    </Link>
                    <Link to="/profile" className="block hover:text-green-400">
                        Profile
                    </Link>
                </nav>
            </div>

            <div>
                <button className="w-full bg-green-500 text-black py-2 rounded active:scale-95 hover:brightness-110">
                    New Review
                </button>
            </div>
            <LogoutButton />
        </aside>
    );
}

export default Sidebar;