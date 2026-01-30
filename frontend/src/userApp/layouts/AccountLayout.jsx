import { Outlet } from "react-router-dom";
import UserNavbar from "../features/account/components/bars/UserNavbar";
import { accountMenuData } from "../features/account/data/accountMenuData";
import AccountSidebar from "../features/account/components/bars/AccountSidebar";

const AccountLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />

      {/* Main Content */}
      <div className="mt-23 md:mt-55 max-w-7xl mx-auto  sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className=" hidden md:flex lg:w-1/3 xl:w-1/4">
            <AccountSidebar menuItems={accountMenuData} />
          </div>

          {/* Dynamic Content Area */}
          <div className=" lg:w-2/3 xl:w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
