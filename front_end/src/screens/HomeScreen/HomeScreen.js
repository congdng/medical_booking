
import React from "react";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import Banner from "../../components/Banner/Banner";
import DepartmentContent from "../../components/Banner/DepartmentContent/DepartmentContent"
import DoctorContent from "../../components/Banner/DoctorContent/DoctorContent"

const HomeScreen = () => {
  return (
    <div>
      <MainNavigation />
      <Banner />
      <DepartmentContent />
      <DoctorContent />
    </div>
  );
};

export default HomeScreen;
