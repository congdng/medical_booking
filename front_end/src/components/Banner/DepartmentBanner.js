import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Button from "../../pieces/Button/Button.js";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { list_clinics } from "../../actions/clinicActions.js";
import Loader from "../../pieces/Loader/Loader.js";
import Message from "../../pieces/Message/Message.js";

const DepartmentBanner = () => {
  const dispatch = useDispatch();
  const clinicList = useSelector((state) => state.clinicList);
  const { loading, error, clinics } = clinicList;
  useEffect(() => {
    dispatch(list_clinics());
  }, [dispatch]);
  const sliderRef = useRef();
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: true,
    arrows: false,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>${error}</Message>
      ) : (
        <div className='max-w-screen-xl mx-auto px-4 relative group'>
          <Slider ref={sliderRef} {...sliderSettings}>
            {clinics
              ? clinics.map((card, index) => (
                  <div
                    className='!w-[550px] bg-white border border-gray-200 rounded-lg shadow'
                    key={index}
                  >
                    <NavLink to={`services/${card.link}`}>
                      <img
                        className='rounded-t-lg w-full h-80 object-cover'
                        src={card.image}
                        alt=''
                      />
                    </NavLink>
                    <div className='p-5'>
                      <a href={`services/${card.link}`}>
                        <h5 className='mb-2 text-2xl font-bold tracking-tight text-webprimary text-left'>
                          {card.name}
                        </h5>
                      </a>
                      <p className='mb-3 text-gray-700 line-clamp-3 text-left font-normal text-base'>
                        {card.description}
                      </p>
                      <Link to={`services/${card.link}`}>
                        <Button
                          type='text'
                          className='inline-flex items-center'
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              : null}
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
        </div>
      )}
    </>
  );
};

export default DepartmentBanner;
