import React from "react";
import { menuList } from "../../constants/webconstant.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";


const NavbarMiddle = () => {
  return (
    <nav className='bg-webwhite border-gray-200 relative'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <NavLink to='/' className='text-xl font-semibold navbar-brand'>
          Health<span>Care</span>
        </NavLink>
        {/* Desktop Menu */}
        <ul className='hidden md:flex space-x-6 font-medium'>
          {Object.keys(menuList).map((key) => {
            return (
              <li
                className='flex relative group items-center text-webblack hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-websecondary'
                key={key}
              >
                <NavLink to={key}>{menuList[key].name}</NavLink>
                {menuList[key].submenu ? (
                  <>
                    <FontAwesomeIcon
                      icon={"fa-solid fa-chevron-down"}
                      className='text-xs group-hover:transition duration-150 group-hover:rotate-180'
                    ></FontAwesomeIcon>
                    <ul className='z-50 absolute bg-gray-300 p-3 w-max top-6 transform scale-0 group-hover:scale-100 transition duration-200 ease-in-out origin-top text-webblack rounded'>
                      {Object.keys(menuList[key].submenu).map((subKey) => {
                        return (
                          <li
                            className={`flex items-center justify-between group/navbar text-sm p-1 rounded hover:bg-websecondary hover:text-webwhite leading-8 w-full relative`}
                            key={subKey}
                          >
                            <NavLink to={subKey}>
                              {menuList[key].submenu[subKey].name}
                            </NavLink>
                            {menuList[key].submenu[subKey].subsubmenu ? (
                              <>
                                <FontAwesomeIcon
                                  icon={"fa-solid fa-chevron-right"}
                                  className='text-xs group-hover/navbar:transition duration-200 group-hover/navbar:rotate-180'
                                ></FontAwesomeIcon>
                                <ul
                                  className={`z-50 absolute bg-gray-300 p-3 w-max left-[100%] top-[-30%] transform scale-0 group-hover/navbar:scale-100 transition duration-200 ease-in-out origin-left text-webblack rounded`}
                                >
                                  {Object.keys(
                                    menuList[key].submenu[subKey].subsubmenu
                                  ).map((subSubKey) => {
                                    return (
                                      <li
                                        className='text-sm p-1 rounded hover:bg-websecondary hover:text-webwhite leading-8 w-full'
                                        key={subSubKey}
                                      >
                                        <NavLink to={subSubKey}>
                                          {
                                            menuList[key].submenu[subKey]
                                              .subsubmenu[subSubKey]
                                          }
                                        </NavLink>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </>
                            ) : (
                              <></>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <></>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};


export default NavbarMiddle;


