import React from "react";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center py-20 px-4">
      {/* 1. Header Section */}
      <h1 className="text-sm md:text-base font-medium tracking-widest text-gray-900 uppercase mb-8">
        NEED HELP?
      </h1>

      <div className="text-center space-y-6 max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
        <p>
          Have a question about your order or want to share feedback about our
          products or services related query?
        </p>
        <p>
          Please reach out to our customer support via Call or Email, we’re
          always happy to hear from you.
        </p>
      </div>

      {/* 2. Address Section */}
      <div className="mt-16 text-center space-y-2">
        <h2 className="text-base font-bold text-gray-900 mb-4">Address</h2>

        <p className="text-gray-800 font-medium">
          Zivore Apparel Private Limited
        </p>

        <div className="text-gray-600 space-y-1">
          <p>B 005, Sector 85,</p>
          <p>Noida, Gautam Buddha Nagar, Uttar Pradesh 201301</p>
        </div>
      </div>

      {/* 3. Details Section */}
      <div className="mt-10 text-center space-y-4 text-gray-800">
        <p>
          <span className="font-bold">CIN No.</span> U18109DL2022PTC397831
        </p>

        <p>
          <span className="font-bold">Timings:</span> Monday to Saturday, 10AM
          to 6PM
        </p>

        <p className="pt-4">
          <span className="font-bold">Call us at:</span>{" "}
          <a
            href="tel:+919899990772"
            className="hover:text-black hover:underline transition-colors">
            +91 9899990772
          </a>
        </p>

        <p>
          <span className="font-bold">Write to us at:</span>{" "}
          <a
            href="mailto:care@libas.in"
            className="hover:text-black hover:underline transition-colors">
            care@libas.in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactUsPage;
