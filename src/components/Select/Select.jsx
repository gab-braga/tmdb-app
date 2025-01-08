import React from 'react';
import './Select.css';

export default ({ children, ...props }) => {
  return (
    <select
      {...props}
      className="flex-1 w-full min-w-52 xs:min-w-60 p-4 text-mauve-dark-100 dark:text-white bg-mauve-100 dark:bg-mauve-dark-100 border border-mauve-600 dark:border-mauve-dark-600 focus:border-purple-800 dark:focus:border-purple-dark-800 transition-all rounded outline-none"
    >
      {children}
    </select>
  );
};
