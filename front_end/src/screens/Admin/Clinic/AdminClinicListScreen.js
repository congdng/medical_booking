import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delete_clinic, list_clinics } from "../../../actions/clinicActions";
import Button from "../../../pieces/Button/Button";
import Loader from "../../../pieces/Loader/Loader";
import ToastComponent from "../../../components/Toast/ToastComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminClinicListScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const clinicList = useSelector((state) => state.clinicList);
  const { loading, error, clinics } = clinicList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clinicDelete = useSelector((state) => state.clinicDelete);
  const { success: successDelete } = clinicDelete;
  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(list_clinics());
    } else {
      history("/");
    }
  }, [dispatch, userInfo, history, successDelete]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this clinic?")) {
      dispatch(delete_clinic(id));
    }
  };
  return (
    <div className='grid w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='mb-8 font-semibold text-websecondary text-3xl'>
          Clinics
        </h1>
        <Link to='/admin/clinic/create'>
          <Button>Create new clinic</Button>
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ToastComponent data={error} type='error' />
      ) : (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  ID
                </th>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  URL
                </th>
                <th scope='col' className='px-6 py-3'>
                  Specialists
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Navigate</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {clinics
                ? clinics.map((clinic) => (
                    <tr className='bg-white border-b' key={clinic._id}>
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                      >
                        {clinic._id}
                      </th>
                      <td className='px-6 py-4'>{clinic.name}</td>
                      <td className='px-6 py-4'>{clinic.link}</td>
                      <td className='px-6 py-4'>{clinic.special}</td>
                      <td className='px-6 py-4 flex gap-4'>
                        <Link to={`/admin/clinic/${clinic._id}/edit`}>
                          <Button
                            onlyIcon='fa-solid fa-pen-to-square'
                            size='small'
                          ></Button>
                        </Link>
                        <button
                          className='flex items-center justify-center px-2 h-[32px] aspect-square text-[16px] text-red-500'
                          onClick={() => {
                            deleteHandler(clinic._id);
                          }}
                        >
                          <FontAwesomeIcon icon='fa-solid fa-trash' />
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminClinicListScreen;
