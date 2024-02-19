import React, { useEffect, useRef } from 'react';
import useFetch from '../../store/hooks/useFetch';
import { setPokemonName } from '../../store/slices/pokemonName.slice';
import { useDispatch } from 'react-redux';

const SelectType = ({setSelectValue}) => {

    const [ types, getTypes ] = useFetch();
    const dispatch = useDispatch();

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/type';
        getTypes(url);
    }, []);

    const textSelect = useRef();

    const handleChange = () => {
        setSelectValue(textSelect.current.value);
        dispatch(setPokemonName(''));
    }
    
  return (
    <select onChange={handleChange} ref={textSelect} className='input__select'>
        <option value="allPokemons">All Pokemos</option>
        {
            types?.results.map(type => (
                <option key={type.url} value={type.url}>
                    {type.name}
                </option>
            ))
        }
    </select>
  )
}

export default SelectType;