import { Model, DataTypes } from "sequelize";
import { sequelize } from "../dbconnection/databaseConnection";


class User extends Model {
  static close() {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public  emailAddress!: string;
}

User.init(
  {
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
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
