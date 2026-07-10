import ReviewCard from "./ReviewCard";

function ReviewList({ reviews, title = "Users Reviews", clickable = false, compact = false }) {
    return (
        <div className="space-y-4">
            <h2 className="font-semibold">{title}</h2>

            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} clickable={clickable} compact={compact} />
            ))}
        </div>
    );
}

export default ReviewList;