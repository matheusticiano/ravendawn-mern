import React, { useState, useEffect } from 'react';
import newRequest from '../utils/newRequest';
import './LikeButton.css';
import { useNavigate } from 'react-router-dom';

const LikeButton = ({ huntId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getLikesCount();
  }, []);
  
  const checkAuthentication = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return !!currentUser;
  };
  
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const isAuthenticated = await checkAuthentication();
      setUserLoggedIn(isAuthenticated);
  
      if (isAuthenticated) {
        checkLiked();
      }
    };
  
    checkUserAuthentication();
  }, []);
  
  const checkLiked = async () => {
    try {
      const response = await newRequest.get(`hunts/${huntId}/liked`);
      setLiked(response.data.liked);
    } catch (error) {
      console.error('Erro ao verificar se o usuário deu like:', error);
    }
  };

  const getLikesCount = async () => {
    try {
      const response = await newRequest.get(`hunts/${huntId}/likes`);
      setLikesCount(response.data.likes);
    } catch (error) {
      console.error('Erro ao obter contagem de likes:', error);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await newRequest.post(`hunts/${huntId}/unlike`);
        setLikesCount(likesCount - 1);
      } else {
        await newRequest.post(`hunts/${huntId}/like`);
        setLikesCount(likesCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error('Erro ao dar like na hunt:', error);
      }
    }
  };



  return (
    <button onClick={handleLike}>
      <i className={`fa fa-star${liked ? ' liked' : ''}`}></i> {/* Ícone de estrela */}
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeButton;
