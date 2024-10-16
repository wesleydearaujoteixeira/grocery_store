'use client';

import { login } from '@/app/utils/GlobalService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState} from 'react';
import { LoaderIcon } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);

      toast.success('User logged in successfully!');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('jwt', res.data.jwt); // Armazenando apenas o token
      router.push('/');

      setTimeout(() => {
        location.reload();
      }, 500)

  
    } 
    catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred while logging in.');
    
    
    } finally {
      setLoading(false);
    }


  };



  return (
    <div className="flex items-center justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200 rounded-md shadow-md">
        <Image
          src="/grocery_stor.png"
          alt="Logo"
          width={200}
          height={200}
        />

        <h2 className="font-bold text-3xl">Login</h2>
        <p className="text-gray-500">Enter your email and password</p>

        <div className="flex flex-col items-center w-full gap-5 mt-7">
          <Input 
            type="email" 
            placeholder="youremail@example.com" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="password" 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <Button 
            onClick={handleLogin} 
            disabled={loading}
          >
            {loading ? <LoaderIcon className='animate-spin'/> : 'Login'}

          </Button>

          <p className="mt-4"> Don`t have an account? 
            <Link className="text-blue-500" href="/create-account">
              Click here to register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
