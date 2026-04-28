import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";


function AlbumCard({ album }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/album/${album.id}`)} className="bg-[#141A18] rounded-xl p-4 flex gap-4 hover:bg-[#1A221F] transition cursor-pointer">

            {/* Cover */}
            <img
                src={album.cover}
                alt={album.title}
                className="w-20 h-20 rounded-md object-cover"
            />

            {/* Info */}
            <div className="flex-1">
                <h3 className="font-semibold">{album.title}</h3>
                <p className="text-sm text-gray-400">{album.artist}</p>

                {/* Rating */}
                <RatingStars rating={4} />

                {/* Review preview */}
                <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {album.review}
                </p>
            </div>
        </div>
    );
}

export default AlbumCard;