import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import path from "path";
import linkRoutes from "./routes/linkRoutes";
import * as linkController from "./controllers/linkController";

const app = express();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Health check endpoint
app.get("/healthz", (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    version: "1.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use(linkRoutes);

// Redirect route (MUST be last to avoid conflicts with other routes)
app.get("/:code", linkController.redirectToTarget);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
