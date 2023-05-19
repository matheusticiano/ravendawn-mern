import React, { useState, useEffect } from 'react';
import newRequest from '../utils/newRequest';
import './SaveHunts.css';
import { useNavigate } from 'react-router-dom';

const SaveHunt = ({ huntId }) => {
  const [saved, setSaved] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkSaved();
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
        checkSaved();
      }
    };

    checkUserAuthentication();
  }, []);

  const checkSaved = async () => {
    try {
      const response = await newRequest.get(`hunts/${huntId}/saved`);
      setSaved(response.data.saved);
    } catch (error) {
      console.error('Erro ao verificar se a hunt está salva:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (saved) {
        await newRequest.post(`hunts/${huntId}/unsave`);
      } else {
        await newRequest.post(`hunts/${huntId}/save`);
      }
      setSaved(!saved);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error('Erro ao salvar a hunt:', error);
      }
    }
  };

  return (
    <button onClick={handleSave}>
      <i className={`fa fa-bookmark${saved ? ' saved' : ''}`}></i> {/* Ícone de bookmark */}
    </button>
  );
};

export default SaveHunt;
