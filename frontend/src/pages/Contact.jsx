import React from 'react';
import axios from '../utils/axiosClient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function () {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    content: '',
    name: '',
    surname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/messages', formData);
      console.log('Messaggio inviato con successo:', response.data);
      navigate('/');
    } catch (error) {
      console.error("Errore durante l'invio del messaggio:", error);
    }
  };
  return (
    <>
      <section id="contacts">
        <form onSubmit={handleSubmit} className="border">
          <div className="cont-info">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cont-info">
            <label htmlFor="name">Cognome:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cont-info">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cont-info">
            <label htmlFor="message">Messaggio:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Invia Messaggio</button>
        </form>
      </section>
    </>
  );
}
