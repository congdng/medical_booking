import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { mainNavigation } from "../../constants/webconstant";
const MainNavigation = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div id='main-navigation'>
      <div className='mx-auto max-w-screen-xl px-4'>
        <nav className='flex flex-nowrap items-center bg-gray-200 min-h-[80px]'>
          { mainNavigation.map((section) => {
            return (
              <NavLink
                to={section.url}
                className='w-1/4 text-center flex items-center justify-center gap-4 font-bold text-webprimary border border-webgrey'
                key={section.name}
              >
                <FontAwesomeIcon icon={section.icon} className='text-7xl' />
                <span>{section.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MainNavigation;
