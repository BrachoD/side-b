import Skeleton from "../ui/Skeleton";

function ReviewCardSkeleton() {
    return (
        <div className="bg-[#141A18] rounded-xl p-4 space-y-4">

            {/* Header */}
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="w-24 h-3" />
                    <Skeleton className="w-16 h-2" />
                </div>
            </div>

            {/* Album */}
            <div className="flex gap-4">
                <Skeleton className="w-16 h-16 rounded-md" />
                <div className="space-y-2">
                    <Skeleton className="w-32 h-3" />
                    <Skeleton className="w-24 h-2" />
                </div>
            </div>

            {/* Text */}
            <div className="space-y-2">
                <Skeleton className="w-full h-2" />
                <Skeleton className="w-5/6 h-2" />
            </div>
        </div>
    );
}

export default ReviewCardSkeleton;