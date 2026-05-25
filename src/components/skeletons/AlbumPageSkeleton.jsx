import Skeleton from "../ui/Skeleton";

function AlbumPageSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-64 bg-base rounded-xl" />

            <div className="space-y-2">
                <div className="w-48 h-4 bg-baseHover rounded" />
                <div className="w-32 h-3 bg-baseHover rounded" />
            </div>

            <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="w-full h-10 bg-base rounded"
                    />
                ))}
            </div>
        </div>
    );
}

export default AlbumPageSkeleton;