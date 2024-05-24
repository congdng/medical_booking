import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import Button from "../../pieces/Button/Button";

// import { faker } from "@faker-js/faker";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { list_doctors } from "../../actions/userActions";
import Loader from "../../pieces/Loader/Loader";
import Message from "../../pieces/Message/Message";
const DoctorBanner = () => {
  //   function generateRandomStaff() {
  //     const jobs = ["doctor", "trainer"];
  //     const departments = [
  //       "Accident & Emergency",
  //       "Rheumatology",
  //       "Pain Clinic",
  //       "General Surgery",
  //       "Bone & Joint Centre",
  //       "Diagnostic Imaging",
  //       "Pharmacy",
  //       "Laboratory & Blood Bank",
  //       "Physiotherapy & Rehabilitation",
  //       "Annual Health Check Up",
  //     ];
  //     const languages = ["English", "Vietnamese", "English, Vietnamese"];
  //     const emailDomains = ["hospital.com", "healthcare.org", "medcenter.net"];
  //     const imageLinks = [
  //       "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  //       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hackensackmeridianhealth.org%2Fen%2Fhealthu%2Fpatient-perspectives%2F2022%2F08%2Fold-bridge-primary-care-doctor-fluent-in-three-languages&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABA4",
  //       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  //       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  //       "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
  //     ];

  //     const staffMember = {
  //       name: `${faker.person.firstName()} ${faker.person.lastName()}`,
  //       job: jobs[Math.floor(Math.random() * jobs.length)],
  //       department: departments[Math.floor(Math.random() * departments.length)],
  //       experience: `${Math.floor(Math.random() * 12) + 1} years`,
  //       language: languages[Math.floor(Math.random() * languages.length)],
  //       email: `${faker.internet.userName()}@${
  //         emailDomains[Math.floor(Math.random() * emailDomains.length)]
  //       }`,
  //       imageLink: imageLinks[Math.floor(Math.random() * imageLinks.length)],
  //     };

  //     return staffMember;
  //   }

  //   let hospitalStaff = [];

  //   for (let i = 0; i < 40; i++) {
  //     hospitalStaff.push(generateRandomStaff());
  //   }
  //     console.log(hospitalStaff);
  const dispatch = useDispatch();
  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;
  useEffect(() => {
    dispatch(list_doctors());
  }, [dispatch]);
  const sliderRef = useRef();
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: false,
    arrows: false,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>${error}</Message>
      ) : (
        <div className='max-w-screen-xl mx-auto px-4 relative group' >
          <Slider ref={sliderRef} {...sliderSettings}>
            {doctors
              ? doctors.map((card, index) => (
                  <>
                    <div
                      key={index}
                      className='max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4'
                    >
                      <img
                        className='w-full h-56 object-cover object-top'
                        src={card.imageLink}
                        alt='avatar'
                      />
                      <div className='flex items-center px-6 py-3 bg-gray-900'>
                        {/* {card.job === "doctor" ? (
                        <>
                          <FontAwesomeIcon
                            icon='fa-solid fa-stethoscope'
                            className='text-webwhite'
                          />
                          <h1 className='mx-3 text-white font-semibold text-lg'>
                            Doctor
                          </h1>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon='fa-solid fa-trailer'
                            className='text-white'
                          />
                          <h1 className='mx-3 text-white font-semibold text-lg'>
                            Trainer
                          </h1>
                        </>
                      )} */}
                        <>
                          <FontAwesomeIcon
                            icon='fa-solid fa-stethoscope'
                            className='text-webwhite'
                          />
                          <h1 className='mx-3 text-white font-semibold text-lg'>
                            Doctor
                          </h1>
                        </>
                      </div>
                      <div className='py-4 px-6 text-left font-normal text-base flex flex-col gap-4'>
                        <div>
                          <h1 className='text-xl font-semibold text-gray-800'>
                            {card?.user[0]?.name}
                          </h1>
                          <p className='py-2 text-gray-400'>
                            {card?.clinic[0]?.name}
                          </p>
                        </div>
                        <div>
                          <div className='flex items-center mt-4 text-gray-700'>
                            <FontAwesomeIcon icon='fa-solid fa-language' />
                            <h1 className='px-2 text-sm font-normal'>
                              {card.language}
                            </h1>
                          </div>
                          <div className='flex items-center mt-4 text-gray-700'>
                            <FontAwesomeIcon icon='fa-solid fa-clock' />
                            <h1 className='px-2 text-sm font-normal'>
                              {card.experience}
                            </h1>
                          </div>
                          <div className='flex items-center mt-4 text-gray-700'>
                            <FontAwesomeIcon icon='fa-solid fa-envelope' />
                            <h1 className='px-2 text-sm font-normal'>
                              {card?.user[0]?.email}
                            </h1>
                          </div>
                        </div>
                        <NavLink
                          to={`/doctor/${card._id}`}
                          className='inline-flex justify-center'
                        >
                          <Button type='text'> Make An Appointment</Button>
                        </NavLink>
                      </div>
                    </div>
                  </>
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

export default DoctorBanner;
