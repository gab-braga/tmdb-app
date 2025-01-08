import React from 'react';
import './InputSearch.css';
import IconSearch from '../icons/IconSearch';

export default ({ onClick, ...props }) => {
  return (
    <>
      <input
        {...props}
        type="text"
        className="w-full h-14 p-4 bg-mauve-100 dark:bg-mauve-dark-100 border-t border-b border-l border-mauve-600 dark:border-mauve-dark-600 rounded-s outline-none text-mauve-dark-100 dark:text-white"
      />
      <button
        onClick={onClick}
        className="h-14 px-4 bg-mauve-100 dark:bg-mauve-dark-100 border-t border-b border-r border-mauve-600 dark:border-mauve-dark-600 flex justify-center items-center rounded-e outline-none"
      >
        <IconSearch className="text-mauve-950 dark:text-mauve-dark-950" />
      </button>
    </>
  );
};
