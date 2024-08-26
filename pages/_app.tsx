"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useStore } from "@/utils/store";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: React.ComponentType<any>;
  pageProps: { session: any; [key: string]: any };
}) {
  const store = useStore();

  useEffect(() => {
    if (session?.user?.id) {
      store.fetchGoals(session.user.id);
    }
  }, [session]);

  return (
    <>
      <SessionProvider session={session}>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}