import React, { useState, useEffect } from "react";

import { promoData } from "../../../user/data";
const UserNavbar = () => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopNavbar user={user} promoData={promoData} />
      </div>

      {/* Mobile */}
      <div className="block  md:hidden">
        {/* Promotional Bar */}

        <MobileTopbar user={user} promoData={promoData} />
      </div>
    </>
  );
};

export default UserNavbar;
