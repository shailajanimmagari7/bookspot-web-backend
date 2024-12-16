import express, { Request, Response } from "express";
import { UserModel, UserAttributes } from "../../models/userModel";

const UserRouter = express.Router();
UserRouter.get("/check", (req: Request, res: Response) => {
  res.send({ status: "Working" });
});

UserRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, emailAddress } = req.body;
    if (!username || !password || !emailAddress) {
       res.status(400).json({ message: "All fields (username, password, email) are required" });
       return;
    }
    const oldUser = await UserModel.findOne({ where: { username } });
    if (oldUser) {
       res.status(400).json({ message: "Username already exists" });
       return;
    }
    const newUser = await UserModel.create({
      username,
      password,
      emailAddress,
    });
     res.status(201).json({
      message: "User created successfully! Now you can log in.",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user", error: err });
  }
});


UserRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ where: { username } });

    if (user) {
      const typedUser = user.get() as UserAttributes;
      if (typedUser.password === password) {
        res.json({ message: "Successfully logged in!", user: typedUser });
      } else {
        res.status(401).json({ message: "The password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default UserRouter;
