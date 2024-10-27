import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import api, { getUrlPoster } from "../../api/config";

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
            <div className="bg-[#1414153b] dark:bg-[#EBEAF814] p-6 rounded backdrop-blur-sm grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map(({ poster_path, title, genres, id }) => {
                    return (
                        <div key={id} className="w-full min-w-48 h-80 xl:h-96 relative overflow-hidden rounded">
                            <img src={getUrlPoster(poster_path)} alt="" className="w-full h-full object-cover" />
                            <div className="p-4 w-full h-full absolute top-0 flex flex-col gap-2 justify-end items-stretch bg-card-gradient-dark">
                                <span className="w-full font-semibold leading-tight uppercase text-[#EEEEEE]">
                                    {title}
                                </span>
                                <span className="text-sm text-[#B4B4B4] leading-tight">{genres}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}