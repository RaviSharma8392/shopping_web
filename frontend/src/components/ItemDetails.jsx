import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {HashLoader} from 'react-spinners';
import {api} from '../config/config'
import GetItems from './Item';


const ItemDetails = () => {
  console.log(api)

  const [item, setItem] = useState([]);
    const [typeItem, setTypeItem] = useState([]);

  
  const { id,type } = useParams();
// console.log(type)
  const handleEnquire = async () => {
    try {
     const email= window.prompt("please type your email...")
    //  console.log(email)
     if(email){const res = await axios.post(`${api}/email/${id}`, {
  email: email
});      console.log("Email sent response:", res.data);
      if(res.data.success===true){
              alert("✅Enquiry email sent successfully!");

      }}

 
    } catch (error) {
      console.error("Failed to send enquiry email:", error);
      alert("❌"+error.response.data.error);
    }
  };

  useEffect(() => {
    const fetchItemById = async () => {
      try {
        const res = await axios.get(`${api}/item/${id}`);
        setItem(res.data.data);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        
      }
    };
     const fetchItemByType = async () => {
      try {
const response = await axios.get(`${api}/item/type/${type}`);
        setTypeItem(response.data.data);
        // console.log(response.data.data)
      } catch (error) {
        console.error("Failed to fetch item:", error);
        
      }
    };

    fetchItemById();fetchItemByType()
  }, [id, type]);

  if (!item) return <div className='flex items-center justify-center h-screen'><HashLoader size={100} className='' color="blue" />
 </div>


  return (
    <div className=" flex-col gap-4  mx-auto ">
       <div className='bg-blue-500  text-white font-bold   p-5.5'>
        <NavLink to={"/"}>back</NavLink>
      </div>
      <div className=' md:mx-7 mx-auto  p-4 gap-20'>
        <Swiper

      modules={[Navigation, Pagination, Scrollbar,Autoplay]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true  }}
      autoplay={{
        delay:3000,
        disableOnInteraction:false,
      }
      

      
      }
      keyboard

    >
      {item.additionalImages?.map((img, idx) => (
        <SwiperSlide key={idx}>  <img
            key={idx}
            className="w-full h-80 md:w-full md:h-150 object-cover rounded"
            src={img}
            alt={`Image ${idx + 1}`}
          />
        </SwiperSlide>))}
          
      
    
</Swiper>
    <div className='flex flex-col md:flex my-4 p-4 '>
      <div className='flex justify-between  my-2.5'>
        <h1 className='font-bold whitespace-nowrap mx-5  text-center md:my-3.5 md:text-2xl  '>{item.name}</h1>
        <button
          onClick={handleEnquire}
          className="mx-5 px-10 py-2 mt-5 bg-yellow-400 rounded-xl hover:bg-yellow-500 transition-all hidden md:flex "
        >
          Enquire
        </button>
      </div>
      
            <p className='font mx-5 md:text-xl '>{item.description}</p>
             <button
          onClick={handleEnquire}
          className="mx-2 px-auto py-2 mt-5 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all md:hidden"
        >
          Enquire
        </button>

    </div>
   
      </div>
      

      <div className="flex flex-wrap gap-4 md:gap-7 md:mx-7  p-4">
        {item.additionalImages?.map((img, id) => (
          <img
            key={id}
            className="w-22 h-24  md:h-50 md:w-50 object-cover rounded"
            src={img}
          />
        ))}
      </div>
        <h1 className='font-bold whitespace-nowrap mx-22   md:my-3.5 md:text-2xl  '>Recommended for You</h1>

      <GetItems  items={typeItem}/>
    </div>
  );
};

export default ItemDetails;
