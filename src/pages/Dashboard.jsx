import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoughnutChart from "../components/dashboard/DoughnutChart";

export default function Dashboard() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.dashboard.stats);

  useEffect(() => {
    dispatch.dashboard.fetchStats();
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.total_user}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Products</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.total_products}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Customers</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.total_customers}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Quotes</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.total_quotes}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoughnutChart
          dataList={[parseInt(stats.total_ready_quotes) || 1, parseInt(stats.total_sent_quotes) || 2, parseInt(stats.total_quotes_today) || 3]}
        />
      </div>
    </div>
  );
}
