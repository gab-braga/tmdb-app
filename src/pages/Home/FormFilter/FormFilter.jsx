import React from 'react';
import { useForm } from 'react-hook-form';
import Select from '../../../components/Select/Select';
import Input from '../../../components/Input/Input';
import IconSearch from '../../../components/icons/IconSearch';
import IconFilter from '../../../components/icons/IconFilter';
import './FormFilter.css';

export default ({ onSubmit }) => {
  const [isFilterActive, setFilterActive] = React.useState(false);
  const { handleSubmit, register, watch } = useForm();

  const query = watch('query');
  const sort_by = watch('sort_by');
  const language = watch('language');
  const include_adult = watch('include_adult');
  const primary_release_year = watch('primary_release_year');

  function sendFormData() {
    onSubmit({
      query,
      sort_by,
      language,
      include_adult,
      primary_release_year,
    });
  }

  function handleToggleFilter() {
    setFilterActive((value) => !value);
  }

  function handleFormSubmit() {
    if (isFilterActive) sendFormData();
    else onSubmit({ query });
  }

  React.useEffect(() => {
    handleFormSubmit();
  }, [sort_by, language, include_adult, primary_release_year]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full px-4">
      <div className="w-full flex gap-2.5 justify-center items-center pb-4">
        <div className="flex-1 flex justify-center items-center max-w-[488px]">
          <input
            {...register('query')}
            placeholder="Pesquise por filmes"
            type="text"
            className="w-full h-14 p-4 bg-mauve-100 dark:bg-mauve-dark-100 border-t border-b border-l border-mauve-600 dark:border-mauve-dark-600 rounded-s outline-none text-mauve-dark-100 dark:text-white"
          />
          <button className="h-14 px-4 bg-mauve-100 dark:bg-mauve-dark-100 border-t border-b border-r border-mauve-600 dark:border-mauve-dark-600 flex justify-center items-center rounded-e outline-none">
            <IconSearch className="text-mauve-950 dark:text-mauve-dark-950" />
          </button>
        </div>

        <button
          type="button"
          className="w-14 h-14 flex justify-center items-center bg-[#B744F714] hover:bg-[#C150FF2E] active:bg-[#B412F90A] transition-all backdrop-blur-sm rounded outline-none"
          onClick={handleToggleFilter}
        >
          <IconFilter className="text-mauve-950 dark:text-mauve-dark-950" />
        </button>
      </div>

      {isFilterActive && (
        <div className="w-full flex flex-wrap gap-2.5 justify-center items-center pb-6">
          <Select {...register('sort_by')}>
            <option value="popularity.desc">Popularidade</option>
            <option value="title.asc">Título</option>
            <option value="vote_average.desc">Avaliação</option>
            <option value="primary_release_date.desc">
              Data de Lançamento
            </option>
          </Select>

          <Select {...register('language')}>
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
          </Select>

          <Select {...register('include_adult')}>
            <option value={false}>Não incluir adulto</option>
            <option value={true}>Incluir adulto</option>
          </Select>

          <Input
            type="number"
            placeholder="Ano de Lançamento"
            {...register('primary_release_year', { min: 1700, max: 2100 })}
          />
        </div>
      )}
    </form>
  );
};
