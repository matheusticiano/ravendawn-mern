import React from 'react';
import { Link } from 'react-router-dom'; // Importe o componente Link do React Router, se estiver usando roteamento
import './HomeContainer.css';

const HomeContainer = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Ravendawn Tavern!</h1>
      <p>
        Sou um fã dedicado ao jogo Ravendawn e criei este site para ajudar e compartilhar conhecimento com outros jogadores. Aqui você encontrará guias, dicas, notícias e muito mais para melhorar sua experiência no jogo. Nossa comunidade está sempre pronta para ajudar e trocar informações. Fique à vontade para explorar e aproveitar ao máximo o nosso conteúdo!
      </p>
      <p>Fique a vontade para ver as hunts!</p>
      <p>Para interagir com outros usuarios porfavor cadastre-se ou faça login!</p>
      <div className="button-container">
        <Link to="/login" className='link'>
          <button>Login</button>
        </Link>
        <Link to="/cadastro" className='link'>
          <button>Cadastro</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeContainer;
