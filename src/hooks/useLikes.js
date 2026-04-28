import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLikes,
  getUserLike,
  likeReview,
  unlikeReview,
} from "../services/likeService";
import { useCurrentUser } from "./useCurrentUser";

export function useLikes(reviewId) {
  const { data: user } = useCurrentUser();
  const userId = user?.$id;

  const queryClient = useQueryClient();

  //total likes
  const { data: likesData } = useQuery({
    queryKey: ["likes", reviewId],
    queryFn: () => getLikes(reviewId),
    enabled: !!reviewId,
  });

  //user like
  const { data: userLike } = useQuery({
    queryKey: ["userLike", reviewId],
    queryFn: () => getUserLike(reviewId, userId),
    enabled: !!reviewId && !!userId,
  });

  const likeCount = likesData?.documents.length || 0;
  const hasLiked = !!userLike;

  //mutation
  const mutation = useMutation({
    mutationFn: async () => {
      if (!reviewId) return;

      if (userLike) {
        return unlikeReview(userLike.$id);
      } else {
        return likeReview({ reviewId, userId });
      }
    },

    onMutate: async () => {
      await queryClient.cancelQueries(["likes", reviewId]);
      await queryClient.cancelQueries(["userLike", reviewId]);

      const previousLikes = queryClient.getQueryData(["likes", reviewId]);
      const previousUserLike = queryClient.getQueryData(["userLike", reviewId]);

      queryClient.setQueryData(["likes", reviewId], (old) => {
        const current = old?.documents || [];

        if (previousUserLike) {
          return { documents: current.slice(0, -1) };
        } else {
          return {
            documents: [...current, { $id: "temp", reviewId, userId }],
          };
        }
      });

      queryClient.setQueryData(
        ["userLike", reviewId],
        previousUserLike ? null : { $id: "temp" },
      );

      return { previousLikes, previousUserLike };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(["likes", reviewId], context.previousLikes);
      queryClient.setQueryData(
        ["userLike", reviewId],
        context.previousUserLike,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries(["likes", reviewId]);
      queryClient.invalidateQueries(["userLike", reviewId]);
    },
  });

  return {
    likeCount,
    hasLiked,
    toggleLike: mutation.mutate,
  };
}
