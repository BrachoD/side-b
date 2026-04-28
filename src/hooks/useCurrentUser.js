import { useQuery } from "@tanstack/react-query";
import { account } from "../services/appwrite";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        return await account.get();
      } catch (err) {
        if (err.code === 401) {
          return null; // 🔥 evita crash
        }
        throw err;
      }
    },
  });
}
