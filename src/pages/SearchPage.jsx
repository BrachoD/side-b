import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { searchAlbums } from "../services/musicApi";
import { searchUsers } from "../services/userService";

import { getAvatar } from "../utils/getAvatar";

import AlbumCard from "../components/album/AlbumCard";

function SearchPage() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    const { data, isLoading } = useQuery({
        queryKey: ["albums", debouncedQuery],
        queryFn: () => searchAlbums(debouncedQuery),
        enabled: debouncedQuery.length > 1,
    });

    const navigate = useNavigate();

    const { data: usersData, isLoading: usersLoading } = useQuery({
        queryKey: ["users", debouncedQuery],
        queryFn: () => searchUsers(debouncedQuery),
        enabled: debouncedQuery.length > 1,
    });

    return (
        <div className="space-y-6">

            <input
                type="text"
                placeholder="Search albums, artist, users..."
                className="w-full p-3 rounded bg-[#141A18]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {query.length <= 1 ? (
                <p className="text-gray-400">Start typing to search</p>
            ) : (isLoading || usersLoading) ? (
                <p className="text-gray-400">Searching...</p>
            ) : null}

            {query.length > 1 && !isLoading && !usersLoading &&
                !data?.length && !usersData?.documents?.length && (
                    <p className="text-gray-400">No results</p>
                )}

            {/* USERS */}
            {usersData?.documents?.length > 0 && (
                <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Users</p>

                    {usersData.documents.slice(0, 5).map((user) => (
                        <div
                            key={user.$id}
                            onClick={() => navigate(`/profile/${user.username}`)}
                            className="flex items-center gap-3 p-2 hover:bg-[#1A221F] rounded cursor-pointer transition"
                        >
                            <img
                                src={getAvatar(user)}
                                className="w-8 h-8 rounded-full"
                            />
                            <p>{user.username}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* ALBUMS */}
            {data?.length > 0 && (
                <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Albums</p>

                    <div className="grid grid-cols-3 gap-4">
                        {data.slice(0, 6).map((album) => (
                            <AlbumCard
                                key={album.id}
                                album={{
                                    id: album.id,
                                    title: album.title,
                                    artist: album["artist-credit"]?.[0]?.name,
                                    cover: `https://coverartarchive.org/release/${album.id}/front`,
                                    review: "",
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

export default SearchPage;
