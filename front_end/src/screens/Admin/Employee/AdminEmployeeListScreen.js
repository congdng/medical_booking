import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delete_user, list_users } from "../../../actions/userActions";
import Loader from "../../../pieces/Loader/Loader";
import Button from "../../../pieces/Button/Button";
import ToastComponent from "../../../components/Toast/ToastComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminEmployeeListScreen = () => {
  const [role, setRole] = useState("employee");
  const dispatch = useDispatch();
  const history = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(list_users(role));
    } else {
      history("/");
    }
  }, [dispatch, userInfo, history, successDelete, role]);

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(delete_user(id));
    }
  };

  return (
    <div className='grid w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='mb-8 font-semibold text-websecondary text-3xl'>
          Employees
        </h1>
        <div className='flex gap-2'>
          <div className='flex gap-2 items-center'>
            <label htmlFor='role' className='block mb-2 text-sm font-medium'>
              Role
            </label>
            <select
              id='role'
              value={role}
              onChange={(e) => {
                let currentValue = e.target.value;
                setRole(currentValue);
              }}
              className='border border-webgrey block w-full p-2.5 text-sm rounded-lg mb-5'
            >
              <option value='employee'>Employee</option>
              <option value='doctor'>Doctor</option>
              <option value='trainer'>Trainer</option>
              <option value='receptionist'>Receptionist</option>
            </select>
          </div>
        </div>
        {/* <div className="flex gap-2">
        <Link to='/admin/user/create'>
          <Button>Create new doctor</Button>
        </Link>
        <Link to='/admin/user/create'>
          <Button>Create new trainer</Button>
        </Link>
        <Link to='/admin/user/create'>
          <Button>Create new receptionist</Button>
        </Link>
        </div> */}
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
                  Username
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Role
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Navigate</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users
                ? users.map((user) => (
                    <tr className='bg-white border-b' key={user._id}>
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                      >
                        {user._id}
                      </th>
                      <td className='px-6 py-4'>{user.name}</td>
                      <td className='px-6 py-4'>{user.username}</td>
                      <td className='px-6 py-4'>{user.email}</td>
                      <td className='px-6 py-4'>{user.role}</td>
                      <td className='px-6 py-4 flex gap-4'>
                        <Link to={`/admin/${user.role}/${user._id}/edit`}>
                          <Button
                            onlyIcon='fa-solid fa-pen-to-square'
                            size='small'
                          ></Button>
                        </Link>
                        <button
                          className='flex items-center justify-center px-2 h-[32px] aspect-square text-[16px] text-red-500'
                          onClick={() => {
                            deleteHandler(user._id);
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

export default AdminEmployeeListScreen;
