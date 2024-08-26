"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/utils/store";
import { toast } from "react-hot-toast";

const HomePage: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-4">Welcome to Track Your Fitness Goals</h1>
        <p className="text-lg text-gray-600 mb-8">
          Start your fitness journey today! Track your progress, set goals, and connect with others.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push("/dashboard")}
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;