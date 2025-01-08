import React from 'react';
import { Link } from 'react-router-dom';
import { getUrlPoster } from '../../api/config';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import StandardPoster from '../../assets/movie.png';
import './MovieCard.css';

export default ({ id, poster_path, genres, title, vote_average }) => {
  const [poster, setPoster] = React.useState(StandardPoster);

  React.useEffect(() => {
    if (poster_path) setPoster(getUrlPoster(poster_path));
    else setPoster(StandardPoster);
  }, [poster_path]);

  return (
    <Link
      to={`/movies/${id}`}
      className="movie-card pb-[150%] bg-black relative overflow-hidden rounded z-0"
    >
      <img
        src={poster}
        alt={title}
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />

      <div className="p-4 w-full h-full absolute top-0 left-0 flex flex-col gap-2 justify-end items-stretch bg-card-gradient-dark z-20">
        <div className="movie-rating w-full h-full absolute top-0 left-0 flex justify-center pt-[10%] sm:pt-[30%]">
          <ProgressCircle progress={parseInt(vote_average * 10)} size={140} />
        </div>
        <span className="w-full text-sm sm:text-base font-semibold leading-tight uppercase text-[#EEEEEE] overflow-hidden">
          {title}
        </span>
        <span className="movie-genres text-xs sm:text-sm text-[#B4B4B4] leading-tight">
          {genres}
        </span>
      </div>
    </Link>
  );
};
