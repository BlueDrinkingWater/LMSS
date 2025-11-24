import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../../components/Common/Input';

const RegisterTeam = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('jerseyColor', data.jerseyColor);
    formData.append('homeCourt', data.homeCourt);
    formData.append('history', data.history);
    if (data.logo[0]) {
      formData.append('logo', data.logo[0]);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`
        }
      };
      await axios.post('/api/teams', formData, config);
      toast.success('Team registered successfully!');
      navigate('/subscriber/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register Your Team</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Team Name" name="name" register={register} errors={errors} placeholder="Ex. Lakers" />
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Team Logo</label>
          <input type="file" {...register('logo')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>

        <Input label="Jersey Color" name="jerseyColor" register={register} errors={errors} placeholder="Ex. Purple & Gold" />
        <Input label="Home Court (Optional)" name="homeCourt" register={register} required={false} errors={errors} placeholder="Ex. Staples Center" />
        
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Team History / Bio</label>
            <textarea {...register('history')} className="shadow border rounded w-full py-2 px-3 text-gray-700 h-24" placeholder="Brief description..."></textarea>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
          {loading ? 'Submitting...' : 'Register Team'}
        </button>
      </form>
    </div>
  );
};

export default RegisterTeam;