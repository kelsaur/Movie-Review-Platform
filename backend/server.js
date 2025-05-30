import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: "./.env" });

console.log("Mongo URI: ", process.env.MONGO_URI);

const PORT = process.env.PORT || 4000;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB!");
		app.listen(PORT, () => console.log(`Server is listening to ${PORT}`));
	})
	.catch((err) => console.error("MongoDB connection error! ", err.message));
