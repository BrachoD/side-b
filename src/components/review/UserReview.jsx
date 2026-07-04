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
                    <img
                        src={getAvatar(user)}
                        alt={user?.username}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${user?.username}`);
                        }}
                        className=" w-10 h-10 rounded-full cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105"
                    />
                )}

                <div>
                    <p onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${user?.username}`);
                    }} className="text-sm font-semibold cursor-pointer hover:underline hover:text-white transition-all duration-200">
                        {user?.username || "Loading..."}{" "}
                        <span className="text-accent">(You)</span>
                    </p>
                    <p className="text-xs text-gray-400">
                        {formatDate(review.date)}
                    </p>
                </div>
            </div>

            {/* Rating */}
            <RatingStars rating={review.rating} />

            {/* Review text */}
            <p className="text-sm md:text-base text-gray-300">
                {review.text}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 text-sm">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleLike();
                    }}
                    className={`cursor-pointer transition-all duration-200 active:scale-90
                            ${hasLiked
                            ? "text-accent scale-110"
                            : "text-gray-400 hover:text-accent"
                        }
                    `}
                >
                    👍 {likeCount}
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                    className="text-blue-400 cursor-pointer hover:text-blue-300 transition-all duration-200"
                >
                    Edit
                </button>


                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!confirm("Delete this review?")) return;
                        onDelete();
                    }}
                    disabled={isDeleting}
                    className={`text-red-400 cursor-pointer hover:text-red-300 transition-all duration-200 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div >
    );
}

export default UserReview;