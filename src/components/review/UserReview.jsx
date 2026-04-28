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
        <div className="bg-[#141A18] rounded-xl p-4 space-y-4 border border-green-500/30">

            {/* Header */}
            <div className="flex items-center gap-3">
                {isLoading ? (
                    <div className="w-10 h-10 rounded-full bg-[#1A221F]" />
                ) : (
                    <img
                        src={getAvatar(user)}
                        alt={user?.username}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${user?.username}`);
                        }}
                        className="w-10 h-10 rounded-full cursor-pointer"
                    />
                )}

                <div>
                    <p onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${user?.username}`);
                    }} className="text-sm font-semibold cursor-pointer hover:underline">
                        {user?.username || "Loading..."}{" "}
                        <span className="text-green-400">(You)</span>
                    </p>
                    <p className="text-xs text-gray-400">
                        {formatDate(review.date)}
                    </p>
                </div>
            </div>

            {/* Rating */}
            <RatingStars rating={review.rating} />

            {/* Review text */}
            <p className="text-sm text-gray-300">
                {review.text}
            </p>

            {/* Actions */}
            <div className="flex gap-4 text-sm">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleLike();
                    }}
                    className={`cursor-pointer transition transform ${hasLiked
                        ? "text-green-400 scale-110"
                        : "text-gray-400 hover:text-green-400"
                        }`}
                >
                    👍 {likeCount}
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                    className="text-blue-400 hover:underline hover:text-blue-300 transition"
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
                    className={`text-red-400 hover:text-red-300 cursor-pointer hover:underline transition ${isDeleting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div >
    );
}

export default UserReview;