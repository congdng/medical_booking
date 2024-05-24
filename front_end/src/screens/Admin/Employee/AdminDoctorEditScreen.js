import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { list_clinics } from "../../../actions/clinicActions";
import Select from "react-select";
import { get_doctor_detail } from "../../../actions/userActions";

const AdminDoctorEditScreen = () => {
  const [clinicSelect, setClinicSelect] = useState([]);
  const [clinicID, setClinicID] = useState("");
  const [experience, setExperience] = useState("");
  const [title, setTitle] = useState("");
  const [degree, setDegree] = useState("");
  const [description, setDOB] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const userID = params.id;
  const clinicList = useSelector((state) => state.clinicList);
  const { loading, error, clinics } = clinicList;
  const doctorDetail = useSelector((state) => state.doctorDetail);
  const { loading: loadingDetail, error: errorLoading, doctor } = doctorDetail;
  const buildSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((clinic, index) => {
        let object = {};
        object.label = clinic.name;
        object.value = clinic._id;
        result.push(object);
      });
    }
    return result;
  };
//   useEffect(() => {
//     dispatch(list_clinics());
//     console.log(userID);
//     if (doctor?._id !== userID) {
//       dispatch(get_doctor_detail(userID));
//     }
//   }, [dispatch, doctor, userID]);
  useEffect(() => {
    if (clinics && clinics.length > 0) {
      setClinicSelect(buildSelect(clinics));
    }
  }, [clinics]);
  return (
    <div className='w-full h-100vh'>
      <Select
        value={clinicID}
        onChange={setClinicID}
        options={clinicSelect}
        className='w-full'
      />
    </div>
  );
};

export default AdminDoctorEditScreen;
