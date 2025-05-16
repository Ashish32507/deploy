import userRoutes from "./routes/UserRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import express from "express";
import cors from "cors";
import { dbConnection } from "./dbConnection/dbConnection.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/product", productRoutes);

dbConnection();

app.listen(PORT, () => {
  console.log(`Your Server Is Runing On Port ${PORT}`);
});
