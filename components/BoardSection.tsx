import React from "react";

export default function BoardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <div className="card bg-base-300 rounded-box rounded-s-lg grid flex-grow place-items-center">
        <div className="card-body">{children}</div>
      </div>
    </>
  );
}
