import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { getAlbum } from "../services/musicApi";
import { createReview, getReviews, deleteReview, updateReview } from "../services/reviewService";

import AlbumHeader from "../components/album/AlbumHeader";
import Tracklist from "../components/album/Tracklist";
import UserReview from "../components/review/UserReview";
import ReviewList from "../components/review/ReviewList";
import ReviewForm from "../components/review/ReviewForm";
import AlbumPageSkeleton from "../components/skeletons/AlbumPageSkeleton";

import { formatDuration } from "../utils/formatDuration";

import { useCurrentUser } from "../hooks/useCurrentUser";

function AlbumPage() {

    const { data: user } = useCurrentUser();

    const { id } = useParams();
    const [showForm, setShowForm] = useState(false);

    const [editingReview, setEditingReview] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ["album", id],
        queryFn: () => getAlbum(id),
        enabled: !!id,
    });

    const { data: reviewsData } = useQuery({
        queryKey: ["reviews", id],
        queryFn: () => getReviews(id),
        enabled: !!id,
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createReview,

        onMutate: async (newReview) => {
            await queryClient.cancelQueries(["feed"]);

            const previousFeed = queryClient.getQueryData(["feed"]);

            queryClient.setQueryData(["feed"], (old) => ({
                documents: [
                    {
                        $id: Math.random().toString(),
                        ...newReview,
                        createdAt: new Date().toISOString(),
                    },
                    ...(old?.documents || []),
                ],
            }));

            return { previousFeed };
        },

        onError: (err, newReview, context) => {
            console.error("CREATE REVIEW ERROR:", err);

            toast.error("Could not post review");

            queryClient.setQueryData(["feed"], context.previousFeed);
        },

        // onSettled: () => {
        //     queryClient.invalidateQueries(["feed"]);
        //     queryClient.invalidateQueries(["reviews", id]);
        // },

        onSuccess: () => {
            toast.success("Review posted 🎵");

            queryClient.invalidateQueries(["feed"]);
            queryClient.invalidateQueries(["reviews", id]);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteReview,

        onSuccess: () => {
            toast.success("Review deleted");

            queryClient.invalidateQueries(["reviews", id]);
            queryClient.invalidateQueries(["feed"]);
        },

        onError: (err) => {
            console.error("DELETE REVIEW ERROR:", err);

            toast.error("Could not delete review");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ reviewId, data }) => updateReview(reviewId, data),

        onSuccess: () => {
            toast.success("Review updated");

            queryClient.invalidateQueries(["reviews", id]);
            queryClient.invalidateQueries(["feed"]);
        },

        onError: (err) => {
            console.error("UPDATE REVIEW ERROR:", err);

            toast.error("Could not update review");
        },
    });

    if (isLoading) {
        return (
            <AlbumPageSkeleton />
        );
    }

    const album = {
        title: data.title,
        artist: data["artist-credit"]?.[0]?.name,
        year: data.date?.split("-")[0],
        cover: `https://coverartarchive.org/release/${id}/front`,
        communityRating: 4,
        userRating: 0,
    };

    const tracks =
        data.media?.[0]?.tracks?.map((track) => ({
            title: track.title,
            duration: formatDuration(track.length),
        })) || [];

    const reviews =
        reviewsData?.documents.map((doc) => ({
            id: doc.$id,
            userId: doc.userId,
            album: album,
            rating: doc.rating,
            text: doc.text,
            likes: 0,
            dislikes: 0,
            date: doc.$createdAt,
        })) || [];

    const myReview = reviews.find(
        (r) => r.userId === user?.$id
    );

    const otherReviews = reviews.filter(
        (r) => r.userId !== user?.$id
    );

    return (
        <div className="space-y-6">

            <AlbumHeader album={album} />

            <Tracklist tracks={tracks} />

            {/* BUTTON */}

            {!myReview && (
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-500 text-black px-4 py-2 rounded"
                >
                    Write Review
                </button>
            )}

            {/* FORM */}
            {showForm && (
                <ReviewForm
                    onSubmit={({ rating, text }) => {

                        if (!user) return;

                        mutation.mutate({
                            userId: user.$id,
                            albumId: id,
                            albumTitle: album.title,
                            albumArtist: album.artist,
                            albumCover: album.cover,
                            rating,
                            text,
                        });


                        setShowForm(false);
                    }}
                />
            )}

            {/* EDITING FORM */}
            {editingReview && (
                <ReviewForm
                    initialData={editingReview}
                    onSubmit={({ rating, text }) => {
                        updateMutation.mutate({
                            reviewId: editingReview.id,
                            data: { rating, text },
                        });

                        setEditingReview(null);
                    }}
                />
            )}


            <UserReview
                review={myReview}
                onDelete={() => deleteMutation.mutate(myReview.id)}
                onEdit={() => setEditingReview(myReview)}
                isDeleting={deleteMutation.isLoading}
            />
            {!myReview && otherReviews.length === 0 && (
                <div className="text-gray-400">
                    <p>No reviews yet</p>
                    <p>Be the first to review this album 🎧</p>
                </div>
            )}
            {otherReviews.length > 0 && (
                <ReviewList reviews={otherReviews} />
            )}
        </div>
    );
}

export default AlbumPage;