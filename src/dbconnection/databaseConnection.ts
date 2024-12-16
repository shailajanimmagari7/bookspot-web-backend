import { Sequelize } from "sequelize";

const sequelize = new Sequelize('bookspot', 'shailajapg', 'shailaja123', {
  host: 'localhost',
  dialect: 'postgres' 
});
const verifyDatabaseConnection=async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true });  
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
export {verifyDatabaseConnection, sequelize};




