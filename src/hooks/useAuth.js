import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authService";

export const useAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
};
