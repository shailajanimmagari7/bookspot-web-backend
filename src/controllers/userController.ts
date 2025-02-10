import { Request, Response } from "express";
import { StatusCodes, ErrorMessages } from "../errors/errorMessage";
import {
  checkUserExistence,
  createUser,
  validatePassword,
} from "../services/userServices";
import User from "../models/userModel";
import { ValidationError } from "../errors/validationError";
import { NotFoundError } from "../errors/notFoundError";
import { UnauthorizedError } from "../errors/unAuthorizedError";
import { ConflictError } from "../errors/conflictError";
import { AppError } from "../errors/appError";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, password, emailAddress } = req.body;

  if (!username || !password || !emailAddress) {
    throw new ValidationError(ErrorMessages.MISSING_REQUIRED_FIELDS);
  }

  const existingUser = await checkUserExistence(username);
  if (existingUser) {
    throw new ConflictError(ErrorMessages.USERNAME_EXISTS);
  }

  const newUser = await createUser(username, password, emailAddress);
  if (!newUser) {
    throw new AppError(ErrorMessages.USER_CREATION_FAILED, 500);
  }

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User created successfully! You can now log in.",
    user: { username: newUser.username },
  });
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ValidationError(ErrorMessages.MISSING_REQUIRED_FIELDS);
  }

  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new NotFoundError(ErrorMessages.INVALID_CREDENTIALS);
  }
  const isPasswordValid = await validatePassword(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError(ErrorMessages.INVALID_CREDENTIALS);
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Successfully logged in!",
    user: { username: user.username, emailAddress: user.emailAddress },
  });
};
