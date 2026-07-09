import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";

import { getFeaturedAlbum } from "../../services/featuredService";

function AlbumOfTheDayCard() {

    const navigate = useNavigate();

    const { data: album, isLoading } = useQuery({
        queryKey: ["featuredAlbum"],
        queryFn: getFeaturedAlbum,
    });

    if (isLoading) {
        return (
            <Card>
                <h2 className="text-sm font-semibold mb-4">
                    Album of the Day
                </h2>

                <div className="space-y-3 animate-pulse">

                    <div className="aspect-square rounded-lg bg-surfaceHover" />

                    <div className="h-4 rounded bg-surfaceHover" />

                    <div className="h-3 w-2/3 rounded bg-surfaceHover" />

                </div>
            </Card>
        );
    }

    if (!album) {
        return (
            <Card>
                <h2 className="text-sm font-semibold">
                    Album of the Day
                </h2>

                <p className="mt-3 text-sm text-gray-400">
                    No featured album yet.
                </p>
            </Card>
        );
    }

    return (
        <Card>

            <h2 className="text-sm font-semibold mb-4">
                Album of the Day
            </h2>

            <div
                onClick={() => navigate(`/album/${album.id}`)}
                className="cursor-pointer group"
            >

                <img
                    src={album.cover}
                    alt={album.title}
                    className="
                    w-full
                    aspect-square
                    rounded-lg
                    object-cover
                    shadow-md
                    transition-transform
                    duration-300
                    group-hover:scale-[1.02]
                "
                />

                <div className="mt-4">

                    <h3 className="font-semibold leading-tight">
                        {album.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                        {album.artist}
                    </p>

                    <p className="mt-3 text-sm text-accent">
                        Explore →
                    </p>

                </div>

            </div>

        </Card>
    );
}

export default AlbumOfTheDayCard;