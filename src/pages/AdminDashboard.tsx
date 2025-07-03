import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Analytics Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div>
              <p className="text-gray-600">Active Bookings</p>
              <p className="text-2xl font-bold">56</p>
            </div>
            <div>
              <p className="text-gray-600">Revenue (Monthly)</p>
              <p className="text-2xl font-bold">$45,678</p>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="font-medium">Paris Package - Premium</p>
              <p className="text-sm text-gray-600">Booked by John Doe</p>
              <p className="text-sm text-gray-600">Status: Confirmed</p>
            </div>
            <div className="border-b pb-2">
              <p className="font-medium">Tokyo Adventure Tour</p>
              <p className="text-sm text-gray-600">Booked by Jane Smith</p>
              <p className="text-sm text-gray-600">Status: Pending</p>
            </div>
            <div>
              <p className="font-medium">Safari Experience</p>
              <p className="text-sm text-gray-600">Booked by Mike Johnson</p>
              <p className="text-sm text-gray-600">Status: Confirmed</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Add New Package
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
              Manage Bookings
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition">
              View Reports
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <p className="font-medium">New User Registration</p>
              <p className="text-sm text-gray-600">Sarah Wilson joined the platform</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <p className="font-medium">Package Updated</p>
              <p className="text-sm text-gray-600">Bali Retreat package price updated</p>
            </div>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Booking Cancelled</p>
              <p className="text-sm text-gray-600">Booking #1234 was cancelled</p>
            </div>
            <span className="text-sm text-gray-500">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;