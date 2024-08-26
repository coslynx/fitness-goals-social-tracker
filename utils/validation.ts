"use client";

import { z } from "zod";

export const goalSchema = z.object({
  name: z.string().min(3).max(50),
  targetValue: z.number().min(1),
  deadline: z
    .string()
    .transform((val) => new Date(val))
    .refine(
      (date) => !isNaN(date.getTime()),
      "Invalid date format. Please use YYYY-MM-DD."
    ),
  userId: z.number(),
});

export const progressDataSchema = z.object({
  date: z
    .string()
    .transform((val) => new Date(val))
    .refine(
      (date) => !isNaN(date.getTime()),
      "Invalid date format. Please use YYYY-MM-DD."
    ),
  value: z.number(),
  goalId: z.number(),
});

export const validateGoal = (goal: any) => {
  return goalSchema.safeParse(goal);
};

export const validateProgressData = (progressData: any) => {
  return progressDataSchema.safeParse(progressData);
};