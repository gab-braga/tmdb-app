import React from 'react';
import './InfoFlash.css';

export default ({ title, children, className }) => {
  const classStyle =
    'bg-[#e0d9ed99] dark:bg-[#23222599] backdrop-blur-sm p-4 rounded ';
  return (
    <div className={className ? classStyle + className : classStyle}>
      <h3 className="text-mauve-950 dark:text-mauve-dark-950 text-xs font-bold uppercase mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
};
