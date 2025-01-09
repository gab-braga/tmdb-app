import React from 'react';
import api from '../api/config';

const MoviesContext = React.createContext();

export function MoviesProvider({ children }) {
  const getMovies = React.useCallback(async (page, params) => {
    const movies = await fetchMovies({ page, ...params });
    const genres = await fetchGenres();
    return await mapMoviesAndGenres(movies, genres);
  }, []);

  return (
    <MoviesContext.Provider value={{ getMovies }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  return React.useContext(MoviesContext);
}

async function fetchMovies(data = {}) {
  const params = {
    include_adult: false,
    language: 'pt-BR',
    sort_by: 'popularity.desc',
    ...data,
  };
  const endpoint = params.query ? '/search/movie' : '/discover/movie';
  const response = await api.get(endpoint, { params });
  return response.data.results;
}

async function fetchGenres() {
  const response = await api.get('/genre/movie/list', {
    params: { language: 'pt-BR' },
  });
  return response.data.genres;
}

async function mapMoviesAndGenres(movies = [], genres = []) {
  const results = [...movies];
  for (const movie of results) {
    movie.genres = [];
    const genre_ids = movie.genre_ids || [];
    for (const id of genre_ids) {
      const genre = genres.find((gen) => gen.id == id);
      movie.genres.push(genre.name);
    }
    movie.genres = movie.genres.join(', ');
  }
  return results;
}
