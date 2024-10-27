import axios from "axios";

const api_key = "";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key },
});

function getUrlPoster(pathImage) {
    return `https://image.tmdb.org/t/p/original/${pathImage}`;
}

export default api;
export { getUrlPoster };