import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';

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
            <li key={`foto${f.id}`}>{f.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
