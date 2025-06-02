import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);
app.use(errorHandler);

export default app;
