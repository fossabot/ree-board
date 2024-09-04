import React, { ReactNode } from "react";

import NavBarItem from "./NavBarItem";
import Link from "next/link";

interface PageLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  tabIndex?: number;
  testId?: string;
}

const PageLink: React.FC<PageLinkProps> = ({
  children,
  href,
  className,
  tabIndex,
  testId,
}) => {
  return (
    <Link href={href}>
      <NavBarItem
        className={className}
        tabIndex={tabIndex}
        testId={testId}
      >
        {children}
      </NavBarItem>
    </Link>
  );
};

export default PageLink;
