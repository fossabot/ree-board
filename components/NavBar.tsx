import React from "react";

import PageLink from "./PageLink";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <h1 className="text-xl">Ree Board</h1>
      </div>
      <div className="navbar-end">
        <PageLink
          href="/dashboard"
          className="btn btn-ghost"
          tabIndex={0}
          testId="navbar-boards"
        >
          Boards
        </PageLink>
        <NavBarItem tabIndex={0} testId="navbar-logout">
          <LogoutLink>Logout</LogoutLink>
        </NavBarItem>
      </div>
    </div>
  );
};

export default NavBar;
