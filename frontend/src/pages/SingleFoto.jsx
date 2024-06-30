import axios from '../utils/axiosClient';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FotoCard from '../components/FotoCard';
import { useAuth } from '../contexts/AuthContext';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

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

  const { isLoggedIn } = useAuth();

  return (
    <>
      <section id="single-foto" className="">
        <div className="d-flex flex-column">
          <FotoCard
            id={foto.id}
            title={foto.title}
            description={foto.description}
            img={foto.img}
            visible={foto.visible}
            categories={foto.categories.map((i) => i.name)}
          />

          {isLoggedIn && (
            <div className="edit-foto">
              <Link to={`/fotos/${id}/edit`} className="edit">
                <FaEdit />
              </Link>
              <button onClick={() => deleteFoto(foto.id)} className="delete">
                <FaTrashCan />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
