import React, { useRef } from 'react';
import { setTrainerName } from '../store/slices/trainerName.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import pokedexTitle from '../assets/pokedex-title.png';
import './styles/homePage.css';
import { FooterLogo } from "./FooterLogo";

const HomePage = () => {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTrainerName(textInput.current.value.trim()));
    navigate('/pokedex');
  }

  return (
    <div className='home__container'>
      <figure className='homepage__img'>
        <img src={pokedexTitle} alt="pokedex logo" />
      </figure>

        <div className='body'>
            <div className='title'>
              <h1>!Hola entrenador¡</h1>
              <br />
              <h3>Para poder comenzar, dame tu nombre</h3>
            </div>

            <form onSubmit={handleSubmit} className='form__homepage'>
              <input type="text" ref={textInput} />
              <button>Comenzar</button>
            </form>
        </div>

        <footer className='footer'>
            <FooterLogo />
        </footer>
    </div>
  )
}

export default HomePage;