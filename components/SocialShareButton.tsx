"use client";

import { useState } from "react";
import { useStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface SocialShareButtonProps {
  post: {
    content: string;
    imageUrl?: string;
    id: string;
    userId: string;
  };
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ post }) => {
  const [isSharing, setIsSharing] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const store = useStore();

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user?.id }),
      });

      if (response.ok) {
        const data = await response.json();
        store.setSharedPost(post.id);
        router.push(`/posts/${post.id}`);
      } else {
        console.error("Error sharing post:", response.status);
      }
    } catch (error) {
      console.error("Error sharing post:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      disabled={isSharing}
      onClick={handleShare}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isSharing ? "Sharing..." : "Share"}
    </button>
  );
};

export default SocialShareButton;