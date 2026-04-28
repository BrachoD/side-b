import { account } from "./appwrite";

export async function signup(email, password) {
  return await account.create("unique()", email, password);
}

export async function login(email, password) {
  return await account.createEmailPasswordSession(email, password);
}

export async function logout() {
  return await account.deleteSession("current");
}

export async function getCurrentUser() {
  return await account.get();
}
