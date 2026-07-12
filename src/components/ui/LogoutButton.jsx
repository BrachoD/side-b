import toast from "react-hot-toast";
import { logout } from "../../services/authService";
import { useQueryClient } from "@tanstack/react-query";

function LogoutButton() {
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try {
            await logout();

            queryClient.clear();

            window.location.reload();
        } catch (err) {
            toast.error(err.message || "Failed to log out.");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="
            text-sm
            text-red-400
            transition-colors
            duration-200
            hover:text-red-300
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-400
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#0B0F0E]
            rounded
            "
        >
            Logout
        </button>
    );
}

export default LogoutButton;