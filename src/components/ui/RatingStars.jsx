function RatingStars({ rating = 2 }) {
    return (
        <div className="text-yellow-400 text-sm mt-1">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
        </div>
    );
}

export default RatingStars;