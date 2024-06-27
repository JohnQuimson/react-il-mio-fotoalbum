import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';
import { Link, useSearchParams } from 'react-router-dom';

export default function () {
  const [fotos, setFotos] = useState(null);

  useEffect(() => {
    axios.get('/fotos').then(({ data }) => setFotos(data));
  }, []);

  console.log(fotos);

  return (
    <>
      <h1>foto</h1>
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
