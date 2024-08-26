"use client";

import { useState } from "react";
import { useStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface GoalInputProps {
  goalId?: string;
  isEdit?: boolean;
}

const GoalInput: React.FC<GoalInputProps> = ({ goalId, isEdit }) => {
  const [name, setName] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const store = useStore();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    if (
      !name ||
      !targetValue ||
      !deadline ||
      isNaN(Number(targetValue)) ||
      isNaN(new Date(deadline).getTime())
    ) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await fetch(
        `/api/goals${goalId ? `/${goalId}` : ""}`,
        {
          method: goalId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            targetValue: parseFloat(targetValue),
            deadline: new Date(deadline),
            userId: session?.user?.id,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (isEdit) {
          store.updateGoal(data);
        } else {
          store.addGoal(data);
        }
        router.push("/dashboard");
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleEdit = () => {
    if (goalId) {
      const goal = store.goals.find((g) => g.id === goalId);
      if (goal) {
        setName(goal.name);
        setTargetValue(goal.targetValue.toString());
        setDeadline(goal.deadline.toISOString().slice(0, 10));
      }
    }
  };

  useEffect(() => {
    if (isEdit) {
      handleEdit();
    }
  }, [isEdit, goalId]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Goal" : "Create Goal"}
      </h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="targetValue"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Target Value:
        </label>
        <input
          type="number"
          id="targetValue"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="deadline"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Deadline:
        </label>
        <input
          type="date"
          id="deadline"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isEdit ? "Update Goal" : "Create Goal"}
      </button>
    </form>
  );
};

export default GoalInput;