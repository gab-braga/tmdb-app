import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/config";
import MovieCard from "../../components/movie-card";

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
        setMovies(movies)
    }

    useEffect(() => {
        loadData()
    }, [page]);

    return (
        <main className="w-full flex-1 p-8">
            <div className="bg-[#1414153b] dark:bg-[#EBEAF814] p-6 rounded backdrop-blur-sm grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {movies.map((movie, idx) => <MovieCard {...movie} key={idx} />)}
            </div>
        </main>
    );
}