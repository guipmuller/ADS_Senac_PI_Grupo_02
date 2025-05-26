"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import userIcon from "../../../assets/images/usericon.svg";
import closeIcon from "../../../assets/images/close.svg";
import Link from "next/link";

interface ProfileCardProps {
  idUser: number;
  name: string;
  experience: string;
  image?: string;
}

interface UserDetails {
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  urlImage: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  idUser,
  name,
  experience,
  image
}) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const URL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${URL}/users/${idUser}`);
      setUserDetails(response.data);      
      setShowDetails(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes do usuário:", error);
    }
  };

  const closeModal = () => {
    setShowDetails(false);
  }

  return (
    <>
      {/* Card */}
      <div
        className="w-2/4 h-72 border border-gray-300 rounded-lg bg-white flex flex-col cursor-pointer hover:shadow-lg"
        onClick={fetchDetails}
      >
        <div className="w-full h-3/4 bg-gray-200 flex items-center justify-center">
          <Image
            priority
            src={image || userIcon}
            width={200}
            height={200}
            alt="User icon"
            className="max-h-full max-w-full" />
        </div>
        <span className="p-4">
          <p className="text-lg font-bold text-nowrap">{name}</p>
          <p className="text-sm text-gray-600">{experience}</p>
        </span>
      </div>

      {/* Modal */}
      {showDetails && userDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-3/4 max-w-lg p-6 rounded-lg shadow-lg">
            <span className="flex justify-end">
              <button onClick={closeModal}>
                <Image
                  src={closeIcon}
                  alt="Close icon"
                  className="w-6 h-6 object-cover"
                />
              </button>
            </span>
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-slate-200 rounded-full flex items-center justify-center min-w-10 min-h-10 w-10 h-10">
                <Image
                  src={userIcon}
                  alt="User icon"
                  className="w-6 h-6 object-cover"
                />
              </span>
              <span>
                <p className="text-lg font-bold">{userDetails.name}</p>
                <p className="text-xs text-gray-600">{experience}</p>
              </span>
            </div>

            <p className="text-lg font-semibold">Avaliações dos Clientes</p>
            <div className="mb-4 bg-slate-100 p-1 rounded-sm">
              <div className="flex items-center gap-2 ">
                <span className="bg-slate-300 rounded-full flex items-center justify-center min-w-5 min-h5 w-5 h-5">
                  <Image
                    src={userIcon}
                    alt="User icon"
                    className="w-3 h-3 object-cover"
                  />
                </span>
                <span className="font-semibold">Lucas Pereira</span>
                <div className="flex items-center ml-2">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Excelente profissional!
              </p>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold">Informações de Contato</p>
              <p>
                <strong>E-mail:</strong> {userDetails.email}
              </p>
              <hr className="my-2"/>
              <p>
                <strong>Telefone:</strong> {userDetails.phoneNumber}
              </p>
            </div>

            <Link href="/my-schedules">
            <button
              className="mt-4 bg-black text-white px-6 py-2 rounded w-full"
              type="button"
            >
              Agendar
            </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
