function RightPanel() {
    return (
        <aside className="w-80 bg-[#0F1513] p-6 hidden lg:block">
            <h2 className="text-lg font-semibold mb-4">Trending Albums</h2>

            <div className="space-y-3">
                <div className="bg-[#141A18] p-3 rounded">Album 1</div>
                <div className="bg-[#141A18] p-3 rounded">Album 2</div>
                <div className="bg-[#141A18] p-3 rounded">Album 3</div>
            </div>
        </aside>
    );
}

export default RightPanel;