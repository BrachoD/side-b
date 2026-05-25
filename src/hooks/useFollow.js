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
      toast.success("Following user");
      queryClient.invalidateQueries(["follow", currentUserId, targetUserId]);
    },
    onError: () => {
      toast.success("Error following user");
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(followDoc.$id),
    onSuccess: () => {
      toast.success("Unfollowed user");
      queryClient.invalidateQueries(["follow", currentUserId, targetUserId]);
    },
    onError: () => {
      toast.success("Error unfollowing user");
    },
  });

  const isFollowing = !!followDoc;

  const toggleFollow = () => {
    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return {
    isFollowing,
    toggleFollow,
    isLoading: followMutation.isLoading || unfollowMutation.isLoading,
  };
};
