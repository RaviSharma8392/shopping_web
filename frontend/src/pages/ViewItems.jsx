import React, { useEffect, useState } from "react";
import axios from 'axios';
import Item from "../components/item";
import { HashLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
import {api} from "../config/config"
const ViewItems = () => {
  const [items, setItems] = useState([]);
  console.log(api)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${api}/item`);
        setItems(res.data.data); 
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []); 
  if (!items) return <div className='flex items-center justify-center h-screen'><HashLoader size={100} className='' color="blue" />
 </div>

  return (
    <div className="">
    
       <div className='bg-blue-500  text-white font-bold flex justify-end  p-5.5'>
        <NavLink to={"/additem"} className=" bg-orange-500 text-white rounded px-3 py-2  ">Manage Items</NavLink>
      </div>
      <Item items={items}/>

      


      
    </div>
  );
};

export default ViewItems;
