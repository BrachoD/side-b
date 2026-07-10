import { useState } from "react";

function ReviewForm({ onSubmit, initialData }) {
    const [rating, setRating] = useState(initialData?.rating || 0);
    const [text, setText] = useState(initialData?.text || "");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!rating || !text.trim()) return;

        onSubmit({ rating, text });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-surface rounded-xl p-4 space-y-4 md:space-y-5"
        >
            <h2 className="font-semibold text-sm md:text-base">
                Write Review
            </h2>

            {/* Rating */}
            <div className="space-y-2">
                <label
                    htmlFor="rating"
                    className="text-sm font-medium"
                >
                    Rating
                </label>

                <input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 rounded bg-[#0F1513] focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            {/* Review */}
            <div className="space-y-2">
                <label
                    htmlFor="review"
                    className="text-sm font-medium"
                >
                    Review
                </label>

                <textarea
                    id="review"
                    placeholder="Write your thoughts..."
                    value={text}
                    maxLength={500}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-surface p-3 rounded-md text-sm md:text-base outline-none resize-none min-h-[120px] md:min-h-[140px] focus:ring-2 focus:ring-accent focus:scale-[1.01] transition-all duration-200"
                />
            </div>

            <p className="text-xs text-gray-400 text-right">
                {text.length}/500
            </p>

            <button
                type="submit"
                disabled={!rating || !text.trim()}
                className={`
                    w-full md:w-auto
                    px-4 py-2
                    rounded-md
                    text-sm md:text-base
                    font-semibold
                    transition-all duration-200
                    active:scale-95 hover:brightness-110
                    ${!rating || !text.trim()
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-accent text-black"
                    }
                `}
            >
                Submit
            </button>
        </form>
    );
}

export default ReviewForm;