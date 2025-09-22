"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
export default function ProvidersContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <Provider store={store}>{children}</Provider>
      </SessionProvider>
    </>
  );
}
