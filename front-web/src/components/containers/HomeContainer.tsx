"use client";

import { Professional, useCareProfessionalsApi } from "@/hooks/api/useCareProfessionalsApi";
import { useEffect, useState } from "react";
import HomeTemplate from '../templates/homePage/home';

export default function HomeContainer() {
  const professionalApi = useCareProfessionalsApi();

  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
  professionalApi.getAll()
    .then((profRes) => {
      setProfessionals(profRes.data);
    })
    .catch((error) => console.error("Erro ao carregar dados:", error));
}, []);

if (!professionals.length) {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-grey-500"></div>
      </div>
    );
}

  return (
    <HomeTemplate professionals={professionals} />
  );
}
