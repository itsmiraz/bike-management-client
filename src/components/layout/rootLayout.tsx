import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";
import { useState } from "react";
import { MenuIcon, XCircle } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logOut } from "@/redux/feature/auth/authSlice";
import { Button } from "../ui/button";

const RootLayout = () => {
  const [Open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="w-full sticky top-0 z-50 flex justify-between font-semibold items-center p-4 bg-slate-800 text-white">
        <button className="lg:hidden block" onClick={() => setOpen(!Open)}>
          {Open ? <XCircle /> : <MenuIcon />}
        </button>
        <h2 className="text-center ">Bike Management</h2>
        <div>
          <Button onClick={() => dispatch(logOut())}>Log Out</Button>
        </div>
      </div>
      <div className="grid  grid-cols-5 gap-5 ">
        <div
          className={`lg:sticky   top-14   z-40 fixed  ${
            Open ? "left-0" : "-left-[300px]"
          } transition-all lg:left-0 ease-in-out  transform overflow-y-auto   bg-gray-200`}
        >
          <Sidebar setOpen={setOpen} open={Open} />
        </div>

        <div className="col-span-5   lg:col-span-4 relative   p-5">
          <div
            className={`${
              !Open
                ? "hidden"
                : "w-full md:hidden z-30 h-full absolute top-0 left-0 bg-black/20 backdrop-blur-sm"
            }`}
          ></div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
