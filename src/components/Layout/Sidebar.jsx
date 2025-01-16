import { NavLink } from "react-router-dom";
import {
  UsersIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Users", to: "/users", icon: UsersIcon },
  { name: "Products", to: "/products", icon: ShoppingBagIcon },
  { name: "Customers", to: "/customers", icon: UserGroupIcon },
  { name: "Settings", to: "/settings", icon: Cog6ToothIcon },
  { name: "Quotes", to: "/quotes", icon: Cog6ToothIcon },
];

export default function Sidebar({ isExpanded, toggleSidebar }) {
  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-16"
      } h-full bg-indigo-800 transition-all duration-300`}
    >
      <div className="p-4 flex justify-between items-center">
        {isExpanded && (
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-indigo-700"
        >
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
      </div>
      <nav className="mt-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""} ${
                isExpanded ? "px-4" : "px-2 justify-center"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {isExpanded && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
