import Head from "next/head";
import React from "react";

import NavBar from "./NavBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Head>
      <title>ree board</title>
    </Head>
    <main id="app" className="flex flex-col h-100" data-testid="layout">
      <NavBar />
      {children}
    </main>
  </>
);

export default Layout;
