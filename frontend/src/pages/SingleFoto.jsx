import axios from '../utils/axiosClient';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FotoCard from '../components/FotoCard';

export default function SingleFoto() {
  const { id } = useParams();
  const [foto, setFoto] = useState(null);
  const [fotoError, setFotoError] = useState(null);

  useEffect(() => {
    setFotoError(null);
    axios
      .get(`/fotos/${id}`)
      .then(({ data }) => setFoto(data))
      .catch((err) => setFotoError(err));
  }, [id]);

  const navigate = useNavigate();

  const deleteFoto = async (id) => {
    await axios.delete(`/fotos/${id}`);
    navigate('/fotos');
  };

  if (fotoError) {
    return <div>Errore nel caricamento della foto: {fotoError.message}</div>;
  }

  if (!foto) {
    return <div>Caricando foto...</div>;
  }

  return (
    <>
      <div className="single-foto">
        <FotoCard
          id={foto.id}
          title={foto.title}
          description={foto.description}
          img={foto.img}
          visible={foto.visible}
          categories={foto.categories.map((i) => i.name)}
        />
        <button onClick={() => deleteFoto(foto.id)}>Delete</button>
      </div>
    </>
  );
}
