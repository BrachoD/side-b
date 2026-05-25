import Skeleton from "../ui/Skeleton";

function ProfilePageSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-baseHover" />

                <div className="space-y-2">
                    <div className="w-32 h-4 bg-baseHover rounded" />
                    <div className="w-24 h-3 bg-baseHover rounded" />
                </div>
            </div>

            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="bg-base rounded-xl h-40"
                />
            ))}
        </div>
    );
}

export default ProfilePageSkeleton;