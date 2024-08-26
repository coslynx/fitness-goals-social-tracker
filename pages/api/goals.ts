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

  const { method, body, query } = req;
  const { goalId } = query;

  if (!goalId) {
    return res.status(400).json({ message: "Goal ID is required" });
  }

  try {
    switch (method) {
      case "POST":
        const { name, targetValue, deadline } = JSON.parse(body);

        if (!name || !targetValue || !deadline) {
          return res
            .status(400)
            .json({ message: "Name, targetValue, and deadline are required" });
        }

        const newGoal = await prisma.goal.create({
          data: {
            name,
            targetValue: parseFloat(targetValue),
            deadline: new Date(deadline),
            user: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });

        return res.status(201).json(newGoal);
      case "PUT":
        const { name, targetValue, deadline } = JSON.parse(body);

        if (!name || !targetValue || !deadline) {
          return res
            .status(400)
            .json({ message: "Name, targetValue, and deadline are required" });
        }

        const updatedGoal = await prisma.goal.update({
          where: {
            id: parseInt(goalId as string),
          },
          data: {
            name,
            targetValue: parseFloat(targetValue),
            deadline: new Date(deadline),
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
      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error during goal operation:", error);
    return res.status(500).json({ message: "Error during goal operation" });
  }
}