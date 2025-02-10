import User from "../models/userModel";
import bcrypt from "bcrypt";


export const checkUserExistence = async (username: string) => {
  return await User.findOne({ where: { username } });
};
export const validatePassword = async (
  enteredPassword: string,
  storedPassword: string
) => {
  const isValid = await bcrypt.compare(enteredPassword, storedPassword);
  return isValid;
};

export const createUser = async (
  username: string,
  password: string,
  emailAddress: string
) => {
  const hashedPassword = await bcrypt.hash(password, 1);
  const newUser = await User.create({
    username,
    password: hashedPassword,
    emailAddress,
  });
  return newUser;
};
