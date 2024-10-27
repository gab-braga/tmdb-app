import "./style.css";
import { getUrlPoster } from "../../api/config";

export default ({ poster_path, genres, title }) => {
    return (
        <div className="movie-card w-full min-w-48 h-80 xl:h-96 relative overflow-hidden rounded">
            <img src={getUrlPoster(poster_path)} alt="" className="w-full h-full object-cover" />
            <div className="p-4 w-full h-full absolute top-0 flex flex-col gap-2 justify-end items-stretch bg-card-gradient-dark">
                <span className="w-full font-semibold leading-tight uppercase text-[#EEEEEE]">
                    {title}
                </span>
                <span className="movie-genres hidden text-sm text-[#B4B4B4] leading-tight">{genres}</span>
            </div>
        </div>
    );
}