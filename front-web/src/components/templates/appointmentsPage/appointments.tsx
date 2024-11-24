"use client";
import React, { useEffect, useState } from "react";
import BaseTemplate from "../BaseTemplate/BaseTemplate";
import Button from "@/components/atoms/Button/button";
import { ButtonProps } from "@/components/atoms/Button/types";

type appointmentType = {
  idAppointment: number;
  date: string;
  time: string;
  location: string;
  idPatient: number;
  idCareProfessional: number;
  createdAt: string;
  updatedAt: string;
};

type patientType = {
  idPatient: number;
  patientName: string;
  patientCPF: string;
  patientBirthDate: string;
  createdAt: string;
  updatedAt: string;
  idUser: number;
};

type careProfessionalType = {
  idCareProfessional: number,
  professionalRegistryCode: string,
  professionalBiography: string,
  rating: number,
  createdAt: string,
  updatedAt: string,
  idUser: number
};

const AppointmentsTemplate = () => {
  const [appointmentData, setAppointmentData] = useState<appointmentType[]>([]);
  const [patientData, setpatientData] = useState<patientType[]>([]);
  const [careProfessionalData, setCareProfessionalData] = useState<careProfessionalType[]>([]);
  const [error, setError] = useState(null);

  const appointmentButton = {
    text: "Agendar novo",
    classname:
      "w-full py-2 mt-2 text-sm font-medium text-gray-700 border border-gray-100 bg-gray-100 rounded focus:outline-none hover:bg-black hover:text-white",
    onclick: () => console.log("Agendar novo"),
    type: "submit",
  } as ButtonProps;

  useEffect(() => {
    fetch(
      "https://ads-senac-pi-grupo-04-quarto-semestre.onrender.com/api/appointments"
    )
      .then((res) => {
        if (!res) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then((appointmentData) => setAppointmentData(appointmentData))
      .catch((err) => setError(err.message));
  });

  if (error) return <p>Erro: {error}</p>;
  if (!appointmentData.length) return <p>Carregando</p>;
  return (
    <BaseTemplate>
      <h2 className="my-4">Meus agendamentos</h2>
      <div>
        <div>
          <h3 className="my-4">Próximos agendamentos</h3>
          {appointmentData.map((e) => (
            <div key={e.idAppointment}>
              <div className="my-3">
                <p>
                  {new Date(e.date).toLocaleDateString()} - {e.time}
                </p>
                <p>Local: {e.location}</p>
              </div>
            </div>
          ))}
        </div>
        <Button {...appointmentButton} />
      </div>
    </BaseTemplate>
  );
};

export default AppointmentsTemplate;
