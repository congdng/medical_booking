import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { US, VN } from "country-flag-icons/react/3x2";
import Button from "../../pieces/Button/Button.js";
import { contactNumber, languageList } from "../../constants/webconstant";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions.js";
import { useNavigate } from "react-router-dom";
import { navigationLinks } from "../../constants/webconstant";
const NavbarTop = () => {
  const [isChecked, setIsChecked] = useState(false);
  const nav = useNavigate()
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 
  const logoutHandler = () => {
    dispatch(logout());
    nav("/")
  };
  return (
    <>
      {userInfo && userInfo.role === "doctor" && (
        <div className='max-w-screen-xl flex items-center mx-auto p-4 gap-4'>
          <Button>
            <Link to={`/doctor_dashboard/${userInfo._id}`}>
              Doctor Dashboard
            </Link>
          </Button>
        </div>
      )}
      {userInfo && userInfo.role !== "admin" && (
       <div className='max-w-screen-xl flex items-center mx-auto p-4 gap-4'> {navigationLinks[userInfo.role].map(menu => 
              <Button>
            <Link to={`${userInfo.role}/${menu.link}`}>{menu.name}</Link>
          </Button>
        )}</div>
      )}
      {userInfo && userInfo.role === "admin" && (
        <div className='max-w-screen-xl flex items-center mx-auto p-4 gap-4'>
          <Button>
            <Link to='/admin/user_list'>User</Link>
          </Button>
          <Button>
            <Link to='/admin/employee_list'>Employee</Link>
          </Button>
          <Button>
            <Link to='/admin/clinic_list'>Clinic</Link>
          </Button>
          <Button>
            <Link to='/admin/machine_list'>Machine</Link>
          </Button>
          <Button>
            <Link to='/admin/medicine_list'>Medicine</Link>
          </Button>
          <Button>
            <Link to='/admin/exercise_list'>Exercise</Link>
          </Button>
          <Button>
            <Link to='/admin/appointment_list'>Appointment</Link>
          </Button>
        </div>
      )}
      <nav className='bg-websecondary text-webwhite text-sm font-medium'>
        <div className='max-w-screen-xl flex justify-between items-center mx-auto p-4'>
          {/* Left */}
          <div className='flex items-center justify-center gap-4'>
            {/* Checkbox */}
            <label className='relative inline-flex items-center cursor-pointer gap-3'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                checked={isChecked}
                onChange={checkHandler}
              />
              <span className='text-webwhite'>Dark Mode</span>
              <div className="w-12 h-6 relative bg-webgrey peer-checked:bg-webprimary rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
            {/* Language */}
            <div className='flex items-center gap-2'>
              <span>Language</span>
              <button className='relative inline-flex group items-center justify-center rounded-2xl border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 gap-2'>
                <US title='United States' className='...' />
                <span>English</span>
                <FontAwesomeIcon
                  icon={"fa-solid fa-chevron-down"}
                  className='text-xs group-hover:transition duration-150 group-hover:rotate-180'
                ></FontAwesomeIcon>
                <ul className='z-50 absolute bg-gray-300 p-3 w-max top-[100%] transform scale-0 group-hover:scale-100 transition duration-200 ease-in-out origin-top text-webblack rounded'>
                  {languageList.map((language) => {
                    return (
                      <li
                        className='p-2 flex items-center hover:bg-websecondary hover:text-webwhite rounded gap-2'
                        key={language.name}
                      >
                        {language.ISO === "US" ? (
                          <US title='United States' className='rounded-full' />
                        ) : (
                          <VN title='Vietnamese' className='rounded-full' />
                        )}
                        <span>{language.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </button>
            </div>
          </div>
          {/* Right */}
          <div className='flex items-center gap-4'>
            <NavLink
              to={!userInfo ? "/login" : `/profile`}
              className='flex flex-wrap items-center justify-between gap-1'
            >
              <FontAwesomeIcon icon='fa-solid fa-file-circle-check' />
              <span>Get My Result</span>
            </NavLink>
            <div className='relative group'>
              <NavLink to={"/contact"}>Contact</NavLink>
              <ul className='z-[60] absolute bg-gray-300 p-3 w-max top-[100%] transform scale-0 group-hover:scale-100 transition duration-200 ease-in-out origin-top-left text-webblack rounded flex flex-col gap-6'>
                {contactNumber.map((phone) => {
                  return (
                    <li
                      className='flex flex-col gap-2 items-start'
                      key={phone.name}
                    >
                      <span className='font-normal'>{phone.name}</span>
                      <a
                        href={`tel:${phone.phoneNumber}`}
                        className={`font-bold text-xl ${
                          phone.name === "Emergency"
                            ? "text-red-600"
                            : "text-websecondary"
                        }`}
                      >
                        {phone.phoneNumber}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            {userInfo ? (
              <div className='flex gap-4 items-center'>
                <span> Hello, {userInfo.name}</span>
                <Button type='white' size={"small"} clickEvent={logoutHandler}>
                  Log Out
                </Button>
              </div>
            ) : (
              <>
                <NavLink to={"/login"}>
                  <Button type='white' size={"small"}>
                    Sign In
                  </Button>
                </NavLink>
                <NavLink to={"/register"}>
                  <Button type='white' size={"small"}>
                    Sign Up
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarTop;
