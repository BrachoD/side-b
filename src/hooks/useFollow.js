import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser, getFollow } from "../services/followService";
import toast from "react-hot-toast";

export const useFollow = (currentUserId, targetUserId) => {
  const queryClient = useQueryClient();

  const { data: followDoc } = useQuery({
    queryKey: ["follow", currentUserId, targetUserId],
    queryFn: () => getFollow(currentUserId, targetUserId),
    enabled: !!currentUserId && !!targetUserId,
  });

  const followMutation = useMutation({
    mutationFn: () => followUser(currentUserId, targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries(["follow", currentUserId, targetUserId]);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(followDoc.$id),
    onSuccess: () => {
      queryClient.invalidateQueries(["follow", currentUserId, targetUserId]);
    },
  });

  const isFollowing = !!followDoc;

  const toggleFollow = () => {
    if (isFollowing) {
      toast.success("Unfollowed user");
      unfollowMutation.mutate();
    } else {
      toast.success("Following user");
      followMutation.mutate();
    }
  };

  return {
    isFollowing,
    toggleFollow,
    isLoading: followMutation.isLoading || unfollowMutation.isLoading,
  };
};
