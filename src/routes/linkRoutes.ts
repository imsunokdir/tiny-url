import { Router } from "express";
import * as linkController from "../controllers/linkController";

const linkRouter = Router();

// API routes
linkRouter.post("/api/links", linkController.createLink);
linkRouter.get("/api/links", linkController.getAllLinks);
linkRouter.get("/api/links/:code", linkController.getLinkByCode);
linkRouter.delete("/api/links/:code", linkController.deleteLink);

export default linkRouter;
