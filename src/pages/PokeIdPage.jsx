import React, { useEffect } from 'react';
import useFetch from '../store/hooks/useFetch';
import { useParams } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import './styles/pokeIdPage.css';

const PokeIdPage = () => {
    const [pokeData, getPokeData] = useFetch();
    const param = useParams();

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`;
        getPokeData(url);
    }, []);

    const abilities = pokeData?.abilities;
    const types = pokeData?.types;
    const moves = pokeData?.moves;

    const stats = pokeData?.stats.filter(i => {
        return !i.stat.name.includes('special');
    });
    
    // console.log(pokeData?.moves)
    console.log(moves)
    return (
        <article>
            <section>
                <figure className='img'>
                    <img
                        src={pokeData?.sprites.other['official-artwork'].front_default}
                        alt={pokeData?.name}
                    />
                </figure>

                <div className='id'>
                    <hr />
                    <h1>#{param.id}</h1>
                    <hr />
                </div>

                <div className='name'>
                    <h3>{pokeData?.name}</h3>
                </div>
                <br />
                <section>
                    <div className='tipo'>
                        <h3>Tipo</h3>
                        <br />
                        <ul>
                            {types?.map(type => (
                                <li key={type.type.url}>
                                    <span>{type.type.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='skills'>
                        <h3>Habilidades</h3>
                        <br />
                        <ul>
                            {abilities?.map(ability => (
                                <li key={ability.ability.url}>
                                    <span>{ability.ability.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <br />
                <section className='statistics'>
                    <div>
                        <h2>Stats</h2>
                    </div>
                    <br />
                    <ul>
                        {stats?.map(stat => (
                            <li key={stat.stat.url}>
                                <span>{stat.stat.name}:</span>
                                <span>{stat.base_stat}/100</span>
                                <ProgressBar
                                    completed={`${stat.base_stat}`}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
            <br />
            <section className='movements'>
                <div>
                    <h2>Movements</h2>
                    <hr />
                </div>
                <br />
                <ul className='list'>
                    {moves?.map(m => (
                        <li key={m.move.url}>
                            <span>{m.move.name}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
};

export default PokeIdPage;