/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import logo from "../assets/images/logo.png";
import Image from "next/image";

function LoginTemplate() {
	const { login } = useAuth();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			router.push('/home-page');
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
<div className="relative flex flex-col items-center justify-center min-h-screen">
  <div className="absolute inset-0 bg-[url('/backgroundlogin.jpg')] bg-cover bg-center brightness-75"></div>

  <div className="relative z-10 w-full max-w-xs p-6 bg-white rounded-lg shadow-xl">
	<span className='flex justify-center'>
          <Image
            src={logo}
            alt="Logo Pacientes & Cuidadores"
            className="rounded-full w-20 border-2 border-[#348a89]"
          />
        </span>
    <h1 className="text-2xl font-semibold text-center my-4 text-[#348a89]">
      Pacientes & Cuidadores
    </h1>
    
    {error && (
      <p className="p-2 mb-4 text-sm text-center text-red-600 bg-red-50 rounded">
        Usuário ou senha inválidos
      </p>
    )}
    
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          E-mail
        </label>
        <input
          className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          type="email"
          id="email"
          value={email}
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          Senha
        </label>
        <input
          className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          type="password"
          id="password"
          value={password}
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="flex space-x-3">
        <Link href='register-page' className="w-full">
          <button
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-500 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="button"
          >
            Criar conta
          </button>
        </Link>
        
        <button
          className="w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-500 bg-[#69b6b3] rounded-md hover:bg-[#489e9b] focus:outline-none focus:ring-2 focus:ring-gray-500"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </form>
  </div>
</div>
	);
}

export default LoginTemplate;
