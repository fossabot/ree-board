import React, { ReactNode } from "react";

import NavBarItem from "./NavBarItem";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface PageLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  icon?: IconProp;
  tabIndex?: number;
  testId?: string;
}

const PageLink: React.FC<PageLinkProps> = ({
  children,
  href,
  className,
  icon,
  tabIndex,
  testId,
}) => {
  return (
    <Link href={href}>
      <NavBarItem
        className={className}
        icon={icon}
        tabIndex={tabIndex}
        testId={testId}
      >
        {children}
      </NavBarItem>
    </Link>
  );
};

export default PageLink;
