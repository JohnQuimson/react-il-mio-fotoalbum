import axios from '../utils/axiosClient';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormFotos from '../components/FormFotos';

export default function () {
  const { id } = useParams();

  const navigate = useNavigate();

  const [dataToEdit, setDataToEdit] = useState(null);

  const fetchDataToEdit = async () => {
    const url = `/fotos/${id}`;
    const { data: f } = await axios.get(url);
    setDataToEdit({
      title: f.title,
      description: f.description,
      img: '',
      visible: f.visible,
      categories: f.categories.map((i) => i.id),
    });
  };

  useEffect(() => {
    fetchDataToEdit();
    return () => {
      setDataToEdit(null);
    };
  }, [id]);

  const updateFoto = async (formData) => {
    console.log(formData);
    //logica per salvare la pizza nel database
    const res = await axios.put(`/fotos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res);
    if (res.status < 400) {
      navigate(`/fotos/${res.data.id}`);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <menu>
          <li>
            <Link to="../" relative="path">
              Annulla
            </Link>
          </li>
        </menu>
      </nav>
      {dataToEdit === null ? (
        <div>Loading...</div>
      ) : (
        <FormFotos initialData={dataToEdit} onSubmit={updateFoto} />
      )}
    </div>
  );
}
