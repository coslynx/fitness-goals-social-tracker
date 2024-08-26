"use client";

import { DateTime } from "luxon";

export const formatDate = (date: Date | DateTime): string => {
  const formattedDate = DateTime.fromJSDate(date).toLocaleString(
    DateTime.DATE_MED
  );
  return formattedDate;
};

export const calculateProgressPercentage = (
  currentValue: number,
  targetValue: number
): number => {
  if (targetValue === 0) {
    return 0;
  }
  return Math.round(((currentValue / targetValue) * 100) * 100) / 100;
};