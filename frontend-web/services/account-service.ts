import { User } from "../globals/interfaces";

export const getCurrentUser: () => Promise<User> = async () => {
  return Promise.resolve({
    _id: "user-001",
    name: "Bertram Mantel",
    hashedMail: "",
  });
};
