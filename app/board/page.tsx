import BoardCard from "@/components/BoardCard";
import NavBar from "@/components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import React from "react";

export default async function Dashboard() {
  return (
    <>
      <NavBar />
      <BoardCard boardID={-1}>
        <FontAwesomeIcon
          className="text-3xl"
          icon={faSquarePlus}
        />
      </BoardCard>
    </>
  );
}
