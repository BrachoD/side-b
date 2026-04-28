import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserByUsername, createUserProfile } from "../services/userService";
import { signup, login, getCurrentUser } from "../services/authService";
import { account } from "../services/appwrite";
import toast from "react-hot-toast";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async () => {

            const existing = await getUserByUsername(username);

            if (existing) {
                throw new Error("Username already taken");
            }

            await signup(email, password);

            await login(email, password);

            const user = await getCurrentUser();

            await createUserProfile({
                userId: user.$id,
                username,
                email: user.email,
            });

            await account.updateName(username);
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["authUser"]);
        },

        onError: (err) => {
            console.log(err)
            toast.error(err.message);
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
                <h1 className="text-2xl font-semibold text-center">Create account</h1>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400">Username</label>
                    <input
                        className="w-full p-3 rounded-md bg-[#1A221F]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

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

                <button
                    type="submit"
                    disabled={mutation.isLoading}
                    className="w-full bg-green-400 text-black py-3 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                    {mutation.isLoading ? "Creating..." : "Sign up"}
                </button>

                <p className="text-sm text-gray-400 text-center">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-green-400 cursor-pointer">
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}