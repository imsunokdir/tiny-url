import prisma from "../db/prisma";
import {
  generateRandomCode,
  isValidCode,
  isValidUrl,
} from "../utils/validators";

export interface CreateLinkInput {
  targetUrl: string;
  customCode?: string;
}

export interface Link {
  id: string;
  code: string;
  targetUrl: string;
  clicks: number;
  lastClicked: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LinkWithUrl extends Link {
  shortUrl: string;
}

export const createLink = async (input: CreateLinkInput): Promise<Link> => {
  const { targetUrl, customCode } = input;

  if (!isValidUrl(targetUrl)) {
    throw new Error("Invalid URL format");
  }

  let code = customCode;

  if (code) {
    if (!isValidCode(code)) {
      throw new Error("Custom code must be 6-8 alphanumeric characters");
    }

    const existing = await prisma.link.findUnique({ where: { code } });
    if (existing) {
      throw new Error("Code already exists");
    }
  } else {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      code = generateRandomCode(6);
      const existing = await prisma.link.findUnique({ where: { code } });
      if (!existing) break;
      attempts++;
    }

    if (attempts === maxAttempts) {
      throw new Error("Failed to generate unique code");
    }
  }

  const link = await prisma.link.create({
    data: {
      code: code!,
      targetUrl,
    },
  });

  return link;
};

export const getAllLinks = async (): Promise<Link[]> => {
  return prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getLinkByCode = async (code: string): Promise<Link | null> => {
  return prisma.link.findUnique({
    where: { code },
  });
};

export const incrementClick = async (code: string): Promise<Link> => {
  return prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });
};

export const deleteLink = async (code: string): Promise<void> => {
  await prisma.link.delete({
    where: { code },
  });
};
