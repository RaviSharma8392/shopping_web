// layouts/TaruvedaLayout.jsx
import { Outlet } from "react-router-dom";

const TaruvedaLayout = () => {
  return (
    <>
      {/* Optional: Taruveda Header */}
      <Outlet />
      {/* <TaruvedaFooter /> */}
    </>
  );
};

export default TaruvedaLayout;
