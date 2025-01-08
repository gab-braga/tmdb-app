import React from 'react';
import './Button.css';

export default ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="flex justify-center items-center text-white bg-purple-800 hover:bg-purple-900 active:bg-purple-700 transition-all flex-1 xs:flex-none xs:px-5 py-3 rounded-sm disabled:bg-[#22193888] dark:disabled:bg-[#EBEAF814]"
    >
      {children}
    </button>
  );
};
