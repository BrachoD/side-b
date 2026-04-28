const BASE_URL = "https://musicbrainz.org/ws/2";

export async function searchAlbums(query) {
  const res = await fetch(`${BASE_URL}/release/?query=${query}&fmt=json`);

  const data = await res.json();

  return data.releases;
}

export async function getAlbum(id) {
  const res = await fetch(
    `https://musicbrainz.org/ws/2/release/${id}?inc=recordings+artists&fmt=json`,
  );

  return res.json();
}
