import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ManagePlayers = () => {
  const { teamId } = useParams();
  const { user } = useAuth();
  const [players, setPlayers] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [editingStatsId, setEditingStatsId] = useState(null);

  const fetchPlayers = async () => {
    try {
      const { data } = await axios.get(`/api/players/team/${teamId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setPlayers(data);
    } catch (error) {
      toast.error('Failed to load players');
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [teamId]);

  const onAddPlayer = async (data) => {
    const formData = new FormData();
    formData.append('teamId', teamId);
    formData.append('name', data.name);
    formData.append('position', data.position);
    formData.append('jerseyNumber', data.jerseyNumber);
    if (data.photo[0]) formData.append('photo', data.photo[0]);

    try {
      await axios.post('/api/players', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` }
      });
      toast.success('Player added');
      reset();
      fetchPlayers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding player');
    }
  };

  const onUpdateStats = async (playerId, e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const stats = Object.fromEntries(formData.entries());
    
    try {
       await axios.put(`/api/players/${playerId}/stats`, stats, {
         headers: { Authorization: `Bearer ${user.token}` }
       });
       toast.success('Stats updated');
       setEditingStatsId(null);
       fetchPlayers();
    } catch (error) {
       toast.error('Update failed');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Roster & Stats</h1>
      
      {/* Add Player Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="text-lg font-bold mb-4">Add New Player</h3>
        <form onSubmit={handleSubmit(onAddPlayer)} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1"><input {...register('name', {required:true})} placeholder="Player Name" className="border p-2 rounded w-full"/></div>
          <div className="w-32"><input {...register('position', {required:true})} placeholder="Pos (PG)" className="border p-2 rounded w-full"/></div>
          <div className="w-24"><input type="number" {...register('jerseyNumber', {required:true})} placeholder="#" className="border p-2 rounded w-full"/></div>
          <div className="flex-1"><input type="file" {...register('photo')} className="text-sm"/></div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
        </form>
      </div>

      {/* Player List Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Info</th>
              <th className="p-4">PTS</th>
              <th className="p-4">REB</th>
              <th className="p-4">AST</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player._id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                   {player.photo ? <img src={player.photo} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 bg-gray-200 rounded-full"></div>}
                   <div>
                     <p className="font-bold">{player.name}</p>
                     <p className="text-sm text-gray-500">#{player.jerseyNumber} | {player.position}</p>
                   </div>
                </td>
                
                {editingStatsId === player._id ? (
                  <td colSpan="4" className="p-4 bg-blue-50">
                    <form onSubmit={(e) => onUpdateStats(player._id, e)} className="flex gap-2 items-center">
                      <input name="points" defaultValue={player.stats.points} className="w-16 border p-1 rounded" placeholder="PTS" />
                      <input name="rebounds" defaultValue={player.stats.rebounds} className="w-16 border p-1 rounded" placeholder="REB" />
                      <input name="assists" defaultValue={player.stats.assists} className="w-16 border p-1 rounded" placeholder="AST" />
                      <button type="submit" className="text-green-600 font-bold ml-2">Save</button>
                      <button type="button" onClick={() => setEditingStatsId(null)} className="text-red-500 ml-2">Cancel</button>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="p-4">{player.stats.points}</td>
                    <td className="p-4">{player.stats.rebounds}</td>
                    <td className="p-4">{player.stats.assists}</td>
                    <td className="p-4">
                      <button onClick={() => setEditingStatsId(player._id)} className="text-blue-600 hover:underline">Update Stats</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePlayers;