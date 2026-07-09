import Card from "../ui/Card";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { getFollowingIds } from "../../services/followService";
import { getSuggestedUsers } from "../../services/userService";
import { getAvatar } from "../../utils/getAvatar";

function SuggestedUsersCard() {

    const { data: user } = useCurrentUser();

    const navigate = useNavigate();

    const { data: followingIds } = useQuery({
        queryKey: ["followingIds", user?.$id],
        queryFn: () => getFollowingIds(user.$id),
        enabled: !!user?.$id,
    });

    const { data: suggestedUsers, isLoading } = useQuery({
        queryKey: ["suggestedUsers", user?.$id, followingIds],
        queryFn: () => getSuggestedUsers(user.$id, followingIds || []),
        enabled: !!user?.$id && !!followingIds,
    });

    if (isLoading) {
        return (
            <Card>
                <h2 className="text-sm font-semibold mb-4">
                    Suggested Users
                </h2>

                <div className="space-y-3">
                    <div className="h-10 bg-surfaceHover rounded animate-pulse" />
                    <div className="h-10 bg-surfaceHover rounded animate-pulse" />
                    <div className="h-10 bg-surfaceHover rounded animate-pulse" />
                </div>
            </Card>
        );
    }

    return (
        <Card>

            <h2 className="text-sm font-semibold mb-4">
                Suggested Users
            </h2>

            <div className="space-y-4">

                {suggestedUsers?.slice(0, 3).map((u) => (
                    <div
                        key={u.$id}
                        className="flex items-center justify-between"
                    >
                        <div
                            onClick={() => navigate(`/profile/${u.username}`)}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <img
                                src={getAvatar(u)}
                                alt={u.username}
                                className="w-10 h-10 rounded-full transition-transform duration-200 hover:scale-105"
                            />

                            <div>
                                <p className="text-sm font-medium hover:text-accent transition-colors">
                                    {u.username}
                                </p>
                            </div>
                        </div>

                        <button
                            className="text-xs px-3 py-1 rounded-md bg-surfaceHover hover:bg-accent hover:text-black transition-colors duration-200"
                        >
                            Follow
                        </button>
                    </div>
                ))}

                {suggestedUsers?.length === 0 && (
                    <p className="text-sm text-gray-400">
                        No suggestions right now.
                    </p>
                )}

            </div>

        </Card>
    );
}

export default SuggestedUsersCard;