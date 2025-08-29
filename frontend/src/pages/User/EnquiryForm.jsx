import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RenderStep1 from "../../components/ContactForm/RenderStep1";
import RenderStep2 from "../../components/ContactForm/RenderStep2";
import RenderStep3 from "../../components/ContactForm/RenderStep3";
import { api } from "../../config/config";
import axios from "axios";

const EnquiryForm = () => {
  const { id, name, type } = useParams();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1 && !formData.name) return alert("Name is required");
    if (step === 1 && !formData.email) return alert("Email is required");
    setStep(step + 1);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    message: "",
    preferredContact: "email",
    id: id,
  });
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/orders`, formData);
      console.log(res.data);
      alert("Enquiry submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        quantity: 1,
        message: "",
        preferredContact: "email",
        id: id,
      });
      setStep(1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 h-screen max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Enquiry for {name}</h2>

      {step === 1 && (
        <RenderStep1 formData={formData} setFormData={setFormData} />
      )}
      {step === 2 && (
        <RenderStep2 formData={formData} setFormData={setFormData} />
      )}
      {step === 3 && (
        <RenderStep3
          formData={formData}
          setFormData={setFormData}
          itemName={name}
        />
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 bg-gray-300 rounded">
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        ) : (
          <button
            onClick={submitData}
            className="px-4 py-2 bg-green-500 text-white rounded">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;
