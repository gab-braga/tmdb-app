import axios from "axios";

const api_key = "6bdb97704d9f7623f830d6e9ae8c0848";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key },
});

function getUrlPoster(pathImage) {
    return `https://image.tmdb.org/t/p/original/${pathImage}`;
}

export default api;
export { getUrlPoster };