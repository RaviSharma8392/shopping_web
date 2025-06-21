import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {api} from "../config/config"


const AddItem=() =>{
  const [form, setForm] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: '',
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      additionalImages: form.additionalImages.split(",").map(img=>img.trim()).filter(img=>img)
        
    };
      // console.log( form.additionalImages.split(","))
      // console.log(form.additionalImages.split(",").map(img=>img.trim()))
      // console.log(form.additionalImages.split(",").map(img=>img.trim()).filter(img=>img))
try {
      const res = await axios.post(`${api}/item/add`,payload )
      alert("✅" +res.data.message)

  
} catch (error) {
        alert("❌ "+error.response.data.error)

       console.log(error.response.data.error)

}
    
  }

  return (
    <div className=" mx-auto ">
      <div className='bg-blue-500 text-white font-bold   p-5.5'>
        <NavLink to={"/"}>back</NavLink>
      </div>
      <h1 className='text-center text-black font-bold text-2xl my-2'>Manage Items</h1>
     <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5 p-4 mx-4 lg:mx-100 lg:py-10 rounded shadow ">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange}  required  className='m-4'/>
        <select name="type" value={form.type} onChange={handleChange} required className='m-4'>
          <option value="">Select Type</option>
          <option value="Shirt">Shirt</option>
          <option value="Pant">Pant</option>
          <option value="Shoes">Shoes</option>
          <option value="Sports Gear">Sports Gear</option>
          <option value="Other">Other</option>
        </select>
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className='m-4' />
        <input name="coverImage" placeholder="Cover Image URL" value={form.coverImage} onChange={handleChange} required className='m-4' />
        <input name="additionalImages" placeholder="Comma-separated image URLs" value={form.additionalImages} onChange={handleChange} className='m-4' />
        <button type="submit" className="bg-orange-500 m-4 text-white py-2 rounded hover:bg-orange-600 transition-all duration-300 ease-in-out">Add Item</button>
      </form>
    </div>
  );
}
export default AddItem
