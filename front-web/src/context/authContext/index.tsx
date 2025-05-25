'use client'; 
import React, { createContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';
import { AuthContextProps } from './types';

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	const login = async (email: string, password: string) => {
		const { signInWithEmailAndPassword } = await import('firebase/auth');
		const userCredential = await signInWithEmailAndPassword(auth, email, password);

		const token = await userCredential.user.getIdToken();

		localStorage.setItem('firebaseToken', token);
		setUser(userCredential.user);
	};

	const signUp = async (email: string, password: string) => {
		const { createUserWithEmailAndPassword } = await import('firebase/auth');
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);

		const token = await userCredential.user.getIdToken();

		localStorage.setItem('firebaseToken', token);
		setUser(userCredential.user);
	};

	const logout = async () => {
		await signOut(auth);
		localStorage.removeItem('firebaseToken');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
