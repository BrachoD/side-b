import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";
import { useLikes } from "../../hooks/useLikes";
import { useUser } from "../../hooks/useUser";
import { formatDate } from "../../utils/formatDate";
import { getAvatar } from "../../utils/getAvatar";

function ReviewCard({ review }) {

    const { data: user, isLoading } = useUser(review.userId);

    const { likeCount, hasLiked, toggleLike } = useLikes(review.id);
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/album/${review.album.id}`)} className="bg-[#141A18] rounded-xl p-4 space-y-4 hover:bg-[#1A221F] transition">

            {/* Header */}
            <div className="flex items-center gap-3">
                {isLoading ? (
                    <div className="w-10 h-10 rounded-full bg-[#1A221F]" />
                ) : (
                    <img
                        src={getAvatar(user)}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${user?.username}`);
                        }}
                        className="w-10 h-10 rounded-full cursor-pointer"
                    />
                )}

                <div>
                    <p
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${user?.username}`);
                        }}
                        className="text-sm font-semibold cursor-pointer hover:underline"
                    >
                        {user?.username || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-400">
                        {formatDate(review.date)}
                    </p>
                </div>
            </div>

            {/* Album Info */}
            <div className="flex gap-4">
                <img
                    src={review.album.cover}
                    alt={review.album.title}
                    className="w-16 h-16 rounded-md object-cover"
                />

                <div>
                    <p className="font-semibold">{review.album.title}</p>
                    <p className="text-sm text-gray-400">{review.album.artist}</p>

                    <RatingStars rating={review.rating} />
                </div>
            </div>

            {/* Review Text */}
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
            </div>
        </div>
    );
}

export default ReviewCard;