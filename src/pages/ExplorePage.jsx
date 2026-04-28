import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../services/reviewService";

import ReviewList from "../components/review/ReviewList";

function ExplorePage() {
    const { data, isLoading } = useQuery({
        queryKey: ["explore"],
        queryFn: getFeed,
    });

    if (isLoading) return <p>Loading...</p>;

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
            date: doc.$createdAt,
        })) || [];

    return (
        <div className="space-y-4">
            <ReviewList reviews={reviews} title="Explore" />
        </div>
    );
}

export default ExplorePage;