import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/config";
import FormFilter from "../../components/form-filter";
import MovieCard from "../../components/movie-card";
import Pagination from "../../components/pagination";

async function searchGenres() {
    const { data } = await api.get("/genre/movie/list", {
        params: { language: "pt-BR" }
    });
    return data.genres;
}

async function searchMovies(data = {}) {
    const params = { ...data };
    if (!params.include_adult) params.include_adult = false;
    if (!params.language) params.language = "pt-BR";
    if (!params.sort_by) params.sort_by = "popularity.desc";

    if (params.query) {
        const { data } = await api.get("/search/movie", { params });
        return data.results;
    } else {
        const { data } = await api.get("/discover/movie", { params });
        return data.results;
    }
}

async function addMovieGenres(data = []) {
    const movies = [...data];
    const genres = await searchGenres();
    
    for (const movie of movies) {
        movie.genres = [];
        const ids =  movie.genre_ids || [];
        for (const id of ids) {
            const genre = genres.find(g => g.id == id);
            movie.genres.push(genre.name);
        }
        movie.genres = movie.genres.join(", ");
    }
}

export default () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [paramsQuery, setQueryParams] = useState({});

    async function loadData() {
        const movies = await searchMovies({ page, ...paramsQuery });
        await addMovieGenres(movies);
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

    function handleSubmitFilter(formData) {
        setQueryParams(formData);
    }

    useEffect(() => {
        loadData();
    }, [page, paramsQuery]);

    return (
        <main className="w-full flex-1 py-8 xs:px-8 max-w-[1400px] mx-auto">
            <FormFilter submit={handleSubmitFilter} />
            <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-[#1414153b] dark:bg-[#EBEAF814] p-4 xs:p-6 rounded backdrop-blur-sm">
                {movies.map((movie, idx) => <MovieCard {...movie} key={idx} />)}
            </div>
            <Pagination {...{ page, handlePreviousPage, handleNextPage, handleChangePage }} />
        </main>
    );
}