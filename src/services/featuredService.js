import { databases } from "./appwrite";
import { Query } from "appwrite";

const DB_ID = import.meta.env.VITE_DB_ID;
const REVIEWS_COLLECTION = import.meta.env.VITE_REVIEWS_COLLECTION;

export async function getFeaturedAlbum() {
  const res = await databases.listDocuments(DB_ID, REVIEWS_COLLECTION, [
    Query.limit(100),
  ]);

  if (!res.documents.length) {
    return null;
  }

  const randomReview =
    res.documents[Math.floor(Math.random() * res.documents.length)];

  return {
    id: randomReview.albumId,
    title: randomReview.albumTitle,
    artist: randomReview.albumArtist,
    cover: randomReview.albumCover,
  };
}
