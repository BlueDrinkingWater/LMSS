import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [teams, setTeams] = useState([]);

  // Fetch all teams for the admin to see
  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/teams', config);
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams", error);
      }
    };
    fetchAllTeams();
  }, [user.token]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Top Navigation */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold text-blue-400">Admin Control Panel</h1>
        <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user?.name}</span>
            <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1.5 rounded">
                Logout
            </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-5 rounded-lg shadow border-l-4 border-blue-500">
                <h3 className="text-gray-400 text-sm uppercase">Total Teams</h3>
                <p className="text-2xl font-bold">{teams.length}</p>
            </div>
            <div className="bg-gray-800 p-5 rounded-lg shadow border-l-4 border-green-500">
                <h3 className="text-gray-400 text-sm uppercase">Active Players</h3>
                <p className="text-2xl font-bold">--</p>
            </div>
            <div className="bg-gray-800 p-5 rounded-lg shadow border-l-4 border-yellow-500">
                <h3 className="text-gray-400 text-sm uppercase">Pending Requests</h3>
                <p className="text-2xl font-bold">0</p>
            </div>
            <div className="bg-gray-800 p-5 rounded-lg shadow border-l-4 border-purple-500">
                <h3 className="text-gray-400 text-sm uppercase">Leagues</h3>
                <p className="text-2xl font-bold">1</p>
            </div>
        </div>

        {/* Teams Table */}
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Registered Teams</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-gray-700 text-gray-200 uppercase">
                        <tr>
                            <th className="p-3">Team Name</th>
                            <th className="p-3">Coach</th>
                            <th className="p-3">Jersey</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team._id} className="border-b border-gray-700 hover:bg-gray-750">
                                <td className="p-3 flex items-center gap-2">
                                    {team.logo && <img src={team.logo} className="w-8 h-8 rounded-full" alt="logo"/>}
                                    <span className="font-medium text-white">{team.name}</span>
                                </td>
                                <td className="p-3">{team.coach?.name || 'Unknown'}</td>
                                <td className="p-3">{team.jerseyColor}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        team.leagueStatus === 'Approved' ? 'bg-green-900 text-green-300' : 
                                        team.leagueStatus === 'Pending' ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
                                    }`}>
                                        {team.leagueStatus}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                                    <button className="text-red-400 hover:text-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;