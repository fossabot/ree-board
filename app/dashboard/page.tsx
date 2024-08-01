import BoardCard from "@/components/BoardCard";
import NavBar from "@/components/NavBar";
import React from "react";

export default async function Dashboard() {
  return (
    <>
      <NavBar />
      <BoardCard title="2024/07/30 Retro" />
    </>
  );
}
