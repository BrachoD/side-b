import { databases } from "./appwrite";
import { Query } from "appwrite";

const DB_ID = import.meta.env.VITE_DB_ID;
const USERS_COLLECTION = import.meta.env.VITE_USERS_COLLECTION;

export const getUserByUsername = async (username) => {
  const res = await databases.listDocuments(DB_ID, USERS_COLLECTION, [
    Query.equal("username", username),
  ]);

  return res.documents[0] || null;
};

export const createUserProfile = async ({ userId, username, email }) => {
  return await databases.createDocument(DB_ID, USERS_COLLECTION, "unique()", {
    userId,
    username,
    email,
    avatar: "",
  });
};

export const updateUserProfile = async (docId, data) => {
  return await databases.updateDocument(DB_ID, USERS_COLLECTION, docId, data);
};

export const getUserById = async (userId) => {
  const res = await databases.listDocuments(DB_ID, USERS_COLLECTION, [
    Query.equal("userId", userId),
  ]);

  return res.documents[0] || null;
};

export const searchUsers = async (query) => {
  if (!query) return { documents: [] };

  const res = await databases.listDocuments(DB_ID, USERS_COLLECTION, [
    Query.search("username", query),
  ]);

  return res;
};

export const getSuggestedUsers = async (currentUserId, followingIds) => {
  const res = await databases.listDocuments(DB_ID, USERS_COLLECTION);

  return res.documents.filter(
    (user) =>
      user.userId !== currentUserId && !followingIds.includes(user.userId),
  );
};
