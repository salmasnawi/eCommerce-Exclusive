
import heroImage from "../../assets/hero-image.jpg";
import React from "react";


const Hero = () => {
  return (
    <section className="container my-5">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-md-6 text-center text-md-start">
          <h1 className="display-4 fw-bold">Discover Amazing Products</h1>
          <p className="lead">
            Your one-stop shop for all your favorite items at unbeatable prices.
          </p>
          <button className="btn custom-button w-25">Shop Now</button>
        </div>
        {/* Image Section */}
        <div className="col-md-6 text-center ">
          <img
            src={heroImage}

            alt="Hero Product"
            className=" w-100"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
