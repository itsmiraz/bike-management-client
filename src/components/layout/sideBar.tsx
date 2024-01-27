import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logOut } from "@/redux/feature/auth/authSlice";
const routes = [
  {
    path: "/",
    label: "Dashboard",
  },
  {
    path: "/bike-management",
    label: "Bike Management",
  },
  {
    path: "/sales-management",
    label: "Sales Management",
  },
  {
    path: "/sales-history",
    label: "Sales History",
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 h-screen flex flex-col justify-between">
      <div>
        <img src={logo} className="w-20 pb-10" alt="" />
      </div>
      <div className="flex-1">
        <ul>
          {routes.map((route, i) => (
            <li className="py-2 " key={i}>
              <Link to={`${route.path}`}>
                {" "}
                <p>{route.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button onClick={() => dispatch(logOut())}>Log Out</Button>
      </div>
    </div>
  );
};

export default Sidebar;
