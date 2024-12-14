import express from 'express';
import cors from 'cors';
const app=express();
import verifyDatabaseConnection from './dbconnection/databaseConnection';

app.use(cors());
app.use(express.json());


verifyDatabaseConnection();
function startServer() {
    app.listen(5001, () => {
      console.log('Server is running on http://localhost:5001');
    });
  }
startServer();