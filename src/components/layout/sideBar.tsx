import { Link, useLocation } from "react-router-dom";
const routes = [
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
  const location = useLocation();

  return (
    <div className="py-6 h-screen flex flex-col justify-between">
      <div className="flex-1">
        <ul>
          {routes.map((route, i) => (
            <li
              className={`p-2 font-medium ${
                location.pathname === route.path
                  ? "bg-gray-800 rounded text-white"
                  : "bg-white"
              }`}
              key={i}
            >
              <Link to={`${route.path}`}>
                {" "}
                <p>{route.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
