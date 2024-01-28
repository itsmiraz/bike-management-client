import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";
import { useState } from "react";
import { MenuIcon, XCircle } from "lucide-react";

const RootLayout = () => {
  const [Open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between font-semibold items-center p-4 bg-slate-800 text-white">
        <button className="lg:hidden block" onClick={() => setOpen(!Open)}>
          {Open ? <XCircle /> : <MenuIcon />}
        </button>
        <h2 className="text-center ">Bike Management</h2>
        <div></div>
      </div>
      <div className="grid grid-cols-5 gap-5 min-h-screen">
        <div
          className={`lg:relative z-50 absolute  ${
            Open ? "left-0" : "-left-[300px]"
          } transition-all md:left-0 ease-in-out transform overflow-y-auto  col-span-4  lg:col-span-1 bg-gray-200`}
        >
          <Sidebar />
        </div>

        <div className="col-span-5  lg:col-span-4 relative   p-5">
          <div
            className={`${
              !Open
                ? "hidden"
                : "w-full md:hidden z-40 h-full absolute top-0 left-0 bg-black/20 backdrop-blur-sm"
            }`}
          ></div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
