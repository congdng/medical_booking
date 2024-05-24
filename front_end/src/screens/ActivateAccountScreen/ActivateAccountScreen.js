import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "../../pieces/Message/Message";
import Loader from "../../pieces/Loader/Loader";
import { activate } from "../../actions/userActions";

const ActivateAccountScreen = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate();
  const tokenID = params.id;
  const userActivation = useSelector((state) => state.userActivation);
  const { loading, error, userInfo } = userActivation;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    console.log("i fire once");
    dispatch(activate(tokenID));
  }, []);

  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);
  return (
    <div>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
    </div>
  );
};

export default ActivateAccountScreen;
