import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { list_medicines } from "../../../actions/medicineAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../pieces/Button/Button";
import Loader from "../../../pieces/Loader/Loader";
import ToastComponent from "../../../components/Toast/ToastComponent";

const AdminMedicineListScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const medicineList = useSelector((state) => state.medicineList);
  const { loading, error, medicines } = medicineList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(list_medicines());
    } else {
      history("/");
    }
  }, [dispatch, userInfo, history]);
  const deleteHandler = (id) => {};
  return (
    <div className='grid w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='mb-8 font-semibold text-websecondary text-3xl'>
          Medicine
        </h1>
        <Link to='/admin/medicine/create'>
          <Button>Add new medicine</Button>
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
                  Description
                </th>
                <th scope='col' className='px-6 py-3'>
                  Price
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Navigate</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {medicines
                ? medicines.map((medicine) => (
                    <tr className='bg-white border-b' key={medicine._id}>
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                      >
                        {medicine._id}
                      </th>
                      <td className='px-6 py-4'>{medicine.medicine_name}</td>
                      <td className='px-6 py-4'>{medicine.description}</td>
                      <td className='px-6 py-4'>{`${medicine.price}.000 VND`}</td>
                      <td className='px-6 py-4 flex gap-4'>
                        <Link to={`/admin/medicine/${medicine._id}/edit`}>
                          <Button
                            onlyIcon='fa-solid fa-pen-to-square'
                            size='small'
                          ></Button>
                        </Link>
                        <button
                          className='flex items-center justify-center px-2 h-[32px] aspect-square text-[16px] text-red-500'
                          onClick={() => {
                            deleteHandler(medicine._id);
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

export default AdminMedicineListScreen;
