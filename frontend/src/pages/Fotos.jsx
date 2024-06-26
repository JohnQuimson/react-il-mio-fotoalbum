import { useEffect, useState } from 'react';
import axios from '../utils/axiosClient';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AboutFotographer from '../components/AboutFotographer';
import { MdKeyboardArrowUp } from 'react-icons/md';

export default function () {
  const [fotos, setFotos] = useState(null);
  const [filteredFotos, setFilteredFotos] = useState(null);
  const [categories, setCategories] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    axios.get('/fotos').then(({ data }) => {
      setFotos(data);

      const allCategories = data.reduce((acc, curr) => {
        curr.categories.forEach((category) => {
          if (!acc.includes(category.name)) {
            acc.push(category.name);
          }
        });
        return acc;
      }, []);
      setCategories(allCategories);
    });

    // gestore per tornare su
    const handleScroll = () => {
      const goUpButton = document.querySelector('.go-up');
      if (window.scrollY > 300) {
        goUpButton.style.display = 'block';
      } else {
        goUpButton.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCategoryFilter = (category) => {
    if (!category) {
      setFilteredFotos(null);
    } else {
      const filtered = fotos.filter((foto) =>
        foto.categories.some((cat) => cat.name === category)
      );
      setFilteredFotos(filtered);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AboutFotographer />

      <section id="fotos" className="pt-4 pb-5">
        {/* WORK HEADER */}
        <div className="work-header d-flex justify-content-between">
          <h3 className="text-start px-4 m-0">My work</h3>

          {/* Categ Filter */}
          <div className="categ-filter text-end px-4 m-0">
            <select onChange={(e) => handleCategoryFilter(e.target.value)}>
              <option value="">tutte le foto</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {fotos === null ? (
          <p>Loading...</p>
        ) : (
          <ul className="row m-0 p-0">
            {(filteredFotos || fotos).map((f) => (
              <li
                key={`foto${f.id}`}
                className="col-12 col-sm-6 col-md-4 col-xl-3 g-4"
              >
                <Link to={`/fotos/${f.id}`} state={{ foto: f }}>
                  <img
                    src={f.img ? f.img : 'https://placehold.co/10x10'}
                    alt="img"
                    style={{ width: '100%', height: 'auto' }}
                    className={f.visible ? 'visible' : 'invisible'}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="go-up" onClick={scrollToTop}>
          <MdKeyboardArrowUp />
        </div>
      </section>
    </>
  );
}
