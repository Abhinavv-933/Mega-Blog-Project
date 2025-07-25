import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import authService from '../appwrite/auth';
import { Login } from '../store/authSlice';
import { Button, Input, Logo } from './Index';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError('');
    try {
      console.log('📨 Creating account...');
      const user = await authService.createAccount(data); // now returns user

      console.log('✅ Account created:', user);

      if (user) {
        dispatch(Login({ userData: user }));
        navigate('/');
      }
    } catch (error) {
      console.error('❌ Signup error:', error);
      setError(error?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10 shadow">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold">Sign up to create account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register('name', { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register('email', {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  'Email address must be valid',
              },
            })}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register('password', { required: true })}
          />
         <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
         </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
