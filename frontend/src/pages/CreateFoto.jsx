import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosClient';
import FormFotos from '../components/FormFotos';

export default function () {
  const navigate = useNavigate();

  const createFoto = async (formData) => {
    console.log(formData);
    //logica per salvare la pizza nel database
    const res = await axios.post(`/fotos`, formData, {
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
    <>
      <div>
        <Link to="../" relative="path">
          Go Back
        </Link>
        <FormFotos onSubmit={createFoto} />
      </div>
    </>
  );
}
