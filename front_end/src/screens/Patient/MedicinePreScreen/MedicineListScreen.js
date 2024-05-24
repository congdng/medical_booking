import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pres_medicine } from "../../../actions/medicineAction";
import Loader from "../../../pieces/Loader/Loader";
import Message from "../../../pieces/Message/Message";
import { renderDate } from "../../../function/webFunction";
import Button from "../../../pieces/Button/Button";

function MedicineListScreen() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { prelist, loading, error } = useSelector((state) => state.medicinePList);
  useEffect(() => {
    dispatch(pres_medicine({patient_id: userInfo._id}));
  }, [userInfo]);


  return (
    <div>
      <h1>Medicine List</h1>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : prelist? prelist.length === 0 ? <Message variant="info">No Medicine</Message> :
        <div className="grid grid-cols-2 gap-4">
          {prelist.map((item) => (
            <div key={item.id} className='rounded-md border-2 flex justify-between items-center py-6'>
              Date: {renderDate(new Date(item.mlid.createdAt))}
              <Button>View</Button>
            </div>
          ))} </div>: <Message variant="info">Can't load list</Message>
       }


    </div>
  )
}

export default MedicineListScreen