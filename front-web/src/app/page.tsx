/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

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
			router.push('/');
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-300 via-cyan-50 to-green-100">
			<div className="w-full max-w-xs p-4 bg-white rounded shadow-md">
				<h1 className="text-2xl font-semibold text-center mb-6">
					Pacientes & Cuidadores 
				</h1>
				{error && (
					<p className="text-red-500">Usuário ou senha inválidos.</p>
				)}
				<form className="space-y-4">
					<div>
						<label
							className="block text-sm font-medium text-gray-700"
							htmlFor="email"
						>
							E-mail
						</label>
						<input
							className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
							type="email"
							id="email"
							value={email}
							placeholder="Digite seu e-mail"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							className="block text-sm font-medium text-gray-700"
							htmlFor="password"
						>
							Senha
						</label>
						<input
							className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
							type="password"
							id="password"
							value={password}
							placeholder="Digite sua senha"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="flex space-x-2">
						<button
							className="w-full py-2 text-sm font-medium text-gray-700 border border-gray-300 transition-colors duration-400 ease-in-out rounded focus:outline-none hover:bg-blue-300 hover:text-white"
							type="button"
						>
							Criar conta
						</button>
						<button
							className="w-full py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded focus:outline-none hover:bg-blue-300 hover:text-white transition-colors duration-400 ease-in-out"
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
