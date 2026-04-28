import { logout } from "../../services/authService";
import { useQueryClient } from "@tanstack/react-query";

function LogoutButton() {
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        await logout();

        queryClient.clear();

        window.location.reload();
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300"
        >
            Logout
        </button>
    );
}

export default LogoutButton;