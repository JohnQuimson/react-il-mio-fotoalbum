import { Link } from 'react-router-dom';

export default function ({ id, title, description, img, visible, categories }) {
  return (
    <>
      <Link to="../" relative="path">
        Torna indietro
      </Link>
      <div className="foto-container">
        <div className={`foto ${visible ? 'visible' : ''}`}>
          {/* Img */}
          <div
            className="card-image"
            style={{ width: '300px', height: '300px' }}
          >
            <img src={img} alt="img" style={{ width: '100%' }} />
          </div>
          <div className="card-content">
            <h3>{title}</h3>
            {categories.length > 0 ? (
              <div className="categories">
                <strong>categories:</strong>
                <ul>
                  {categories.map((category, index) => (
                    <li key={`ingr${index}`}>{category}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <strong>Categorie non specificate</strong>
            )}
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
