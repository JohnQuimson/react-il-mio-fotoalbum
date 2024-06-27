import axios from './utils/axiosClient.js';
import Form from './components/Form';
import ElencoPost from './components/ElencoFoto.jsx';

export default function () {
  const [response, setResponse] = useState(null);

  const fetchFotos = async () => {
    try {
      setResponse(null);
      const { data: response } = await axios.get('/fotos');
      setResponse(response);
      console.log('Foto ricevute:', response);
    } catch (error) {
      console.error('Errore durante il recupero dei post:', error);
      // Gestisci l'errore, ad esempio mostrando un messaggio di errore all'utente
    }
  };

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data: array } = await axios.get(`/categories`);
      setCategories(array);
      console.log('Categorie ricevute:', array);
    } catch (error) {
      console.error('Errore durante il recupero delle Categories:', error);
      // Gestisci l'errore, ad esempio mostrando un messaggio di errore all'utente
    }
  };

  useEffect(() => {
    fetchFotos();
    fetchCategories();
  }, []);

  return (
    <>
      <ElencoFoto response={response} />
    </>
  );
}
