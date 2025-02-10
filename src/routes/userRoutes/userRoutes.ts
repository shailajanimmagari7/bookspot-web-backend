import express, { Request, Response } from "express";
const app = express();
const UserRouter = express.Router();
import { registerUser, loginUser } from "..//../controllers/userController";

UserRouter.get("/check", (req: Request, res: Response) => {
  res.send({ success: true, message: "Working" });
});

UserRouter.post("/register", registerUser);  
UserRouter.post("/login", loginUser);       

export default UserRouter;
