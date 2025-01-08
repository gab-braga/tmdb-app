import React from 'react';
import IconChevronLeft from '../icons/IconChevronLeft';
import IconChevronRight from '../icons/IconChevronRight';
import Button from '../Button/Button';
import './Pagination.css';

function generatePages(currentPage) {
  const pages = [];
  let pageStart = 1;
  let pageEnd = 5;
  if (currentPage < 1) return [1, 2, 3, 4, 5];
  if (currentPage % 5 == 0) {
    pageStart = currentPage - 5;
    pageEnd = currentPage;
  } else {
    pageStart = Math.floor(currentPage / 5) * 5;
    pageEnd = Math.ceil(currentPage / 5) * 5;
  }
  pageEnd = pageEnd <= 500 ? pageEnd : 500;
  for (let p = pageStart + 1; p <= pageEnd; p++) pages.push(p);
  return pages;
}

export default ({
  page,
  handlePreviousPage,
  handleNextPage,
  handleChangePage,
}) => {
  const [pages, setPages] = React.useState([1, 2, 3, 4, 5]);

  React.useEffect(() => {
    setPages(generatePages(page));
  }, [page]);

  if (!page) return <></>;

  return (
    <div className="w-full pt-6 px-3 flex gap-2 sm:gap-3 md:gap-4 justify-center items-center">
      <Button onClick={handlePreviousPage} disabled={page == 1}>
        <IconChevronLeft />
      </Button>

      {pages.map((p, idx) => (
        <Button
          key={idx}
          onClick={() => handleChangePage(p)}
          disabled={page == p}
        >
          {p}
        </Button>
      ))}

      <Button onClick={handleNextPage} disabled={page == 500}>
        <IconChevronRight />
      </Button>
    </div>
  );
};
