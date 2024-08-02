import BoardCard from "@/components/BoardCard";
import NavBar from "@/components/NavBar";
import React from "react";

export default async function Dashboard() {
  return (
    <>
      <NavBar />
      <BoardCard>
        <h2 className="card-title text-center select-none">Test</h2>
      </BoardCard>
    </>
  );
}
