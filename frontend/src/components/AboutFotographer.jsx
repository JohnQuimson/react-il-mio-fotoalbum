import React from 'react';
import { NavLink } from 'react-router-dom';

const AboutFotographer = () => {
  return (
    <section id="about" className="pt-2 pb-5">
      <div className="row m-0">
        <div className="col-12 col-md-6">
          <h1>Photographer</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            ullam alias nisi dicta fugit molestiae minima ipsam aliquam sed,
            tenetur similique unde iusto incidunt et voluptatum corrupti
            repudiandae molestias facere.
          </p>
          <NavLink to={`/contacts`}>Mettiamoci in contatto!</NavLink>
        </div>
        <div className="col-12 col-md-6">
          <div className="cont-img">
            <img src="https://placehold.co/600x400" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFotographer;
