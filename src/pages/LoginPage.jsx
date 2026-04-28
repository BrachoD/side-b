import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/authService";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: () => {
            queryClient.invalidateQueries(["authUser"]);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f1412] text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-[#141A18] p-8 rounded-xl w-full max-w-md space-y-6 shadow-lg"
            >
                <h1 className="text-2xl font-semibold text-center">Side B</h1>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email</label>
                    <input
                        className="w-full p-3 rounded-md bg-[#1A221F] outline-none focus:ring-2 focus:ring-green-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Password</label>
                    <input
                        type="password"
                        className="w-full p-3 rounded-md bg-[#1A221F] outline-none focus:ring-2 focus:ring-green-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {mutation.isError && (
                    <p className="text-red-400 text-sm text-center">
                        Invalid credentials
                    </p>
                )}

                <button
                    type="submit"
                    disabled={mutation.isLoading}
                    className="w-full bg-green-400 text-black py-3 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                    {mutation.isLoading ? "Loading..." : "Login"}
                </button>

                <p className="text-sm text-gray-400 text-center">
                    Don’t have an account?{" "}
                    <span onClick={() => navigate("/signup")}
                        className="text-green-400 cursor-pointer">
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
}