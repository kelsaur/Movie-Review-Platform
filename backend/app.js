import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import movieRoutes from "./routes/movieRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", userRoutes);
app.use(errorHandler);

export default app;
