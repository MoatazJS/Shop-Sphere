"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
export default function ProvidersContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
