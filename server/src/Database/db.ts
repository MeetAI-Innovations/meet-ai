import mongoose from "mongoose";
import { databaseUrl } from "../config/envConfig";

export const connectDatabase = async () => {
  try {
    console.log("GBU", databaseUrl);
    
    /* Database connection */
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );
    
    console.log(
      "Mongodb server connected: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Error while connecting to the database: ", error);
  }
};
