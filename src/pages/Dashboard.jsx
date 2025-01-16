import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.dashboard.stats);

  useEffect(() => {
    dispatch.dashboard.fetchStats();
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Products</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.products}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Customers</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.customers}</p>
        </div>
      </div>
    </div>
  );
}