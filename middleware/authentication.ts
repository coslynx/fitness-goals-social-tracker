"use server";

import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ message: "Authenticated" });
}