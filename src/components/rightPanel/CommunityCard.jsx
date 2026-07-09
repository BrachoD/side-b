import { useQuery } from "@tanstack/react-query";

import Card from "../ui/Card";

import { getCommunityStats } from "../../services/reviewService";


function CommunityCard() {

    const { data: stats, isLoading } = useQuery({
        queryKey: ["communityStats"],
        queryFn: getCommunityStats,
    });

    if (isLoading) {
        return (
            <Card>
                <h2 className="text-sm font-semibold mb-4">
                    Community
                </h2>

                <div className="space-y-3 animate-pulse">

                    <div className="h-4 bg-surfaceHover rounded" />

                    <div className="h-4 bg-surfaceHover rounded" />

                    <div className="h-4 bg-surfaceHover rounded" />

                </div>
            </Card>
        );
    }

    return (
        <Card>

            <h2 className="text-sm font-semibold mb-4">
                Community
            </h2>

            <div className="space-y-3">

                <div className="flex justify-between">
                    <span className="text-gray-400">
                        Reviews
                    </span>

                    <span className="font-semibold">
                        {stats?.reviews.toLocaleString() ?? 0}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-400">
                        Albums
                    </span>

                    <span className="font-semibold">
                        {stats?.albums.toLocaleString() ?? 0}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-400">
                        Members
                    </span>

                    <span className="font-semibold">
                        {stats?.members.toLocaleString() ?? 0}
                    </span>
                </div>

            </div>

        </Card>
    );
}

export default CommunityCard;