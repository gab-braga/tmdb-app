import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/config";
import MovieCard from "../../components/movie-card";
import Pagination from "../../components/pagination";
import IconSearch from "../../components/icons/IconSearch";

async function searchGenres() {
    const { data } = await api.get("/genre/movie/list", {
        params: { language: "pt-BR" }
    });
    return data.genres;
}

async function searchMovies(page) {
    const { data } = await api.get("/discover/movie", {
        params: {
            page,
            include_adult: false,
            language: "pt-BR",
            sort_by: "popularity.desc",
        }
    });
    return data.results;
}

async function addGenres(movies) {
    const genres = await searchGenres();
    for (const movie of movies) {
        movie.genres = [];
        for (const id of movie.genre_ids) {
            const genre = genres.find(g => g.id == id);
            movie.genres.push(genre.name);
        }
        movie.genres = movie.genres.join(", ");
    }
}

export default () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    async function loadData() {
        const movies = await searchMovies(page);
        await addGenres(movies);
        setMovies(movies);
    }

    function handlePreviousPage() {
        const previous = page - 1;
        if (previous >= 1) setPage(value => value - 1);
    }

    function handleNextPage() {
        const next = page + 1;
        if (next <= 500) setPage(value => value + 1);
    }

    function handleChangePage(newPage) {
        if (newPage >= 1 && newPage <= 500) setPage(newPage);
    }

    useEffect(() => {
        loadData()
    }, [page]);

    return (
        <main className="w-full flex-1 p-8">
            <div className="w-full flex justify-center items-center pb-6">
                <div className="flex-1 flex justify-center items-center max-w-[488px]">
                    <input type="text" className="w-full h-14 p-4 bg-mauve-100 dark:bg-mauve-dark-100 border-t border-b border-l border-mauve-600 dark:border-mauve-dark-600 rounded-s outline-none text-mauve-dark-100 dark:text-white" placeholder="Pesquise por filmes" />
                    <button className="w-14 h-14 bg-mauve-100 dark:bg-mauve-dark-100 border-t border-b border-r border-mauve-600 dark:border-mauve-dark-600 flex justify-center items-center rounded-e outline-none">
                        <IconSearch className="text-mauve-950 dark:text-mauve-dark-950" />
                    </button>
                </div>
            </div>
            <div className="bg-[#1414153b] dark:bg-[#EBEAF814] p-6 rounded backdrop-blur-sm grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {movies.map((movie, idx) => <MovieCard {...movie} key={idx} />)}
            </div>
            <Pagination {...{ page, handlePreviousPage, handleNextPage, handleChangePage }} />
        </main>
    );
}