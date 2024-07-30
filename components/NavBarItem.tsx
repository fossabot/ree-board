import React from "react";

const NavBarItem = ({ children, className, icon, tabIndex, testId }) => {
  const defaultClasses = "btn btn-ghost";
  const btnClasses = className
    ? `${className} ${defaultClasses}`
    : defaultClasses;

  return (
    <span className="inline-flex items-center">
      <span className={btnClasses} tabIndex={tabIndex} data-testid={testId}>
        {children}
      </span>
    </span>
  );
};

export default NavBarItem;
