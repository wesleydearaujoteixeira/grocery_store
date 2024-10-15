'use client';

import { register } from '@/app/utils/GlobalService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const  CreateAccount = () => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  
  const RegisterAnUser = () => {    

    if(!username || !email || !password) {
      alert('Please enter a username and email and password');
      return;
    }

    register(username, email, password).then((res) => {
      alert('User registered successfully');
      console.log(res.data.user);
      console.log(res.data.jwt);

      sessionStorage.setItem('data-user', JSON.stringify(res.data.user));
      sessionStorage.setItem('data-jwt', JSON.stringify(res.data.jwt));
      router.push('/');

    }).catch((err) => {
      console.log('Error:', err);
      toast('An error occurred while registering the user');
    
    });

    setTimeout(() => {
      setUsername('');
      setEmail('');
      setPassword('');
    }, 3000);

  }
  
  return (

    <>
    <div className='flex items-baseline justify-center my-20'>
      

      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200'>

        <Image
          src="/grocery_stor.png"
          alt="Logo"
          width={200}
          height={200}
        />

        <h2 className='font-bold text-3xl '> Create an Account </h2>
        <h2 className='text-gray-500'> Enter with email and your password </h2>
        <div className='flex flex-col items-center w-full gap-5 mt-7'>

          <Input type='text' placeholder='username' onChange={e => setUsername(e.target.value)}/>
          <Input type="email" placeholder='youremail@example.com' onChange={e => setEmail(e.target.value)}/>
          <Input  placeholder='password' onChange={e => setPassword(e.target.value)}/>
          
          <Button onClick={() => RegisterAnUser()}> Create an Account </Button>
          <p>Already have an account
            <Link className='text-blue-500' href={'/login'}> Click to here to Sing-in an account </Link>
          </p>
        </div>
      </div>
    </div>

    </>

  )
}

export default CreateAccount;