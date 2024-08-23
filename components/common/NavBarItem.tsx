import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface NavBarItemProps {
  children: ReactNode;
  className?: string;
  icon?: IconProp;
  tabIndex?: number;
  testId?: string;
}

const NavBarItem: React.FC<NavBarItemProps> = ({ children, className, icon, tabIndex, testId }) => {
  const defaultClasses = "btn btn-ghost";
  const btnClasses = className
    ? `${className} ${defaultClasses}`
    : defaultClasses;

  return (
    <span className="inline-flex items-center">
      {icon && <FontAwesomeIcon icon={icon} className="mr-3" />}
      <span className={btnClasses} tabIndex={tabIndex} data-testid={testId}>
        {children}
      </span>
    </span>
  );
};

export default NavBarItem;
