import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";

const RootLayout = () => {
  return (
    <div className="grid grid-cols-5 gap-10 min-h-screen">
      <div className="col-span-1">
        <Sidebar />
      </div>

      <div className="col-span-4 bg-red-300 ">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
