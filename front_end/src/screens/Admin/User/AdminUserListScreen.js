import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delete_user, list_users } from "../../../actions/userActions";
import Loader from "../../../pieces/Loader/Loader";
import Button from "../../../pieces/Button/Button";
import ToastComponent from "../../../components/Toast/ToastComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminUserListScreen = () => {
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
      dispatch(list_users());
    } else {
      history("/");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id, role) => {
    console.log(id);
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(delete_user(id, role));
    }
  };

  return (
    <div className='grid w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='mb-8 font-semibold text-websecondary text-3xl'>Users</h1>
        <Link to='/admin/user/create'>
          <Button>Create new user</Button>
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
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <Button
                            onlyIcon='fa-solid fa-pen-to-square'
                            size='small'
                          ></Button>
                        </Link>
                        <button
                          className='flex items-center justify-center px-2 h-[32px] aspect-square text-[16px] text-red-500'
                          onClick={() => {
                            deleteHandler(user._id, user.role);
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

export default AdminUserListScreen;
