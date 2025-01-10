import axios from 'axios';

const api_key = '6bdb97704d9f7623f830d6e9ae8c0848';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key },
});

export function getUrlPoster(pathImage) {
  return `https://image.tmdb.org/t/p/original/${pathImage}`;
}

export async function fetchMovies(data = {}) {
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

export async function fetchGenres() {
  const response = await api.get('/genre/movie/list', {
    params: { language: 'pt-BR' },
  });
  return response.data.genres;
}

export async function fetchMovie(id) {
  const { data } = await api.get(`/movie/${id}`, {
    params: { language: 'pt-BR' },
  });
  return data;
}

export async function fetchMovieVideo(id) {
  const { data } = await api.get(`/movie/${id}/videos`, {
    params: { language: 'pt-BR' },
  });
  return data.results;
}

export async function mapMoviesAndGenres(movies = [], genres = []) {
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
