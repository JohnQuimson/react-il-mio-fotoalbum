import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [fotos, setFotos] = useState(null);

  useEffect(() => {
    axios.get('/fotos').then(({ data }) => {
      setFotos(data);
    });
  }, []);

  return (
    <section id="dashboard" className="d-flex">
      <div className="sidebar border d-none d-md-block col-md-2">side</div>
      <div className="content border col-12 col-md-10">
        {fotos === null ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Visible</th>
                <th>Categories</th>
              </tr>
            </thead>
            <tbody>
              {fotos.map((foto) => (
                <tr key={foto.id}>
                  <td>{foto.id}</td>
                  <td>{foto.title}</td>
                  <td>{foto.description}</td>
                  <td>
                    <img
                      src={foto.img ? foto.img : 'https://placehold.co/100x100'}
                      alt="img"
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>
                  <td>{foto.visible ? 'Yes' : 'No'}</td>

                  <td>
                    {foto.categories.map((category) => (
                      <span key={category.id}>{category.name}, </span>
                    ))}
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
