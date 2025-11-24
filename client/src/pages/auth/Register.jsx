import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Common/Input';
import toast from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await registerUser(data.name, data.email, data.password);
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success('Registration successful!');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
            label="Full Name" 
            name="name" 
            register={register} 
            errors={errors} 
            placeholder="John Doe"
          />
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
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;