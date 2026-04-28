import { databases } from "./appwrite";
import { Query, ID } from "appwrite";
import { Permission, Role } from "appwrite";

const DB_ID = import.meta.env.VITE_DB_ID;
const REVIEWS_COLLECTION = import.meta.env.VITE_REVIEWS_COLLECTION;

export async function createReview({
  userId,
  userName,
  userAvatar,
  albumId,
  albumTitle,
  albumArtist,
  albumCover,
  rating,
  text,
}) {
  return databases.createDocument(
    DB_ID,
    REVIEWS_COLLECTION,
    ID.unique(),
    {
      userId,
      userName,
      userAvatar,
      albumId,
      albumTitle,
      albumArtist,
      albumCover,
      rating,
      text,
    },
    [Permission.read(Role.any()), Permission.write(Role.users())],
  );
}

export async function getReviews(albumId) {
  const res = await databases.listDocuments(DB_ID, REVIEWS_COLLECTION, [
    Query.equal("albumId", albumId),
  ]);
  return res;
}

export async function getFeed() {
  return databases.listDocuments(DB_ID, REVIEWS_COLLECTION, [
    Query.orderDesc("$createdAt"),
    Query.limit(20),
  ]);
}

export async function getReviewsByUser(userId) {
  return databases.listDocuments(DB_ID, REVIEWS_COLLECTION, [
    Query.equal("userId", userId),
    Query.orderDesc("$createdAt"),
  ]);
}

export const getFeedByFollowing = async (userIds) => {
  if (!userIds.length) return { documents: [] };

  const res = await databases.listDocuments(DB_ID, REVIEWS_COLLECTION, [
    Query.equal("userId", userIds),
    Query.orderDesc("$createdAt"),
  ]);

  return res;
};

export const deleteReview = async (reviewId) => {
  return await databases.deleteDocument(DB_ID, REVIEWS_COLLECTION, reviewId);
};

export const updateReview = async (reviewId, data) => {
  return await databases.updateDocument(
    DB_ID,
    REVIEWS_COLLECTION,
    reviewId,
    data,
  );
};
