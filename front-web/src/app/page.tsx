/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

function LoginTemplate() { 
	const { login, signUp } = useAuth();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [isRegistering, setIsRegistering] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (isRegistering) {
			// Validação de senha
			if (password !== confirmPassword) {
				setError('As senhas não coincidem.');
				return;
			}
			try {
				await signUp(email, password);
				router.push('/register');
			} catch (err: any) {
				setError(err.message);
			}
		} else {
			try {
				await login(email, password);
				router.push('/home');
			} catch (err: any) {
				setError(err.message);
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-xs p-4 bg-white rounded shadow-md">
				<h1 className="text-2xl font-semibold text-center mb-6">
					Pacientes & Cuidadores
				</h1>
				{error && <p className="text-red-500">{error}</p>}
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label className="block text-sm font-medium text-gray-700" htmlFor="email">
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
						<label className="block text-sm font-medium text-gray-700" htmlFor="password">
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

					{isRegistering && (
						<div>
							<label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
								Confirmar senha
							</label>
							<input
								className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								placeholder="Confirme sua senha"
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
					)}

					<div className="flex space-x-2">
						<button
							className="w-full py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded focus:outline-none hover:bg-black hover:text-white"
							type="submit"
						>
							{isRegistering ? 'Cadastrar' : 'Login'}
						</button>
						<button
							className="w-full py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded focus:outline-none hover:bg-black hover:text-white"
							type="button"
							onClick={() => setIsRegistering(!isRegistering)}
						>
							{isRegistering ? 'Cancelar' : 'Criar conta'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginTemplate;
