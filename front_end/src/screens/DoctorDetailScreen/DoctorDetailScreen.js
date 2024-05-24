import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_doctor_detail, review_doctor } from "../../actions/userActions";
import Loader from "../../pieces/Loader/Loader";
import Message from "../../pieces/Message/Message";
import BookingContainer from "../../components/BookingContainer/BookingContainer";
import { DOCTOR_REVIEW_RESET } from "../../constants/userConstant";
import Button from "../../pieces/Button/Button";
import { get } from "mongoose";

const DoctorDetailScreen = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [review, setReview] = useState(false);
  const params = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const doctorDetail = useSelector((state) => state.doctorDetail);
  const { loading, error, doctor } = doctorDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const doctorReview = useSelector((state) => state.doctorReview);
  const { success: successReview, error: errorReview } = doctorReview;
  const getreviewLength = doctor[0]?.reviews;
 console.log(getreviewLength);
  useEffect(() => {
    if (successReview) {
      alert("Thank for your review!");
      setRating(0);
      setComment("");
      dispatch({
        type: DOCTOR_REVIEW_RESET,
      });
    }
    dispatch(get_doctor_detail(params.id));
  }, [dispatch, params, successReview]);

  const submitHandler = (e) => {
    dispatch(
      review_doctor(params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <div className='w-full'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className='flex gap-8 w-full mb-5'>
          <div className='w-1/4'>
          <img
            src={doctor[0]?.imageLink}
            alt='Avatar'
            className="w-full h-full object-cover rounded-full"
          />
          </div>
          <div className='flex flex-col items-start col-span-2 gap-5 divide-y-2 w-3/4'>
            <div className='flex flex-col gap-2'>
              <span className='text-websecondary font-medium'>Rating</span>
              <span>{doctor[0]?.rating ? doctor[0]?.rating : 0}</span>
              <span>{`${
                doctor[0]?.numReviews ? doctor[0]?.numReviews : 0
              } reviews`}</span>
            </div>
            <span className='text-websecondary font-medium text-xl'>
              {doctor[0]?.user[0]?.name}
            </span>
            <div className='flex flex-col gap-2'>
              <span className='text-websecondary font-medium'>Language</span>
              <span>{doctor[0]?.language}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-websecondary font-medium'>
                Qualifications
              </span>
              <span>
                {doctor[0]?.degree
                  ? doctor[0]?.degree
                  : "Medical Doctor, Hanoi Medical University "}
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-websecondary font-medium'>Experience</span>
              <span>{doctor[0]?.experience}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-websecondary font-medium'>Department</span>
              <span>{doctor[0]?.clinic[0].name}</span>
            </div>
          </div>
        </div>
      )}
      <BookingContainer doctor = {doctor}/>
      <div className='mt-4 flex flex-col gap-4'>
        <span className='text-websecondary font-medium'>Reviews</span>
        {
          doctor[0]?.reviews?.length === 0|| !getreviewLength ? (
            <span>Be the first one to review</span>
          ) : (
            doctor[0]?.reviews.map((review) => (
              <div className='flex flex-col gap-2'>
                <strong>{review.name}</strong>
                <span>{review.rating}</span>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </div>
            ))
          )
         }
        {/* {doctor[0]?.reviews
          ? doctor[0].reviews.map((review) => (
              <div className='flex flex-col gap-2'>
                <strong>{review.name}</strong>
                <span>{review.rating}</span>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </div>
            ))
          : null} */}
        <Button clickEvent={() => setReview(!review)}>
          REVIEW THIS DOCTOR
        </Button>
        {review && (
          <div>
            {errorReview && <Message>{errorReview}</Message>}
            {userInfo ? (
              <div>
                <div className='w-1/3'>
                  <label
                    htmlFor='gender'
                    className='block mb-2 text-sm font-medium text-websecondary'
                  >
                    Rating
                  </label>
                  <select
                    id='rating'
                    value={rating}
                    onChange={(e) => {
                      let currentValue = e.target.value;
                      setRating(currentValue);
                    }}
                    className='border border-webgrey block w-full p-2.5 text-sm rounded-lg mb-5'
                  >
                    <option value='' disabled>
                      Select
                    </option>
                    <option value='1'>Poor</option>
                    <option value='2'>Below Average</option>
                    <option value='3'>Average</option>
                    <option value='4'>Good</option>
                    <option value='5'>Very Good</option>
                  </select>
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='description'
                    className='block mb-2 text-sm font-medium'
                  >
                    Description
                  </label>
                  <textarea
                    id='comment'
                    value={comment}
                    name='comment'
                    rows='5'
                    cols='33'
                    className='w-full border-2'
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <Button clickEvent={submitHandler}>
                    DONE WITH MY REVIEW
                  </Button>
                </div>
              </div>
            ) : (
              <Message>
                Please <Link to='/login'>Sign In</Link> To Review
              </Message>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetailScreen;
