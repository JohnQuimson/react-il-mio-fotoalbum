import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';
import { useAuth } from '../contexts/AuthContext';
import { FaRegEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';

const Dashboard = () => {
  const [fotos, setFotos] = useState(null);
  const { isLoggedIn, logout, user } = useAuth();

  useEffect(() => {
    axios.get('/fotos').then(({ data }) => {
      setFotos(data);
    });
  }, []);

  const deleteFoto = async (id) => {
    await axios.delete(`/fotos/${id}`);
    // Refresh delle foto dopo l'eliminazione
    axios.get('/fotos').then(({ data }) => {
      setFotos(data);
    });
  };

  return (
    <section id="dashboard" className="d-flex">
      <div className="sidebar  d-none d-md-block col-md-2 p-0 text-center">
        <div className="sidebar-inner d-flex flex-column h-100">
          <div className="user-info p-3">
            {user.name && <h1 className="mb-0">{user.name}</h1>}
            {user.email && <p className="mb-0">{user.email}</p>}
          </div>
          <div className="admin-info p-3">
            <NavLink to={`/messages`} className="message">
              Messaggi
            </NavLink>
          </div>
          <div className="logout-btn mt-auto p-3">
            <button onClick={logout} className="btn btn-danger w-100">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="content  col-12 col-md-10">
        {fotos === null ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Descrizione</th>
                <th>Immagine</th>
                <th>Visibilità</th>
                <th>Categorie</th>
                <th>Modifica</th>
                <th>Elimina</th>
              </tr>
            </thead>
            <tbody>
              {fotos.map((foto) => (
                <tr key={foto.id}>
                  <td>{foto.title}</td>
                  <td>{foto.description}</td>
                  <td>
                    <img
                      src={foto.img ? foto.img : 'https://placehold.co/100x100'}
                      alt="img"
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>
                  <td className="text-center">
                    {foto.visible ? (
                      <GoDotFill className="visible" />
                    ) : (
                      <GoDotFill className="not-visible" />
                    )}
                  </td>
                  <td>
                    {foto.categories.map((category) => (
                      <span key={category.id}>{category.name}, </span>
                    ))}
                  </td>
                  <td className="text-center align-middle">
                    <Link to={`/fotos/${foto.id}/edit`} className="edit">
                      <FaRegEdit />
                    </Link>
                  </td>
                  <td className="text-center align-middle">
                    <button
                      onClick={() => deleteFoto(foto.id)}
                      className="btn btn-danger delete"
                    >
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
