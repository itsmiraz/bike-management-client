import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";

const RootLayout = () => {
  return (
    <div className="grid grid-cols-5 gap-5 min-h-screen">
      <div className="col-span-1 bg-gray-200">
        <Sidebar />
      </div>

      <div className="col-span-4   p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
