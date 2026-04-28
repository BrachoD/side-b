function RatingStars({ rating = 4 }) {
    return (
        <div className="text-yellow-400 text-sm">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
        </div>
    );
}

export default RatingStars;