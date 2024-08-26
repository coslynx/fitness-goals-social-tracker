"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/utils/store";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import Button from "@/components/Button";
import { toast } from "react-hot-toast";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.id) {
          await store.fetchGoals(session.user.id);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, [session]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">My Fitness Goals</h1>

        <div className="flex justify-between items-center mb-4">
          <GoalInput />
          <Button label="View Social Feed" onClick={() => router.push("/posts")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {store.goals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">{goal.name}</h2>
              <div className="mb-4">
                <p className="text-gray-600">
                  Target Value: {goal.targetValue}
                </p>
                <p className="text-gray-600">
                  Deadline: {goal.deadline.toDateString()}
                </p>
              </div>

              <ProgressChart
                goalId={goal.id.toString()}
                goalName={goal.name}
                targetValue={goal.targetValue}
              />

              <div className="flex justify-end mt-4">
                <Button
                  label="Edit Goal"
                  onClick={() => router.push(`/goals/${goal.id}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;