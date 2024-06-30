import React, { useState } from 'react';
import axios from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function ContactForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    content: '',
    name: '',
    surname: '',
  });

  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/messages', formData);
      console.log('Messaggio inviato con successo:', response.data);
      setMessageSent(true);
      setFormData({
        email: '',
        content: '',
        name: '',
        surname: '',
      });
    } catch (error) {
      console.error("Errore durante l'invio del messaggio:", error);
    }
  };

  return (
    <>
      <section id="contacts">
        <form onSubmit={handleSubmit} className="">
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
            <label htmlFor="surname">Cognome:</label>
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
            <label htmlFor="content">Messaggio:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Invia</button>
          {messageSent && <p>Messaggio inviato correttamente!</p>}
        </form>
      </section>
    </>
  );
}
