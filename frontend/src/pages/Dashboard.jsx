import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';
import { useAuth } from '../contexts/AuthContext';
import { FaRegEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from 'react-icons/gi';

const Dashboard = () => {
  const urlPages = [
    {
      label: 'Home',
      href: '/',
    },

    {
      label: 'Contatti',
      href: '/contacts',
    },
  ];

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
    <section id="dashboard">
      <div className="cont d-flex">
        {/* SIDEBAR */}
        <div
          className="sidebar offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-header">
            {/* title */}
            <div className="offcanvas-title" id="offcanvasScrollingLabel">
              {user.name && <h1 className="mb-0">Ciao {user.name}!</h1>}
              {user.email && <p className="mb-0">{user.email}</p>}
            </div>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          {/* body */}
          <div className="offcanvas-body">
            <div className="admin-info p-3">
              <Link to="/fotos/create" className="crea-foto">
                Crea Foto
              </Link>

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
        {/* CONTENT */}
        <div className="content col-12 col-md-10">
          <div className="navbar">
            <button
              className="hamburger-menu"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
            >
              <GiHamburgerMenu />
            </button>
            <menu className="d-flex align-items-center list-unstyled ">
              {urlPages.map(({ label, href }, i) => (
                <li key={`urlPage${i}`} className="mx-3 ">
                  <NavLink to={href} className="text-decoration-none">
                    {label}
                  </NavLink>
                </li>
              ))}

              {!isLoggedIn && (
                <>
                  <li className="d-flex flex-column align-items-center access">
                    <NavLink to={`/login`} className="login-btn">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="user">
                  <NavLink to={`/dashboard`} className="user">
                    {user.name && <span>{user.name}</span>}
                  </NavLink>
                </li>
              )}
            </menu>
          </div>
          {fotos === null ? (
            <p>Loading...</p>
          ) : (
            <div className="cont-table p-3">
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
                          src={
                            foto.img ? foto.img : 'https://placehold.co/100x100'
                          }
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
