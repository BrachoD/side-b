import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";
import { useLikes } from "../../hooks/useLikes";
import { useUser } from "../../hooks/useUser";
import { formatDate } from "../../utils/formatDate";
import { getAvatar } from "../../utils/getAvatar";

function ReviewCard({ review, compact = false, clickable = true, }) {

    const { data: user, isLoading } = useUser(review.userId);

    const { likeCount, hasLiked, toggleLike } = useLikes(review.id);
    const navigate = useNavigate();

    return (
        <div onClick={() => { if (!clickable) return; navigate(`/album/${review.album.id}`) }}
            onKeyDown={(e) => {
                if (!clickable) return;
                if (e.key === "Enter" || e.key === " ") {
                    navigate(`/album/${review.album.id}`);
                }
            }} tabIndex={clickable ? 0 : undefined} role={clickable ? "button" : undefined} className={`
                    bg-surface
                    rounded-xl
                    p-4
                    space-y-3
                    animate-in
                    fade-in
                    duration-300
                    transition-all
                    ease-out
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-accent
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#0B0F0E]
                    ${clickable
                    ? "cursor-pointer hover:bg-surfaceHover active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
                    : ""
                }
                `}>

            {/* Album Info */}
            <div className="flex items-start gap-4">
                <img
                    src={review.album.cover}
                    alt={review.album.title}
                    loading="lazy"
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
                    <button onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${user?.username}`);
                    }} aria-label={`View ${user?.username}'s profile`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full">
                        <img
                            src={getAvatar(user)}
                            alt={`${user?.username}'s avatar`}
                            loading="lazy"
                            className="w-10 h-10 rounded-full cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105"
                        />

                    </button>
                )}

                <div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${user?.username}`);
                        }}
                        aria-label={`View ${user?.username}'s profile`}
                        className="text-sm font-semibold cursor-pointer hover:underline hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:underline"
                    >
                        {user?.username || "Unknown"}
                    </button>
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
                    aria-label={
                        hasLiked
                            ? "Remove like from review"
                            : "Like review"
                    }
                >
                    👍 {likeCount}
                </button>
            </div>
        </div>
    );
}

export default ReviewCard;
