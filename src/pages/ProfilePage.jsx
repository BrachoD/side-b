import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";


import { useCurrentUser } from "../hooks/useCurrentUser";
import { useUser } from "../hooks/useUser";
import { useFollow } from "../hooks/useFollow";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { getReviewsByUser } from "../services/reviewService";
import { getLikesByReviews } from "../services/likeService";
import { getUserByUsername, updateUserProfile } from "../services/userService";
import { getFollowers, getFollowing } from "../services/followService";

import ReviewList from "../components/review/ReviewList";
import { getAvatar } from "../utils/getAvatar";

function ProfilePage() {
    const { username } = useParams();
    const { data: user } = useCurrentUser();

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState("");


    const { data: userByUsername } = useQuery({
        queryKey: ["userByUsername", username],
        queryFn: () => getUserByUsername(username),
        enabled: !!username,
    });

    const userId = username
        ? userByUsername?.userId
        : user?.$id;

    const { data: userProfile } = useUser(userId);

    const profile = username ? userByUsername : userProfile;

    const isMe = user?.$id === profile?.userId;

    const { isFollowing, toggleFollow, isLoading } = useFollow(
        user?.$id,
        profile?.userId
    );

    const { data: followersData } = useQuery({
        queryKey: ["followers", profile?.userId],
        queryFn: () => getFollowers(profile.userId),
        enabled: !!profile?.userId,
    });

    const { data: followingData } = useQuery({
        queryKey: ["following", profile?.userId],
        queryFn: () => getFollowing(profile.userId),
        enabled: !!profile?.userId,
    });

    const followersCount = followersData?.length || 0;
    const followingCount = followingData?.length || 0;

    const { data: reviewsData } = useQuery({
        queryKey: ["reviewsByUser", userId],
        queryFn: () => getReviewsByUser(userId),
        enabled: !!userId,
    });

    const reviews =
        reviewsData?.documents.map((doc) => ({
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
            date: doc.$createdAt,
        })) || [];

    const reviewIds = reviews.map((r) => r.id);

    const { data: likesData } = useQuery({
        queryKey: ["likesByUserReviews", reviewIds.join(",")],
        queryFn: () => getLikesByReviews(reviewIds),
        enabled: reviewIds.length > 0,
    });

    const totalLikes = likesData?.documents.length || 0;

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: ({ docId, data }) => updateUserProfile(docId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["user", user?.$id]);
            queryClient.invalidateQueries(["userByUsername", username]);
            setIsEditing(false);
        },
    });

    if (username && !userByUsername) return <p>Loading...</p>;
    if (!username && !userProfile) return <p>Loading...</p>;

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <img
                    src={getAvatar(profile)}
                    className="w-16 h-16 rounded-full"
                />

                <div>
                    <h2 className="text-xl font-bold">
                        {profile?.username || profile?.email || "You"}
                    </h2>
                    {isMe && (
                        <button
                            onClick={() => {
                                setIsEditing(true);
                                setNewUsername(profile.username);
                            }}
                            className="text-sm text-gray-400"
                        >
                            Edit Profile
                        </button>
                    )}

                    {reviews.length === 0 ? (
                        <p className="text-gray-400">No reviews yet</p>
                    ) : (<>
                        <p className="text-gray-400">
                            {reviews.length} reviews • {totalLikes} likes
                        </p>
                        <p className="text-gray-400">
                            {followersCount} followers • {followingCount} following
                        </p></>
                    )}
                </div>

                {!isMe && (
                    <button
                        onClick={toggleFollow}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded text-sm font-semibold transition ${isFollowing
                            ? "bg-gray-600 text-white"
                            : "bg-green-400 text-black"
                            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {isLoading
                            ? "Loading..."
                            : isFollowing
                                ? "Following"
                                : "Follow"}
                    </button>
                )}
            </div>

            {isEditing && (
                <div className="space-y-3">

                    <input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="bg-[#141A18] p-2 rounded w-full"
                    />

                    <div className="flex gap-2">

                        <button
                            onClick={() => {
                                updateMutation.mutate({
                                    docId: profile.$id,
                                    data: {
                                        username: newUsername,
                                        avatar: String(Math.random()),
                                    },
                                });
                            }}
                            disabled={updateMutation.isLoading}
                            className={`bg-green-400 text-black px-3 py-1 rounded ${updateMutation.isLoading ? "opacity-50" : ""
                                }`}
                        >
                            {updateMutation.isLoading ? "Saving..." : "Save"}
                        </button>

                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-gray-400"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            )}

            {/* REVIEWS */}
            {reviews.length === 0 ? (
                <div className="text-gray-400">
                    <p>No reviews yet</p>
                    {isMe && (
                        <button
                            onClick={() => navigate("/search")}
                            className="text-green-400 text-sm"
                        >
                            Find something to review
                        </button>
                    )}
                </div>
            ) : (
                <ReviewList reviews={reviews} title="Reviews" />
            )}
        </div>
    );
}

export default ProfilePage;