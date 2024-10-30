import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/config";

async function searchMovie(id) {
    const { data } = await api.get(`/movie/${id}`, {
        params: { language: "pt-BR" }
    });
    return data;
}

export default () => {
    const [movie, setMovie] = useState({});
    const { id } = useParams();

    async function loadData() {
        const movie = await searchMovie(id);
        setMovie(movie);
    }

    useEffect(() => {
        loadData();
    }, [id]);

    return (
        <main className="w-full flex-1 p-8">
            <h1 className="text-white">
            {movie.title}
            </h1>
        </main>
    );
}