import React from 'react';
import { NavLink } from 'react-router-dom';

const AboutFotographer = () => {
  return (
    <section id="about" className="pt-2 pb-5">
      <div className="row m-0">
        <div className="col-12 col-md-6 ">
          <div className="col-sx">
            <h1>Photographer</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              ullam alias nisi dicta fugit molestiae minima ipsam aliquam sed,
              tenetur similique unde iusto incidunt et voluptatum corrupti
              repudiandae molestias facere.
            </p>
            <NavLink to={`/contacts`}>Mettiamoci in contatto!</NavLink>
          </div>
        </div>
        <div className="col-dx col-12 col-md-6">
          <div className="col-dx">
            <div className="cont-img">
              <img src="jumbo-img.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFotographer;
