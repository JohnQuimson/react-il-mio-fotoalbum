import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';

export default function ({ id, title, description, img, visible, categories }) {
  return (
    <>
      <Link to="/" relative="path" className="go-back">
        <FaArrowLeftLong />
      </Link>
      <div className="foto-card">
        <div className={`foto ${visible ? 'visible' : ''}`}>
          {/* Img */}
          <div className="card-image">
            {img != null ? (
              <img src={img} alt="img" />
            ) : (
              <img src="https://placehold.co/600x400" alt="placeholder" />
            )}
          </div>
          <div className="card-content ">
            <h3>{title}</h3>
            <strong>Descrizione:</strong>
            <p>{description}</p>
            {categories.length > 0 ? (
              <div className="categories">
                <strong>Categorie:</strong>
                <ul>
                  {categories.map((category, index) => (
                    <li key={`ingr${index}`}>{category}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <strong>Categorie non specificate</strong>
            )}
            <strong>Visibilità:</strong>
            {visible === true ? <TiTick /> : <ImCross />}
          </div>
        </div>
      </div>
    </>
  );
}
