import React from 'react';
import { useSelector } from "react-redux";

import MRSingle from '../../../components/ChatMessage/MsgReceiverSgl.js';
import MSSingle from '../../../components/ChatMessage/MSgSenderSgl.js';

function ItemList({ items }) {
  // const data = localStorage.getItem('prf')
  // const prf = JSON.parse(data);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log("ITEMS:",items)
  return (
    <div>
      <ul>
        {items.map((item, id) => (
          <li key={id}>{
            item.user_id === userInfo._id ? <MRSingle msg={item.text} /> : <MSSingle msg={item.text} />
          } </li>
        ))} 
        
        {/* MRSingle: Toi gui, MSSingle: Nguoi ta gui */}
        {/* {Object.entries(items).map(([key, value]) => (
      <li key={key}>{

        value.user_id === prf.user_id ? <MRSingle msg={value.text} /> : <MSSingle msg={value.text} />
   
      } </li>
    ))} */}
        {
          
        }
      </ul>
    </div>
  );
}

export default ItemList;