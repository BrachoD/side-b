import { databases } from "./appwrite";
import { Query, ID } from "appwrite";

const DB_ID = import.meta.env.VITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_LIKES_COLLECTION;

// get likes from a review
export async function getLikes(reviewId) {
  if (!reviewId) return { documents: [] };

  return databases.listDocuments(DB_ID, COLLECTION_ID, [
    Query.equal("reviewId", reviewId),
  ]);
}

// verifies if user already liked it
export async function getUserLike(reviewId, userId) {
  if (!reviewId || !userId) return null;

  const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
    Query.equal("reviewId", reviewId),
    Query.equal("userId", userId),
  ]);

  return res.documents[0] || null;
}

// like
export async function likeReview({ reviewId, userId }) {
  return databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
    reviewId,
    userId,
  });
}

// remove like
export async function unlikeReview(likeId) {
  return databases.deleteDocument(DB_ID, COLLECTION_ID, likeId);
}

export async function getLikesByReviews(reviewIds) {
  if (!reviewIds.length) return { documents: [] };

  return databases.listDocuments("69bee3cb000f48d9fd27", "likes", [
    Query.equal("reviewId", reviewIds),
  ]);
}
