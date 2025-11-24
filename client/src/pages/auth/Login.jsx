import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Common/Input';
import toast from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await login(data.email, data.password);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success('Welcome back!');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
            label="Email" 
            name="email" 
            type="email" 
            register={register} 
            errors={errors} 
            placeholder="you@example.com"
          />
          <Input 
            label="Password" 
            name="password" 
            type="password" 
            register={register} 
            errors={errors} 
            placeholder="********"
          />
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;