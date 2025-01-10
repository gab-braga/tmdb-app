import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovie, fetchMovieVideo, getUrlPoster } from '../../api/api';
import { formatDate, formatHour } from '../../helps/date';
import { abbreviateMoney } from '../../helps/number';
import StandardPoster from '../../assets/movie.png';
import Spinner from '../../components/Spinner/Spinner';
import InfoFlash from '../../components/InfoFlash/InfoFlash';
import ProgressCircle from '../../components/ProgressCircle/ProgressCircle';
import './Movie.css';

export default () => {
  const [loading, setLoading] = React.useState(false);
  const [movie, setMovie] = React.useState({});
  const [video, setVideo] = React.useState({});
  const [movieGenres, setMovieGenres] = React.useState([]);
  const [poster, setPoster] = React.useState(StandardPoster);
  const { id } = useParams();

  function getMovieGenres(movie) {
    const genres = [];
    for (let { name } of movie.genres) genres.push(name);
    setMovieGenres(genres);
  }

  async function loadMovie() {
    setLoading(true);
    try {
      const movie = await fetchMovie(id);
      const videos = await fetchMovieVideo(id);
      setMovie(movie);
      setVideo(videos[0]);
      getMovieGenres(movie);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadMovie();
  }, [id]);

  React.useEffect(() => {
    if (movie.poster_path) {
      const urlPoster = getUrlPoster(movie.poster_path);
      setPoster(urlPoster);
    } else setPoster(StandardPoster);
  }, [movie]);

  return (
    <main className="flex-1 w-full flex flex-col p-4 xs:p-8 max-w-[1400px] mx-auto">
      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(${getUrlPoster(movie?.backdrop_path)})`,
            }}
            className="movie-info w-full bg-cover"
          >
            <div className="w-full h-full sm:dark:bg-movie-gradient-dark sm:p-8 flex flex-col items-center lg:items-start lg:flex-row gap-8">
              <div className="flex-1 min-w-64 xs:max-w-80">
                <img src={poster} className="w-full rounded" />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-wrap gap-x-8 gap-y-4 justify-between items-center">
                  <div className="flex flex-col justify-between gap-2 min-w-60 sm:min-w-80">
                    <div className="flex flex-col">
                      <h1 className="text-3xl text-mauve-975 dark:text-mauve-dark-975 font-semibold">
                        {movie?.title}
                      </h1>
                      <span className="text-mauve-950">
                        Título original: {movie?.original_title}
                      </span>
                    </div>
                    <span className="text-mauve-975 dark:text-mauve-dark-975 italic">
                      {movie?.tagline}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center min-w-60 sm:min-w-80">
                    <InfoFlash title="Popularidade">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 text-sm font-bold">
                        {movie?.popularity}
                      </span>
                    </InfoFlash>
                    <InfoFlash title="Votos">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 text-sm font-bold">
                        {movie?.vote_count}
                      </span>
                    </InfoFlash>
                    <ProgressCircle
                      progress={parseInt(movie?.vote_average * 10)}
                      size={140}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 flex flex-col gap-4 min-w-60 sm:min-w-80">
                    <InfoFlash title="Sinopse">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 font-normal">
                        {movie?.overview}
                      </span>
                    </InfoFlash>
                    <InfoFlash title="Gêneros" className="self-start">
                      <div className="flex flex-wrap gap-2">
                        {movieGenres.map((genre, idx) => (
                          <span
                            className="block p-2 text-purple-975 dark:text-purple-dark-975 text-xs font-semibold uppercase bg-[#54236e2e] dark:bg-[#C150FF2E] rounded-sm"
                            key={idx}
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </InfoFlash>
                  </div>
                  <div className="flex-1 flex gap-4 min-w-60 sm:min-w-80 flex-wrap items-start content-start">
                    <InfoFlash title="Lançamento" className="flex-1 max-w-40">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 text-sm font-bold">
                        {formatDate(movie.release_date)}
                      </span>
                    </InfoFlash>
                    <InfoFlash title="Duração" className="flex-1 max-w-40">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 text-sm font-bold">
                        {formatHour(movie.runtime)}
                      </span>
                    </InfoFlash>
                    <InfoFlash title="Situação" className="flex-1 max-w-40">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 text-sm font-bold">
                        {movie.status}
                      </span>
                    </InfoFlash>
                    <InfoFlash title="Idioma" className="flex-1 max-w-40">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 text-sm font-bold">
                        {movie.original_language}
                      </span>
                    </InfoFlash>
                    <InfoFlash title="Orçamento" className="flex-1 max-w-40">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 text-sm font-bold">
                        ${abbreviateMoney(movie.budget)}
                      </span>
                    </InfoFlash>
                    <InfoFlash title="Receita" className="flex-1 max-w-40">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 text-sm font-bold">
                        ${abbreviateMoney(movie.revenue)}
                      </span>
                    </InfoFlash>
                    <InfoFlash title="Lucro" className="flex-1 max-w-40">
                      <span className="text-mauve-975 dark:text-mauve-dark-975 text-sm font-bold">
                        ${abbreviateMoney(movie.revenue - movie.budget)}
                      </span>
                    </InfoFlash>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {video && (
            <>
              <h2 className="text-mauve-975 dark:text-mauve-dark-975 font-bold mt-8 mb-4">
                Trailer
              </h2>

              <div className="relative w-full pb-[56.25%] overflow-hidden">
                <iframe
                  width="560"
                  height="315"
                  title={video?.name}
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video?.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
};
