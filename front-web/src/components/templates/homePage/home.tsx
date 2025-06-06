"use client";

import Input from "@/components/atoms/Input/input";
import ProfileCard from "@/components/atoms/ProfileCard/ProfileCard";
import ProfileList from "@/components/atoms/ProfileList/ProfileList";
import { Professional } from "@/hooks/api/useCareProfessionalsApi";
import logo from "../../../assets/images/logo.png";
import Image from "next/image";
import BurgerMenu from "@/components/atoms/BurgerMenu/BurgerMenu";

type Props = {
  professionals: Professional[];
};

const HomeTemplate: React.FC<Props> = ({ professionals }) => {
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
        <BurgerMenu />
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
          {professionals.slice(0, 2).map((professional) => (
            <ProfileCard
              key={professional.id}
              name={professional.user!.name}
              experience={professional.professionalBiography}
              idUser={professional.user!.id}
              image={professional?.user?.urlImage}
            />
          ))}
        </span>

        <h2 className="text-2xl font-semibold my-3">
          Profissionais disponíveis agora:
        </h2>
        <span>
          {professionals.map(
            (professional) =>
              professional?.id &&
              professional.id % 2 === 0 && (
                <ProfileList
                  key={professional.id}
                  name={professional.user!.name}
                  role={`${professional.professionalBiography}`}
                  label="Disponível para plantão"
                />
              )
          )}
        </span>

        <button
          className="mt-4 bg-[#348a89] hover:bg-[#2c7472] transition-colors duration-300 text-white px-6 py-2 font-semibold rounded w-full"
          type="button"
        >
          Ver todos
        </button>
      </main>
    </>
  );
};

export default HomeTemplate;
