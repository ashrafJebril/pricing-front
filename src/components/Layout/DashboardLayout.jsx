import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="h-screen flex">
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}