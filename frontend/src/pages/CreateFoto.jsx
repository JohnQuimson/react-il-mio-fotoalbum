import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosClient';
import FormFotos from '../components/FormFotos';
import { FaArrowLeftLong } from 'react-icons/fa6';

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
      navigate(`/`);
    }
  };

  return (
    <>
      <section id="create">
        <div className="create-form-cont">
          <h1 className="text-center">Crea</h1>
          <Link to="/" relative="path" className="go-back">
            <FaArrowLeftLong />
          </Link>
          <FormFotos onSubmit={createFoto} />
        </div>
      </section>
    </>
  );
}
