import { Sequelize } from "sequelize";

const verifyDatabaseConnection=async()=>{
  const sequelize = new Sequelize('bookspot', 'shailajapg', 'shailaja123', {
    host: 'localhost',
    dialect: 'postgres' 
  });
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return {success:true};
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return { success: false, message: (error as Error).message }; 
  } 
}
export default verifyDatabaseConnection;




