import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonName } from '../store/slices/pokemonName.slice';
import useFetch from '../store/hooks/useFetch';
import PokeCard from '../components/pokedexPage/PokeCard';
import SelectType from '../components/pokedexPage/SelectType';
import './styles/pokedexPage.css';
import { HeaderImg } from './HeaderImg';

const PokedexPage = () => {

  const [selectValue, setSelectValue] = useState ('allPokemons');
  const trainerName = useSelector(store => store.trainerName);
  const pokemonName = useSelector(store => store.pokemonName);
  const dispatch = useDispatch();
  const [ pokemons, getPokemons, getPerType ] = useFetch();

  useEffect(() => {
    if (selectValue==='allPokemons') {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=60';
      getPokemons(url);
    } else {
      getPerType(selectValue);
    }
  }, [selectValue]);
  
  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setPokemonName(textInput.current.value.trim().toLowerCase()));
    textInput.current.value = '';
  }


  const cbFilter = () => {
    if (pokemonName) {
      return pokemons?.results.filter(element => element.name.includes(pokemonName));
    } else {
      return pokemons?.results;
    }
  }

  return (
    <div className='pokedex'>
      <HeaderImg />
      <header className='poke__header'>
        <h3><span>Bienvenido {trainerName}, </span>Aqui podras encontrar tu pokemon favorito!!!</h3>
        <div className='form__container'>
          <form onSubmit={handleSubmit}>
            <input type="text" ref={textInput} className='input__text'/>
            <button className='btn__search'>Buscar</button>
          </form>
          <SelectType
            setSelectValue={setSelectValue}
          />
        </div>
      </header>
      <section className='poke__container'>
        {
          cbFilter()?.map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </section>
    </div>
  )
}

export default PokedexPage;