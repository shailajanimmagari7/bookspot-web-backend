import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbconnection/databaseConnection";


export  interface UserAttributes {
  id: number;
  username: string;
  password: string;
  emailAddress: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
export const UserModel = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "User",  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,  
    },
  },
});
export default sequelize;
