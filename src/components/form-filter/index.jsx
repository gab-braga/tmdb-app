import "./style.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconFilter from "../icons/IconFilter";
import IconSearch from "../icons/IconSearch";

export default ({ submit }) => {
    const [isFilterActive, setFilterActive] = useState(false);
    const { handleSubmit, register, watch } = useForm();

    const query = watch("query");
    const sort_by = watch("sort_by");
    const language = watch("language");
    const include_adult = watch("include_adult");
    const primary_release_year = watch("primary_release_year");

    function sendFormData() {
        submit({
            query,
            sort_by,
            language,
            include_adult,
            primary_release_year
        });
    }

    function handleToggleFilter() {
        const toggleFilter = !isFilterActive;
        setFilterActive(toggleFilter);
        if (toggleFilter)
            sendFormData();
        else submit({ query });
    }

    function handleFormSubmit() {
        if (isFilterActive)
            sendFormData();
        else submit({ query });
    }

    useEffect(() => {
        handleFormSubmit();
    }, [sort_by, language, include_adult, primary_release_year]);

    return (
        <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="w-full flex gap-2.5 justify-center items-center pb-4">
                <div className="flex-1 flex justify-center items-center max-w-[488px]">
                    <input type="text" {...register("query")} className="w-full h-14 p-4 bg-mauve-100 dark:bg-mauve-dark-100 border-t border-b border-l border-mauve-600 dark:border-mauve-dark-600 rounded-s outline-none text-mauve-dark-100 dark:text-white" placeholder="Pesquise por filmes" />
                    <button className="h-14 px-4 bg-mauve-100 dark:bg-mauve-dark-100 border-t border-b border-r border-mauve-600 dark:border-mauve-dark-600 flex justify-center items-center rounded-e outline-none">
                        <IconSearch className="text-mauve-950 dark:text-mauve-dark-950" />
                    </button>
                </div>
                <button type="button" className="w-14 h-14 flex justify-center items-center bg-[#b844f728] dark:bg-[#B744F714] backdrop-blur-sm rounded outline-none" onClick={handleToggleFilter}>
                    <IconFilter className="text-mauve-950 dark:text-mauve-dark-950" />
                </button>
            </div>
            {isFilterActive && (
                <div className="w-full flex flex-wrap gap-2.5 justify-center items-center pb-6">
                    <select {...register("sort_by")} className="flex-1 p-4 min-w-52 xs:min-w-60 text-mauve-dark-100 dark:text-white bg-mauve-100 dark:bg-mauve-dark-100 border border-mauve-600 dark:border-mauve-dark-600 rounded outline-none">
                        <option value="popularity.desc">Popularidade</option>
                        <option value="title.asc">Título</option>
                        <option value="vote_average.desc">Avaliação</option>
                        <option value="primary_release_date.desc">Data de Lançamento</option>
                    </select>

                    <select {...register("language")} className="flex-1 p-4 min-w-52 xs:min-w-60 text-mauve-dark-100 dark:text-white bg-mauve-100 dark:bg-mauve-dark-100 border border-mauve-600 dark:border-mauve-dark-600 rounded outline-none">
                        <option value="pt-BR">Português</option>
                        <option value="en">Inglês</option>
                        <option value="es">Espanhol</option>
                        <option value="fr">Francês</option>
                        <option value="de">Alemão</option>
                        <option value="it">Italiano</option>
                        <option value="ja">Japonês</option>
                        <option value="ko">Coreano</option>
                        <option value="ru">Russo</option>
                        <option value="zh">Chinês</option>
                        <option value="ar">Árabe</option>
                        <option value="hi">Hindi</option>
                        <option value="tr">Turco</option>
                        <option value="nl">Holandês</option>
                        <option value="sv">Sueco</option>
                        <option value="no">Norueguês</option>
                        <option value="fi">Finlandês</option>
                        <option value="da">Dinamarquês</option>
                        <option value="pl">Polonês</option>
                        <option value="el">Grego</option>
                        <option value="he">Hebraico</option>
                        <option value="cs">Tcheco</option>
                        <option value="hu">Húngaro</option>
                        <option value="th">Tailandês</option>
                        <option value="ro">Romeno</option>
                        <option value="bg">Búlgaro</option>
                        <option value="uk">Ucraniano</option>
                        <option value="vi">Vietnamita</option>
                        <option value="ms">Malaio</option>
                        <option value="id">Indonésio</option>
                        <option value="fa">Persa</option>
                    </select>

                    <select {...register("include_adult")} className="flex-1 p-4 min-w-52 xs:min-w-60 text-mauve-dark-100 dark:text-white bg-mauve-100 dark:bg-mauve-dark-100 border border-mauve-600 dark:border-mauve-dark-600 rounded outline-none">
                        <option value={false}>Não incluir adulto</option>
                        <option value={true}>Incluir adulto</option>
                    </select>

                    <input type="number" {...register("primary_release_year", { min: 1700, max: 2100 })} className="flex-1 p-4 min-w-52 xs:min-w-60 text-mauve-dark-100 dark:text-white bg-mauve-100 dark:bg-mauve-dark-100 border border-mauve-600 dark:border-mauve-dark-600 rounded outline-none" placeholder="Ano de Lançamento" />
                </div>
            )}
        </form>
    );
}