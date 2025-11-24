import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SubscriberDashboard = () => {
  const { user, logout } = useAuth();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/teams/my-teams', config);
      setTeams(data);
    };
    fetchTeams();
  }, [user.token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <h1 className="text-2xl font-bold">Subscriber Dashboard</h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>
      </nav>
      
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Action Card: Register Team */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manage Teams</h2>
            <p className="text-gray-600 mb-4">Register a new team or manage existing ones.</p>
            <Link to="/subscriber/register-team" className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Register New Team
            </Link>
          </div>

          {/* Action Card: Join League */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Leagues</h2>
            <p className="text-gray-600 mb-4">Browse available leagues and join.</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Browse Leagues</button>
          </div>

        </div>

        {/* My Teams List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">My Teams</h2>
          {teams.length === 0 ? (
            <p className="text-gray-500">You haven't registered any teams yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div key={team._id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                  <div className="flex items-center mb-3">
                    {team.logo && <img src={team.logo} alt="Logo" className="w-12 h-12 rounded-full mr-3 object-cover" />}
                    <div>
                      <h3 className="font-bold text-lg">{team.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${team.leagueStatus === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {team.leagueStatus}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Jersey: {team.jerseyColor}</p>
                  <Link to={`/subscriber/manage-team/${team._id}`} className="mt-4 block text-center text-blue-600 border border-blue-600 py-1 rounded hover:bg-blue-50">
                    Manage Players & Stats
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriberDashboard;