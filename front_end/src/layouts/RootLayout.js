import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/footer/Footer";

const RootLayout = () => {
  return (
    <div className='root-layout'>
      <header>
        <Navbar />
      </header>
      <main className='max-w-screen-xl flex items-center mx-auto p-4 gap-4 overflow-x-hidden'>
        <Outlet />
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
};

export default RootLayout;
