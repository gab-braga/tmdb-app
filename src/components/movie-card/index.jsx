import "./style.css";
import { getUrlPoster } from "../../api/config";
import ProgressCircle from "../progress-circle";
import { Link } from "react-router-dom";

export default ({ id, poster_path, genres, title, vote_average }) => {
    return (
        <Link to={`/movies/${id}`} className="movie-card block w-full min-w-48 h-80 xl:h-96 relative overflow-hidden rounded">
            <img src={getUrlPoster(poster_path)} alt="" className="w-full h-full object-cover" />
            <div className="p-4 w-full h-full absolute top-0 left-0 flex flex-col gap-2 justify-end items-stretch bg-card-gradient-dark">
                <div className="movie-rating w-full h-full absolute top-0 left-0 flex justify-center items-center">
                    <ProgressCircle progress={parseInt(vote_average * 10)} size={140} />
                </div>
                <span className="w-full font-semibold leading-tight uppercase text-[#EEEEEE]">
                    {title}
                </span>
                <span className="movie-genres text-sm text-[#B4B4B4] leading-tight">{genres}</span>
            </div>
        </Link>
    );
}