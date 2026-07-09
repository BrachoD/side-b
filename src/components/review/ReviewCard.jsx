import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";
import { useLikes } from "../../hooks/useLikes";
import { useUser } from "../../hooks/useUser";
import { formatDate } from "../../utils/formatDate";
import { getAvatar } from "../../utils/getAvatar";

function ReviewCard({ review, compact = false, }) {

    const { data: user, isLoading } = useUser(review.userId);

    const { likeCount, hasLiked, toggleLike } = useLikes(review.id);
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/album/${review.album.id}`)} className="bg-surface rounded-xl p-4 space-y-3 hover:bg-surfaceHover transition-all ease-out active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 animate-in fade-in duration-300">

            {/* Album Info */}
            <div className="flex items-start gap-4">
                <img
                    src={review.album.cover}
                    alt={review.album.title}
                    className="w-16 h-16 rounded-lg shadow-md object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base leading-tight truncate">{review.album.title}</p>
                    <p className="text-xs md:text-sm text-gray-400">{review.album.artist}</p>

                    <RatingStars rating={review.rating} />
                </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Header */}
            <div className="flex items-center gap-3">
                {isLoading ? (
                    <div className="w-10 h-10 rounded-full bg-surfaceHover animate-pulse" />
                ) : (
                    <img
                        src={getAvatar(user)}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${user?.username}`);
                        }}
                        className="w-10 h-10 rounded-full cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105"
                    />
                )}

                <div>
                    <p
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${user?.username}`);
                        }}
                        className="text-sm font-semibold cursor-pointer hover:underline hover:text-white transition-all duration-200"
                    >
                        {user?.username || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                        {formatDate(review.date)}
                    </p>
                </div>
            </div>

            {/* Review Text */}
            <p className={`text-sm text-gray-300 leading-6 ${compact ? "line-clamp-6" : ""} `}>
                {review.text}
            </p>

            <div className="border-t border-white/5" />

            {/* Actions */}
            <div className="flex gap-4 items-center pt-0">
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
            </div>
        </div>
    );
}

export default ReviewCard;
