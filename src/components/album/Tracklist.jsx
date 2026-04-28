function Tracklist({ tracks }) {
    return (
        <div className="bg-[#141A18] p-4 rounded-xl">
            <h2 className="font-semibold mb-4">Tracklist</h2>

            <div className="space-y-2">
                {tracks.map((track, index) => (
                    <div
                        key={index}
                        className="flex justify-between text-sm hover:bg-[#1A221F] p-2 rounded"
                    >
                        <span>{index + 1}. {track.title}</span>
                        <span className="text-gray-400">{track.duration}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tracklist;