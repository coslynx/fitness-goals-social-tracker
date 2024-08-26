"use client";

import { getSession } from "next-auth/react";
import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { validateGoal, validateProgressData } from "@/utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { method, body, query } = req;
  const { goalId } = query;

  try {
    switch (method) {
      case "POST":
        const parsedGoal = validateGoal.parse(JSON.parse(body));

        const newGoal = await prisma.goal.create({
          data: {
            ...parsedGoal,
            user: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });

        return res.status(201).json(newGoal);
      case "PUT":
        const parsedGoal = validateGoal.parse(JSON.parse(body));

        const updatedGoal = await prisma.goal.update({
          where: {
            id: parseInt(goalId as string),
          },
          data: {
            ...parsedGoal,
          },
        });

        return res.status(200).json(updatedGoal);
      case "DELETE":
        await prisma.goal.delete({
          where: {
            id: parseInt(goalId as string),
          },
        });

        return res.status(204).send();
      case "GET":
        const goals = await prisma.goal.findMany({
          where: {
            userId: session.user.id,
          },
        });

        return res.status(200).json(goals);
      case "POST":
        const parsedProgressData = validateProgressData.parse(
          JSON.parse(body)
        );

        const newProgressData = await prisma.progressData.create({
          data: {
            ...parsedProgressData,
          },
        });

        return res.status(201).json(newProgressData);
      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error during goal operation:", error);
    return res.status(500).json({ message: "Error during goal operation" });
  }
}