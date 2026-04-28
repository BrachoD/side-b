import ReviewCard from "./ReviewCard";

function ReviewList({ reviews, title = "Users Reviews" }) {
    return (
        <div className="space-y-4">
            <h2 className="font-semibold">{title}</h2>

            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    );
}

export default ReviewList;