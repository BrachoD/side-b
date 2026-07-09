import SuggestedUsersCard from "./SuggestedUsersCard";
import AlbumOfTheDayCard from "./AlbumOfTheDayCard";
import CommunityCard from "./CommunityCard";

function RightPanel() {
    return (
        <aside className="h-screen sticky top-0 w-80 bg-surface border-l border-white/5 p-6">

            <div className="space-y-6">

                <SuggestedUsersCard />

                <AlbumOfTheDayCard />

                <CommunityCard />

            </div>

        </aside>
    );
}

export default RightPanel;