import React, { ReactNode } from "react";

import NavBarItem from "./NavBarItem";

interface AnchorLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  tabIndex?: number;
  testId?: string;
}

const AnchorLink: React.FC<AnchorLinkProps> = ({
  children,
  href,
  className,
  tabIndex,
  testId,
}) => {
  return (
    <a href={href}>
      <NavBarItem
        className={className}
        tabIndex={tabIndex}
        testId={testId}
      >
        {children}
      </NavBarItem>
    </a>
  );
};

export default AnchorLink;
