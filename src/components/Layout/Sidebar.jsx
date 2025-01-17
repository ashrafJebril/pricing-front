import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  UsersIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChartPieIcon
} from "@heroicons/react/24/outline";

import { useSelector, useDispatch } from "react-redux";

const navigation = [
  {role: "ADMIN", name: "Dashboard", to: "/dashboard", icon: ChartPieIcon },
  {role: "ADMIN", name: "Users", to: "/users", icon: UsersIcon },
  {role: "ADMIN", name: "Products", to: "/products", icon: ShoppingBagIcon },
  {role: "ADMIN", name: "Customers", to: "/customers", icon: UserGroupIcon },
  {role: "ADMIN", name: "Settings", to: "/settings", icon: Cog6ToothIcon },
  {role: "USER",
    name: "Quotes",
    icon: Cog6ToothIcon,
    subItems: [
      { name: "Quotes List", to: "/quotes/list" },
      { name: "Generate Quote", to: "/quotes/generate" },
    ],
  },
];

export default function Sidebar({ isExpanded, toggleSidebar }) {
  const user = useSelector((state) => state.auth.user);

  const [expandedMenus, setExpandedMenus] = useState([]);

  // Toggle the expanded state of a menu
  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    );
  };

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
        {navigation
          .filter(
            (item) => user.user.role == "ADMIN" || item.role == user.user.role
          ).map((item) => (
          <div key={item.name} className="mb-2">
            {/* Handle expandable menu */}
            {!item.subItems ? (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-white ${
                    isActive ? "bg-indigo-600" : ""
                  } ${
                    isExpanded ? "px-4 py-2" : "px-2 py-3 justify-center"
                  } rounded-lg hover:bg-indigo-700 transition-all`
                }
              >
                <item.icon className="w-5 h-5" />
                {isExpanded && <span>{item.name}</span>}
              </NavLink>
            ) : (
              <div>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`flex items-center w-full gap-2 text-white ${
                    isExpanded ? "px-4 py-2" : "px-2 py-3 justify-center"
                  } rounded-lg hover:bg-indigo-700 transition-all`}
                >
                  <item.icon className="w-5 h-5" />
                  {isExpanded && (
                    <>
                      <span>{item.name}</span>
                      {expandedMenus.includes(item.name) ? (
                        <ChevronUpIcon className="w-4 h-4 ml-auto" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 ml-auto" />
                      )}
                    </>
                  )}
                </button>
                {expandedMenus.includes(item.name) && (
                  <div className="mt-2 ml-8">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.to}
                        className={({ isActive }) =>
                          `block text-white ${
                            isActive ? "bg-indigo-600" : ""
                          } ${
                            isExpanded
                              ? "px-4 py-2"
                              : "px-2 py-3 justify-center"
                          } rounded-lg hover:bg-indigo-700 transition-all`
                        }
                      >
                        {isExpanded && <span>{subItem.name}</span>}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
