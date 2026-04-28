import { databases } from "./appwrite";
import { Query } from "appwrite";

const DB_ID = import.meta.env.VITE_DB_ID;
const FOLLOWS_COLLECTION = import.meta.env.VITE_FOLLOWS_COLLECTION;

export const followUser = async (followerId, followingId) => {
  return await databases.createDocument(DB_ID, FOLLOWS_COLLECTION, "unique()", {
    followerId,
    followingId,
  });
};

export const unfollowUser = async (docId) => {
  return await databases.deleteDocument(DB_ID, FOLLOWS_COLLECTION, docId);
};

export const getFollow = async (followerId, followingId) => {
  const res = await databases.listDocuments(DB_ID, FOLLOWS_COLLECTION, [
    Query.equal("followerId", followerId),
    Query.equal("followingId", followingId),
  ]);

  return res.documents[0] || null;
};

export const getFollowers = async (userId) => {
  const res = await databases.listDocuments(DB_ID, FOLLOWS_COLLECTION, [
    Query.equal("followingId", userId),
  ]);

  return res.documents;
};

export const getFollowing = async (userId) => {
  const res = await databases.listDocuments(DB_ID, FOLLOWS_COLLECTION, [
    Query.equal("followerId", userId),
  ]);

  return res.documents;
};

export const getFollowingIds = async (userId) => {
  const res = await databases.listDocuments(DB_ID, FOLLOWS_COLLECTION, [
    Query.equal("followerId", userId),
  ]);

  return res.documents.map((doc) => doc.followingId);
};
