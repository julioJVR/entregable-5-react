import React, { useEffect } from 'react';
import useFetch from '../store/hooks/useFetch';
import { useParams } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import './styles/pokeIdPage.css';
import { HeaderImg } from './HeaderImg';

const PokeIdPage = () => {
    const [pokeData, getPokeData] = useFetch();
    const param = useParams();

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`;
        getPokeData(url);
    }, []);

    const pokemonName = pokeData?.name;
    const abilities = pokeData?.abilities;
    const types = pokeData?.types;
    const moves = pokeData?.moves;
    const height = pokeData?.height;
    const weight = pokeData?.weight;
    const pokemonImg = pokeData?.sprites.other['official-artwork'].front_default;

    const stats = pokeData?.stats.filter(i => {
        return !i.stat.name.includes('special');
    });
    
    return (
        <article className="container">
            <HeaderImg className='header__img'/>

            <div className="card">
                <div className="gradient"></div>

                <figure>
                    <img src={pokemonImg} alt={pokemonName} />
                </figure>

                <hr />
                <h1>#{param.id}</h1>
                <hr />

                <h2 className="title">{pokemonName}</h2>

                <div className="corporal__units">
                    <div className="individual__unit">
                        <span className='peso'><strong>Peso</strong></span>
                        <span className='individual'>{weight}</span>
                    </div>

                    <div className="individual__unit">
                        <span className='altura'><strong>Altura</strong></span>
                        <span className='individual'>{height}</span>
                    </div>
                </div>

                <section className="poke__type__container">
                    <div>
                        <h3>Tipo</h3>
                        <br />
                        <ul className='poke__type__card'>
                            {types?.map((type) => (
                                <li key={type.type.url}>
                                    <span className='poke__type'>
                                        {type.type.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3>Habilidades</h3>
                        <br />
                        <ul className='poke__type__card'>
                            {abilities?.map(ability => (
                                <li key={ability.ability.url}>
                                    <span className='poke__type'>{ability.ability.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="stats__section">
                    <div>
                        <h2>Stats</h2>
                    </div>

                    <ul>
                        {stats?.map(stat => (
                            <li key={stat.stat.url}>
                                <div className="stat__labels">
                                    <span className='poke__type'>{stat.stat.name}:</span>
                                    <span className='poke__type stat-numbre'>{stat.base_stat}/100</span>
                                </div>

                                <ProgressBar
                                    completed={`${stat.base_stat}`}
                                    bgColor='black'
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <section className="card">
                <div>
                    <h2>Movements</h2>
                    <hr />
                </div>

                <ul className='grid-list'>
                    {moves?.map(m => (
                        <li key={m.move.url}>
                            <span className='tag black-text'>{m.move.name}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </article >
    );
};

export default PokeIdPage;