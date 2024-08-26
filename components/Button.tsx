"use client";

import { useState } from "react";
import { useStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error("Error during button click:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        variant === "primary"
          ? "bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-300"
          : variant === "secondary"
          ? "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-300"
          : variant === "outline"
          ? "border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-gray-300"
          : ""
      }`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;