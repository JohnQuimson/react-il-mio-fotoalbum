import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function () {
  const [fotos, setFotos] = useState(null);

  useEffect(() => {
    axios.get('/fotos').then(({ data }) => setFotos(data));
  }, []);

  console.log(fotos);

  const { isLoggedIn, logout, user } = useAuth();

  return (
    <>
      <h1>foto</h1>
      {isLoggedIn && <Link to="create">Crea Nuova Pizza</Link>}
      {fotos === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {fotos.map((f) => (
            <li key={`foto${f.id}`}>
              <Link to={`/fotos/${f.id}`} state={{ foto: f }}>
                {f.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
