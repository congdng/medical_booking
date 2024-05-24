import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assets/carousel-image01.png";
import image2 from "../../assets/carousel-image02.png";
import Button from "../../pieces/Button/Button";

const Banner = () => {
  const AdList = [
    {
      imageSrc: image1,
      title: "First Ads",
    },
    {
      imageSrc: image2,
      title: "Second Ads",
    },
  ];
  const sliderRef = useRef();
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: false,
    arrows: false,
  };
  return (
    <>
      <div className='max-w-screen-xl mx-auto px-4 relative group'>
        <Slider ref={sliderRef} {...sliderSettings}>
          {AdList.map((card, index) => (
            <div key={index} className='w-full'>
              <img alt={card.title} src={card.imageSrc} />
            </div>
          ))}
        </Slider>
        <Button
          onlyIcon='fa-solid fa-arrow-left'
          clickEvent={() => sliderRef?.current?.slickPrev()}
          className='absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 rounded-full scale-0 group-hover:scale-100 transition duration-200'
        ></Button>
        <Button
          onlyIcon='fa-solid fa-arrow-right'
          clickEvent={() => sliderRef?.current?.slickNext()}
          className='absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 rounded-full scale-0 group-hover:scale-100 transition duration-200'
        ></Button>
        {/* <WebReg className="absolute top-[75%] left-[50%] translate-x-[-50%] z-50"/> */}
      </div>
    </>
  );
};

export default Banner;
