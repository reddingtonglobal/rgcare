import React from 'react';
import Slider from 'react-slick';
import { about_us_points } from '../../main-component/AboutPage/AboutData';
import whyRgCareImage from '../../images/WhatsApp Image 2026-05-04 at 4.49.37 PM.jpeg';

const AboutUs = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section
      className="causes-section-s3 custom-cause-container"
      style={{ padding: 0, overflow: 'hidden', position: 'relative' }}
    >
<div style={{ display: 'flex', alignItems: 'stretch', minHeight: '140px' }}>

        {/* Left column — image fills full height */}
        <div style={{ flex: '0 0 50%', width: '50%', overflow: 'hidden' }}>
          <img
            src={whyRgCareImage}
            alt="Why RG Care"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>

        {/* Right column — slider centered vertically */}
        <div style={{
          flex: '0 0 50%',
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          padding: '60px 40px 120px 40px',
          boxSizing: 'border-box',
        }}>
          <Slider
            {...settings}
            className="causes-slider-s2"
            style={{
              position: 'relative',
              transform: 'none',
              right: 'auto',
              top: 'auto',
              maxWidth: '100%',
              width: '100%',
            }}
          >
            {about_us_points.map(point => (
              <div className="causes-card cause-custom-min-height" key={point.id}>
                <div className="text">
                  <p key={point.id}>
                    <h2 className="point-img">
                      {point.img} {point.title}
                    </h2>
                    {point.Des}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
