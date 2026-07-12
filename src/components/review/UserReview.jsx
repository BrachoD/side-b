import RatingStars from "../ui/RatingStars";
import { useLikes } from "../../hooks/useLikes";
import { useUser } from "../../hooks/useUser";
import { getAvatar } from "../../utils/getAvatar";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

function UserReview({ review, onDelete, onEdit, isDeleting }) {
    const navigate = useNavigate();

    const { data: user, isLoading } = useUser(review?.userId);

    const { likeCount, hasLiked, toggleLike } = useLikes(review?.id);

    if (!review) return null;

    return (
        <div className="bg-surface rounded-xl p-4 space-y-3 md:space-y-4 border border-accent/30 transition-all ease-out hover:shadow-lg hover:shadow-black/20 animate-in fade-in duration-300">

            {/* Header */}
            <div className="flex items-center gap-3">
                {isLoading ? (
                    <div className="w-10 h-10 rounded-full bg-surfaceHover animate-pulse" />
                ) : (
                    <button
                        onClick={() => navigate(`/profile/${user?.username}`)}
                        aria-label={`View ${user?.username}'s profile`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F0E] rounded-full"
                    >
                        <img
                            src={getAvatar(user)}
                            alt={`${user?.username}'s avatar`}
                            loading="lazy"
                            className="w-10 h-10 rounded-full transition-all duration-200 hover:opacity-80 hover:scale-105"
                        />
                    </button>
                )}

                <div>
                    <button
                        onClick={() => navigate(`/profile/${user?.username}`)}
                        aria-label={`View ${user?.username}'s profile`}
                        className="text-sm font-semibold hover:underline hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:underline"
                    >
                        {user?.username || "Loading..."}{" "}
                        <span className="text-accent">(You)</span>
                    </button>

                    <p className="text-xs text-gray-400">
                        {formatDate(review.date)}
                    </p>
                </div>
            </div>

            {/* Rating */}
            <RatingStars rating={review.rating} />

            {/* Review text */}
            <p className="text-sm md:text-base text-gray-300 leading-6">
                {review.text}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 text-sm">

                <button
                    onClick={toggleLike}
                    aria-label={
                        hasLiked
                            ? "Remove like from review"
                            : "Like review"
                    }
                    className={`
                        cursor-pointer
                        transition-all
                        duration-200
                        active:scale-90
                        ${hasLiked
                            ? "text-accent scale-110"
                            : "text-gray-400 hover:text-accent"
                        }
                    `}
                >
                    👍 {likeCount}
                </button>

                <button
                    onClick={onEdit}
                    aria-label="Edit review"
                    className="text-blue-400 hover:text-blue-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                >
                    Edit
                </button>

                <button
                    onClick={() => {
                        if (!confirm("Delete this review?")) return;
                        onDelete();
                    }}
                    disabled={isDeleting}
                    aria-label="Delete review"
                    className={`
                        text-red-400
                        hover:text-red-300
                        transition-all
                        duration-200
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-red-400
                        rounded
                        ${isDeleting
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }
                    `}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>

            </div>
        </div>
    );
}

export default UserReview;