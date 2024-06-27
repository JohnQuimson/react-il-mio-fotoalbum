import { useEffect, useRef, useState } from 'react';

export default function ({ id, title, description, img, visible, categories }) {
  return (
    <>
      <div className="foto-container">
        <div className={`foto ${visible ? 'visible' : ''}`}>
          {/* Img */}
          <div className="card-image">
            <img src={img} alt="img" />
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
