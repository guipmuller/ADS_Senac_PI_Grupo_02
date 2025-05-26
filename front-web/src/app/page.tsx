/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import logo from "../assets/images/logo.png";
import Image from "next/image";

function LoginTemplate() {
  const { login, signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      // Validação de senha
      if (password !== confirmPassword) {
        setError("As senhas não coincidem.");
        return;
      }
      try {
        await signUp(email, password);
        router.push("/register");
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      try {
        await login(email, password);
        router.push("/home");
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="absolute inset-0 bg-[url('/backgroundlogin.jpg')] bg-cover bg-center brightness-75"></div>

      <div className="relative z-10 w-full max-w-xs p-6 bg-white rounded-lg shadow-xl">
        <span className="flex justify-center">
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
            {error}
          </p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
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
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
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

          {isRegistering && (
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirmar senha
              </label>
              <input
                className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-500 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="submit"
            >
              {isRegistering ? "Cadastrar" : "Login"}
            </button>
            <button
              className="w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-500 bg-[#348a89] rounded-md hover:bg-[#2c7472] focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Cancelar" : "Criar conta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginTemplate;
