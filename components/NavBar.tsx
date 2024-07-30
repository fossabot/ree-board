"use client";

import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import NavBarItem from "./NavBarItem";
import AnchorLink from "./AnchorLink";

const NavBar = () => {
  const { user, isLoading } = useUser();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <h1 className="text-xl">Ree Board</h1>
      </div>
      <div className="navbar-end">
        {user && <></>}
        {!isLoading && !user && (
          <AnchorLink
            href="/api/auth/login"
            className="btn btn-ghost"
            tabIndex={0}
            testId="navbar-login"
          >
            Log in
          </AnchorLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
