import express from "express";
import cors from "cors";
import { verifyDatabaseConnection } from "./src/dbconnection/databaseConnection";
import UserRouter from "./src/routes/userRoutes/userRoutes";
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', UserRouter); 
const startServer = async () => {
  try {
    await verifyDatabaseConnection();
    app.listen(5001, () => {
      console.log("Server is running on http://localhost:5001");
    });
  } catch (error) {
    console.error("Error during server startup:", error);
  }
};

startServer();
