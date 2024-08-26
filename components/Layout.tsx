"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStore } from "@/utils/store";
import Header from "@/components/Header";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import SocialShareButton from "@/components/SocialShareButton";

const Layout: React.FC = () => {
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
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">My Fitness Goals</h1>

        <div className="flex justify-between items-center mb-4">
          <GoalInput />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push("/posts")}
          >
            View Social Feed
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {store.goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h2 className="text-xl font-bold mb-2">{goal.name}</h2>
              <div className="mb-4">
                <p className="text-gray-600">
                  Target Value: {goal.targetValue}
                </p>
                <p className="text-gray-600">Deadline: {goal.deadline.toDateString()}</p>
              </div>

              <ProgressChart
                goalId={goal.id.toString()}
                goalName={goal.name}
                targetValue={goal.targetValue}
              />

              <div className="flex justify-end mt-4">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => router.push(`/goals/${goal.id}`)}
                >
                  Edit Goal
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Layout;