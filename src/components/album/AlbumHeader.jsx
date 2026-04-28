import RatingStars from "../ui/RatingStars";

function AlbumHeader({ album }) {
    return (
        <div className="flex gap-6">

            {/* Cover */}
            <img
                src={album.cover}
                alt={album.title}
                className="w-48 h-48 rounded-lg object-cover"
            />

            {/* Info */}
            <div className="flex-1 space-y-4">
                <div>
                    <h1 className="text-2xl font-bold">{album.title}</h1>
                    <p className="text-gray-400">{album.artist} • {album.year}</p>
                </div>

                {/* Ratings */}
                <div className="flex gap-6 items-center">
                    <div>
                        <p className="text-sm text-gray-400">Community</p>
                        <RatingStars rating={album.communityRating} />
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">You</p>
                        <RatingStars rating={album.userRating} />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button className="bg-green-500 text-black px-4 py-2 rounded">
                        Write Review
                    </button>

                    <button className="bg-[#1A221F] px-4 py-2 rounded">
                        Rate
                    </button>
                </div>

                {/* Status */}
                <div className="flex gap-4 text-sm text-gray-400">
                    <span>✔ Listened</span>
                    <span>✔ In Library</span>
                    <span>✔ Reviewed</span>
                </div>
            </div>
        </div>
    );
}

export default AlbumHeader;