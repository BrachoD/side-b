import Skeleton from "../ui/Skeleton";

function SearchPageSkeleton() {
    return (
        <div className="space-y-6">

            {/* Search input */}
            <Skeleton className="w-full h-12 rounded-md" />

            {/* Users */}
            <div className="space-y-3">

                <Skeleton className="w-16 h-3" />

                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3"
                    >
                        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />

                        <Skeleton className="w-24 h-3" />
                    </div>
                ))}
            </div>

            {/* Albums */}
            <div className="space-y-3">

                <Skeleton className="w-20 h-3" />

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">

                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="space-y-2"
                        >
                            <Skeleton className="aspect-square rounded-md w-full" />

                            <Skeleton className="w-3/4 h-3" />

                            <Skeleton className="w-1/2 h-2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPageSkeleton;