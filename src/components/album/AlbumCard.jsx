// import RatingStars from "../ui/RatingStars";
// import { useNavigate } from "react-router-dom";


// function AlbumCard({ album }) {
//     const navigate = useNavigate();

//     return (
//         <div onClick={() => navigate(`/album/${album.id}`)} className="bg-[#141A18] rounded-xl p-4 flex gap-4 hover:bg-[#1A221F] transition cursor-pointer animate-in fade-in duration-300">

//             {/* Cover */}
//             <img
//                 src={album.cover}
//                 alt={album.title}
//                 className="w-20 h-20 rounded-md object-cover"
//             />

//             {/* Info */}
//             <div className="flex-1">
//                 <h3 className="font-semibold">{album.title}</h3>
//                 <p className="text-sm text-gray-400">{album.artist}</p>

//                 {/* Rating */}
//                 <RatingStars rating={4} />

//                 {/* Review preview */}
//                 <p className="text-sm text-gray-300 mt-2 line-clamp-2">
//                     {album.review}
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default AlbumCard;

import RatingStars from "../ui/RatingStars";
import { useNavigate } from "react-router-dom";

function AlbumCard({ album }) {
    const navigate = useNavigate();

    const goToAlbum = () => navigate(`/album/${album.id}`);

    return (
        <div
            onClick={goToAlbum}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    goToAlbum();
                }
            }}
            tabIndex={0}
            role="button"
            className="
                bg-surface
                rounded-xl
                p-4
                flex
                gap-4
                cursor-pointer
                animate-in
                fade-in
                duration-300
                transition-all
                ease-out
                hover:bg-surfaceHover
                hover:-translate-y-0.5
                hover:shadow-lg
                hover:shadow-black/20
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#0B0F0E]
            "
        >

            {/* Cover */}
            <img
                src={album.cover}
                alt={album.title}
                loading="lazy"
                className="
                    w-20
                    h-20
                    rounded-lg
                    shadow-md
                    object-cover
                    flex-shrink-0
                "
            />

            {/* Info */}
            <div className="flex-1 min-w-0">

                <h3 className="font-semibold leading-tight truncate">
                    {album.title}
                </h3>

                <p className="text-sm text-gray-400">
                    {album.artist}
                </p>

                {/* Rating */}
                <RatingStars rating={album.rating} />

                {/* Review preview */}
                <p className="text-sm text-gray-300 leading-6 mt-2 line-clamp-2">
                    {album.review}
                </p>

            </div>

        </div>
    );
}

export default AlbumCard;