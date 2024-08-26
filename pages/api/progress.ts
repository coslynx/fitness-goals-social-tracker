"use client";

import { getSession } from "next-auth/react";
import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { goalId } = req.query;

  if (!goalId) {
    return res.status(400).json({ message: "Goal ID is required" });
  }

  try {
    const progressData = await prisma.progressData.findMany({
      where: { goalId: parseInt(goalId as string) },
      orderBy: { date: "asc" },
    });

    return res.status(200).json(progressData);
  } catch (error) {
    console.error("Error fetching progress data:", error);
    return res.status(500).json({ message: "Error fetching progress data" });
  }
}