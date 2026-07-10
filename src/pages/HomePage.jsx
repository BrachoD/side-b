import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getFeedByFollowing } from "../services/reviewService";
import { getFollowingIds } from "../services/followService";
import { getSuggestedUsers } from "../services/userService";

import { useCurrentUser } from "../hooks/useCurrentUser";

import ReviewCard from "../components/review/ReviewCard";
import ReviewCardSkeleton from "../components/skeletons/ReviewCardSkeleton";

import { getAvatar } from "../utils/getAvatar";


function HomePage() {

    const { data: user } = useCurrentUser();

    const navigate = useNavigate();

    const { data: followingIds } = useQuery({
        queryKey: ["followingIds", user?.$id],
        queryFn: () => getFollowingIds(user.$id),
        enabled: !!user?.$id,
    });

    const { data: suggestedUsers } = useQuery({
        queryKey: ["suggestedUsers", user?.$id, followingIds],
        queryFn: () => getSuggestedUsers(user.$id, followingIds || []),
        enabled: !!user?.$id && !!followingIds,
    });

    const { data, isLoading } = useQuery({
        queryKey: ["feed", followingIds],
        // queryFn: () => getFeedByFollowing(followingIds),
        queryFn: async () => {
            await new Promise((res) => setTimeout(res, 1500)); // 1.5s delay, borrar y uncomment comment above
            return getFeedByFollowing(followingIds);
        },
        enabled: !!followingIds,
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <ReviewCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!followingIds?.length) {
        return (
            <div className="space-y-4">

                <p className="text-gray-400">
                    Follow people to see their reviews 🎧
                </p>
                <p className="text-sm text-gray-400">Suggested users</p>
                {suggestedUsers?.slice(0, 5).map((u) => (
                    <div
                        key={u.$id}
                        onClick={() => navigate(`/profile/${u.username}`)}
                        className="flex items-center gap-3 p-2 hover:bg-[#1A221F] rounded cursor-pointer"
                    >
                        <img
                            src={getAvatar(u)}
                            className="w-8 h-8 rounded-full"
                        />
                        <p>{u.username}</p>
                    </div>
                ))}
            </div>
        );
    }


    const reviews =
        data?.documents.map((doc) => ({
            id: doc.$id,
            userId: doc.userId,
            album: {
                id: doc.albumId,
                title: doc.albumTitle,
                artist: doc.albumArtist,
                cover: doc.albumCover,
            },
            rating: doc.rating,
            text: doc.text,
            likes: 0,
            dislikes: 0,
            date: doc.$createdAt,
        })) || [];

    return (
        <div className="space-y-4">

            {/* FEED */}
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} compact />
            ))}

            {/* SEPARADOR */}
            {suggestedUsers?.length > 0 && (
                <div className="border-t border-white/10 pt-4 space-y-2">

                    <p className="text-sm text-gray-400">Suggested users</p>

                    {suggestedUsers.slice(0, 3).map((u) => (
                        <div
                            key={u.$id}
                            onClick={() => navigate(`/profile/${u.username}`)}
                            className="flex items-center gap-3 p-2 hover:bg-[#1A221F] rounded cursor-pointer"
                        >
                            <img
                                src={getAvatar(u)}
                                className="w-8 h-8 rounded-full cursor-pointer transition-all duration-200 hover:opacity-80"
                            />
                            <p className="text-sm font-semibold cursor-pointer hover:underline hover:text-white transition-all duration-200">{u.username}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;
