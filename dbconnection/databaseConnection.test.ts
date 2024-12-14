import verifyDatabaseConnection from "./databaseConnection";
import { Sequelize } from "sequelize";

describe("verifyDatabaseConnection", () => {
  it("should log success message when the connection is successful", async () => {
    console.log = jest.fn();
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(undefined);
    jest.spyOn(Sequelize.prototype, 'authenticate').mockImplementation(mockAuthenticate);
    await verifyDatabaseConnection();
    expect(console.log).toHaveBeenCalledWith(
      "Connection has been established successfully."
    );
  });

  it("should log error message when the connection fails", async () => {
    const sequelize = new Sequelize(
      "wrong_db",
      "wrong_user",
      "wrong_password",
      {
        host: "localhost",
        dialect: "postgres",
      }
    );
    console.error = jest.fn();
    const mockAuthenticate = jest.fn().mockRejectedValueOnce(new Error('ConnectionRefusedError'));
    jest.spyOn(Sequelize.prototype, 'authenticate').mockImplementation(mockAuthenticate);
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    expect(console.error).toHaveBeenCalledWith(
      "Unable to connect to the database:",
      expect.any(Error)
    );
  });
});
