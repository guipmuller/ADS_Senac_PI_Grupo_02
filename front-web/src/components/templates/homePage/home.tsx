"use client";

import Input from "@/components/atoms/Input/input";
import ProfileCard from "@/components/atoms/ProfileCard/ProfileCard";
import ProfileList from "@/components/atoms/ProfileList/ProfileList";
import {
  Professional,
  useCareProfessionalsApi,
} from "@/hooks/api/useCareProfessionalsApi";
import { User, useUsersApi } from "@/hooks/api/useUsersApi";
import { useEffect, useState } from "react";
import logo from "../../../assets/images/logo.png";
import Image from "next/image";

// interface CareProfessional {
//   idCareProfessional: number;
//   professionalRegistryCode: string;
//   professionalBiography: string;
//   rating: number;
//   createdAt: string;
//   updatedAt: string;
//   idUser: number;
// }

// interface User {
//   idUser: number;
//   name: React.ReactNode;
//   email: string;
// }

const HomeTemplate = () => {
  //const URL = "https://ads-senac-pi-grupo-04-quarto-semestre.onrender.com/api/";

  const userApi = useUsersApi();
  const professionalApi = useCareProfessionalsApi();

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    Promise.all([userApi.getAll(), professionalApi.getAll()])
      .then(([userRes, profRes]) => {
        setUsers(userRes.data);
        setProfessionals(profRes.data);
      })
      .catch((error) => console.error("Erro ao carregar dados:", error));
  }, [professionalApi, userApi]);

  console.log(users);
  console.log(professionals);

  /* useEffect(() => {
    Promise.all([
      axios.get<CareProfessional[]>(`${URL}careProfessionals`),
      axios.get<User[]>(`${URL}users`),
    ])
      .then(([professionalResponse, userResponse]) => {
        setProfessionals(professionalResponse.data);
        setUsers(userResponse.data);
      })
      .catch((error) => console.error("Erro ao carregar dados:", error));
  }, []); */

  const getName = (idPerson: string) => {
    for (const f of professionals) {
      for (const g of users) {
        if (+idPerson === f.id && f.idUser === g.id) {
          return g.name;
        }
      }
    }
    return null;
  };

  return (
    <>
      <header className="shadow flex h-20 items-center justify-center bg-gradient-to-br from-[#ccefdb] to-[#cce5ff]">
        <span className="w-12 rounded-full border-2 border-[#348a89]">
          <Image
            src={logo}
            alt="Logo Pacientes & Cuidadores"
            className="rounded-full"
          />
        </span>
        <h1 className="text-2xl font-semibold text-center p-4 text-[#348a89]">
          Pacientes & Cuidadores
        </h1>
      </header>
      <main className="flex flex-col h-screen p-4">
        <section>
          <p>
            <strong>Buscar cuidadores ou profissionais</strong>
          </p>
          <Input
            type="text"
            classname="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            placeholder="Digite aqui para buscar"
          />
        </section>
        <h2 className="text-2xl font-semibold my-3">Cuidadores em destaque</h2>
        <span className="flex gap-4">
          {professionals.slice(0, 2).map((professional) => {
            const name = getName(String(professional.idUser));
            return (
              <ProfileCard
                key={professional.idUser}
                name={String(name)}
                experience={professional.professionalBiography}
                idUser={professional.idUser}
              />
            );
          })}
        </span>

        <h2 className="text-2xl font-semibold my-3">
          Profissionais disponíveis agora:
        </h2>
        <span>
          {professionals.map((professional) => {
            const name = getName(String(professional.idUser));
            return (
              <ProfileList
                key={professional.id}
                name={String(name)}
                role={`${professional.professionalBiography}`}
                label="Disponível para plantão"
              />
            );
          })}
        </span>

        <button
          className="mt-4 bg-[#69b6b3] hover:bg-[#489e9b] transition-colors duration-500 text-white px-6 py-2 font-semibold rounded w-full"
          type="button"
        >
          Ver todos
        </button>
      </main>
    </>
  );
};

export default HomeTemplate;
