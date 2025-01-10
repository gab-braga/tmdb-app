import React from 'react';
import { fetchMovies, fetchGenres, mapMoviesAndGenres } from '../../api/api';
import FormFilter from './FormFilter/FormFilter';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import './Home.css';

export default () => {
  const [loading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);

  async function loadMovies(params = {}) {
    setLoading(true);
    try {
      const movies = await fetchMovies({ page, ...params });
      const genres = await fetchGenres();
      setMovies(await mapMoviesAndGenres(movies, genres));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handlePreviousPage() {
    const previous = page - 1;
    if (previous >= 1) setPage(previous);
  }

  function handleNextPage() {
    const next = page + 1;
    if (next <= 500) setPage(next);
  }

  function handleChangePage(page) {
    if (page >= 1 && page <= 500) setPage(page);
  }

  function handleSubmitFilter(params) {
    loadMovies(params);
  }

  React.useEffect(() => {
    loadMovies();
  }, [page]);

  return (
    <main className="w-full flex-1 flex flex-col py-8 xs:px-8 max-w-[1400px] mx-auto">
      <FormFilter onSubmit={handleSubmitFilter} />

      {loading ? (
        <div className="flex-1 w-full flex justify-center items-center text-white">
          <Spinner />
        </div>
      ) : (
        <div className="flex-1 w-full grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-[#1414153b] dark:bg-[#EBEAF814] p-4 xs:p-6 rounded backdrop-blur-sm">
          {movies.map((movie) => (
            <MovieCard {...movie} key={movie.id} />
          ))}
        </div>
      )}

      <Pagination
        {...{ page, handlePreviousPage, handleNextPage, handleChangePage }}
      />
    </main>
  );
};
