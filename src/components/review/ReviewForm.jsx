import { useState } from "react";

function ReviewForm({ onSubmit, initialData }) {
    const [rating, setRating] = useState(initialData?.rating || 0);
    const [text, setText] = useState(initialData?.text || "");

    return (
        <div className="bg-base rounded-xl p-4 space-y-4 md:space-y-5">
            <h2 className="font-semibold text-sm md:text-base">Write Review</h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 rounded bg-[#0F1513]"
                />
            </div>

            {/* Text */}
            <textarea
                placeholder="Write your thoughts..."
                value={text}
                maxLength={500}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-base p-3 rounded-md text-sm md:text-base outline-none resize-none min-h-[120px] md:min-h-[140px] focus:ring-2 focus:ring-accent transition-all duration-200"
            />
            <p className="text-xs text-gray-400 text-right">
                {text.length}/500
            </p>

            <button
                onClick={() => onSubmit({ rating, text })}
                disabled={!rating || !text.trim()}
                className={`
                    w-full md:w-auto
                    px-4 py-2
                    rounded-md
                    text-sm md:text-base
                    font-semibold
                    transition-all duration-200
                    active:scale-95
                    ${!rating || !text.trim()
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-accent text-black"
                    }
                `}
            >
                Submit
            </button>
        </div>
    );
}

export default ReviewForm;