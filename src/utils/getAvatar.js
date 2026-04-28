export const getAvatar = (user) => {
  const seed = user?.avatar || user?.userId;
  return `https://i.pravatar.cc/80?u=${seed}`;
};
