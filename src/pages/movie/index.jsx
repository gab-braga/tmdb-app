import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api, { getUrlPoster } from "../../api/config";
import ProgressCircle from "../../components/progress-circle";
import { formatDate, formatHour } from "../../helps/date";
import { abbreviateMoney } from "../../helps/number";

async function searchMovie(id) {
    const { data } = await api.get(`/movie/${id}`, {
        params: { language: "pt-BR" }
    });
    return data;
}

async function searchMovieVideo(id) {
    const { data } = await api.get(`/movie/${id}/videos`, {
        params: { language: "pt-BR" }
    });
    return Array.isArray(data.results) ? data.results : [];
}

const InfoFlash = ({ title, children, className }) => {
    const classStyle = "bg-[#23222599] backdrop-blur-sm p-4 rounded ";
    return (
        <div className={className ? classStyle + className : classStyle}>
            <h3 className="text-mauve-dark-950 text-xs font-bold uppercase mb-2">{title}</h3>
            {children}
        </div>
    );
}

export default () => {
    const [movie, setMovie] = useState({});
    const [video, setVideo] = useState({});
    const [movieGenres, setMovieGenres] = useState([]);
    const { id } = useParams();

    function getMovieGenres(movie) {
        const genres = [];
        for (let { name } of movie.genres) {
            genres.push(name);
        }
        setMovieGenres(genres);
    }

    async function loadData() {
        const movie = await searchMovie(id);
        const videos = await searchMovieVideo(id);
        setMovie(movie);
        setVideo(videos[0]);
        getMovieGenres(movie);
    }

    useEffect(() => {
        loadData();
    }, [id]);

    return (
        <main className="w-full flex-1 p-8">
            <div
                style={{ backgroundImage: `url(${getUrlPoster(movie.backdrop_path)})` }}
                className="w-full bg-cover" >
                <div className="w-full h-full bg-movie-gradient-dark p-8 flex gap-8">
                    <div className="max-w-72">
                        <img src={getUrlPoster(movie.poster_path)} className="w-full rounded" />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col justify-between gap-2">
                                <div className="flex flex-col">
                                    <h1 className="text-3xl text-mauve-dark-975 font-semibold">{movie.title}</h1>
                                    <span className="text-mauve-950">Título original: {movie.original_title}</span>
                                </div>
                                <span className="text-mauve-dark-975 italic">{movie.tagline}</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <InfoFlash title="Popularidade">
                                    <span className="text-mauve-dark-975 text-sm font-bold">
                                        {movie.popularity}
                                    </span>
                                </InfoFlash>
                                <InfoFlash title="Votos">
                                    <span className="text-mauve-dark-975 text-sm font-bold">
                                        {movie.vote_count}
                                    </span>
                                </InfoFlash>
                                <ProgressCircle progress={parseInt(movie.vote_average * 10)} size={98} />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 flex flex-col gap-4">
                                <InfoFlash title="Sinopse">
                                    <span className="text-mauve-dark-975 font-normal">
                                        {movie.overview}
                                    </span>
                                </InfoFlash>
                                <InfoFlash title="Gêneros">
                                    <div className="flex gap-2">
                                        {movieGenres.map((genre, idx) => (
                                            <span className="block p-2 text-purple-dark-975 text-xs font-semibold uppercase bg-[#C150FF2E] rounded-sm" key={idx}>{genre}</span>
                                        ))}
                                    </div>
                                </InfoFlash>
                            </div>
                            <div className="flex-1 flex gap-4 flex-wrap items-start content-start">
                                <InfoFlash title="Lançamento" className="flex-1 max-w-36">
                                    <span className="text-mauve-dark-975 text-sm font-bold">
                                        {formatDate(movie.release_date)}
                                    </span>
                                </InfoFlash>
                                <InfoFlash title="Duração" className="flex-1 max-w-36">
                                    <span className="text-mauve-dark-975 text-sm font-bold">
                                        {formatHour(movie.runtime)}
                                    </span>
                                </InfoFlash>
                                <InfoFlash title="Situação" className="flex-1 max-w-36">
                                    <span className="text-mauve-dark-975 text-sm font-bold">
                                        {movie.status}
                                    </span>
                                </InfoFlash>
                                <InfoFlash title="Idioma" className="flex-1 max-w-36">
                                    <span className="text-mauve-dark-975 text-sm font-bold">
                                        {movie.original_language}
                                    </span>
                                </InfoFlash>
                                <InfoFlash title="Orçamento" className="flex-1 max-w-36">
                                    <span className="text-mauve-dark-975 text-sm font-bold">
                                        ${abbreviateMoney(movie.budget)}
                                    </span>
                                </InfoFlash>
                                <InfoFlash title="Receita" className="flex-1 max-w-36">
                                    <span className="text-mauve-dark-975 text-sm font-bold">
                                        ${abbreviateMoney(movie.revenue)}
                                    </span>
                                </InfoFlash>
                                <InfoFlash title="Lucro" className="flex-1 max-w-36">
                                    <span className="text-mauve-dark-975 text-sm font-bold">
                                        ${abbreviateMoney(movie.revenue - movie.budget)}
                                    </span>
                                </InfoFlash>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-mauve-dark-975 font-bold mt-8 mb-4">Trailer</h2>

            <iframe width="560" height="315" title={video.name}
                className="w-full h-[600px]"
                src={`https://www.youtube.com/embed/${video.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen></iframe>
        </main>
    );
}