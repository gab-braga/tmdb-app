import React from 'react';
import './Footer.css';

export default () => {
  return (
    <footer className="w-full flex justify-center items-center p-4 bg-[#e0d3ed80] dark:bg-[#12111380] border-t border-t-[#07070830] dark:border-t-[#F1E6FD30]">
      <p className="text-base text-mauve-950 dark:text-mauve-dark-950 text-center">
        2024 &copy; Todos os direitos reservados a{' '}
        <strong className="font-semibold">Cubos Movies</strong>
      </p>
    </footer>
  );
};
