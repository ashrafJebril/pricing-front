import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch.auth.logout();
  };

  return (
    <header className="bg-white border-b">
      <div className="px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}