import "./style.css";
import { useState } from "react";
import IconChevronLeft from "../icons/IconChevronLeft";
import IconChevronRight from "../icons/IconChevronRight";
import { useEffect } from "react";

const classButton = "text-white bg-purple-800 py-3 px-5 rounded-sm disabled:bg-[#22193888] dark:disabled:bg-[#EBEAF814]";

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
    for (let p = (pageStart + 1); p <= pageEnd; p++) pages.push(p);
    return pages;
}

export default ({ page, handlePreviousPage, handleNextPage, handleChangePage }) => {
    const [pages, setPages] = useState([1, 2, 3, 4, 5]);

    useEffect(() => {
        setPages(generatePages(page));
    }, [page]);

    return (
        <div className="w-full pt-6 flex gap-4 justify-center items-center">
            <button onClick={handlePreviousPage} className={classButton} disabled={page == 1}>
                <IconChevronLeft />
            </button>
            {pages.map((p, idx) => (
                <button key={idx} onClick={() => handleChangePage(p)} className={classButton} disabled={page == p}>
                    {p}
                </button>
            ))}
            <button onClick={handleNextPage} className={classButton} disabled={page == 500}>
                <IconChevronRight />
            </button>
        </div>
    );
}