import express from "express";
import userRoutes from "./src/interfaces/routes/userRoutes";
import authRoutes from "./src/interfaces/routes/authRoutes";
import cors from "cors";
import profileRoutes from "./src/interfaces/routes/profileController";
import passwordHistoryRoutes from "./src/interfaces/routes/passwordHistoryRoutes";
import categoryRoutes from "./src/interfaces/routes/categoryRoutes";
import brandRoutes from "./src/interfaces/routes/brandRoutes";
import unitOfMeasureRoutes from "./src/interfaces/routes/unitOfMeasureRoutes";
import locationRoutes from "./src/interfaces/routes/locationRoutes";
import productRoutes from "./src/interfaces/routes/productRoutes";
import inventoryRoutes from "./src/interfaces/routes/inventoryRoutes";

export const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("/{*any}", cors(corsOptions));

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", passwordHistoryRoutes);
app.use("/api", categoryRoutes);
app.use("/api", brandRoutes);
app.use("/api", unitOfMeasureRoutes);
app.use("/api", locationRoutes);
app.use("/api", productRoutes);
app.use("/api", inventoryRoutes);

