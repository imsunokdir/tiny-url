import type { Request, Response } from "express";
import * as linkService from "../services/linkServices";

export const createLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { targetUrl, customCode } = req.body;

    if (!targetUrl) {
      res.status(400).json({ error: "targetUrl is required" });
      return;
    }

    const link = await linkService.createLink({ targetUrl, customCode });
    res.status(201).json(link);
  } catch (error: any) {
    if (error.message === "Code already exists") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const getAllLinks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const links = await linkService.getAllLinks();
    res.json(links);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
};

export const getLinkByCode = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code } = req.params;
    const link = await linkService.getLinkByCode(code!);

    if (!link) {
      res.status(404).json({ error: "Link not found" });
      return;
    }

    res.json(link);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch link" });
  }
};

export const deleteLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code } = req.params;

    const link = await linkService.getLinkByCode(code!);
    if (!link) {
      res.status(404).json({ error: "Link not found" });
      return;
    }

    await linkService.deleteLink(code!);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete link" });
  }
};

export const redirectToTarget = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code } = req.params;
    const link = await linkService.getLinkByCode(code!);

    if (!link) {
      res.status(404).send("Link not found");
      return;
    }

    // Increment click count asynchronously (don't wait)
    linkService
      .incrementClick(code!)
      .catch((err) => console.error("Failed to increment click:", err));

    // Perform 302 redirect
    res.redirect(302, link.targetUrl);
  } catch (error: any) {
    res.status(500).send("Server error");
  }
};
