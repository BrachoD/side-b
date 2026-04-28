import { useState } from "react";

function ReviewForm({ onSubmit, initialData }) {
    const [rating, setRating] = useState(initialData?.rating || 0);
    const [text, setText] = useState(initialData?.text || "");

    return (
        <div className="bg-[#141A18] p-4 rounded-xl space-y-4">
            <h2 className="font-semibold">Write Review</h2>

            {/* Rating */}
            <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2 rounded bg-[#0F1513]"
            />

            {/* Text */}
            <textarea
                placeholder="Write your thoughts..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 rounded bg-[#0F1513]"
            />

            <button
                onClick={() => onSubmit({ rating, text })}
                className="bg-green-500 text-black px-4 py-2 rounded"
            >
                Submit
            </button>
        </div>
    );
}

export default ReviewForm;