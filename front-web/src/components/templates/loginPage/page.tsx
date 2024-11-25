'use client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function LoginTemplate() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleLogin = () => {
		router.push('/home-page');
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-xs p-4 bg-white rounded shadow-mdw-full shadow-md">
				<h1 className="text-2xl font-semibold text-center mb-6">
					Pacientes & Cuidadores
				</h1>
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
						/>
					</div>
					<div className="flex space-x-2">
						<button
							className="w-full py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded focus:outline-none hover:bg-black hover:text-white"
							type="button"
						>
							Criar conta
						</button>
						<button
							className="w-full py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded focus:outline-none hover:bg-black hover:text-white"
							type="button"
							onClick={handleLogin}
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