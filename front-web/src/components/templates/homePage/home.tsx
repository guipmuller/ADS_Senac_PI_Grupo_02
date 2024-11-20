import Button from "@/components/atoms/Button/button";
import Input from "@/components/atoms/Input/input";
import ProfileCard from "@/components/atoms/ProfileCard/ProfileCard";
import ProfileList from "@/components/atoms/ProfileList/ProfileList";
import Image from "next/image";

const HomeTemplate = () => {
  return (
    <>
      <header className="shadow flex h-20 items-end">
        <h1 className="text-2xl font-semibold text-center p-4">
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
          <ProfileCard name="Maria Silva" experience="3 anos de experiência" />
          <ProfileCard name="Maria Silva" experience="3 anos de experiência" />
        </span>
        <h2 className="text-2xl font-semibold my-3">
          Profissionais disponíveis agora:
        </h2>
        <span>
          <ProfileList
            name="Carla Pereira"
            role="Enfermeira Registrada"
            label="Disponível para plantão noturno"
          />
        </span>
        <Button
        text="Ver todos"
          classname="w-full py-2 text-sm font-medium text-white border border-gray-300 rounded-md focus:outline-none bg-black hover:bg-white hover:text-black"
          type="button"
        />
      </main>
    </>
  );
};

export default HomeTemplate;
