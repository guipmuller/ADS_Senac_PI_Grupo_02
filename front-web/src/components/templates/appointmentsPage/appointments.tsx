"use client";
import React, { useState } from "react";
import BaseTemplate from "../BaseTemplate/BaseTemplate";
import Button from "@/components/atoms/Button/button";
import { ButtonProps } from "@/components/atoms/Button/types";
import { formAppointmentType } from "./types";
import { FaChevronLeft } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { FiRefreshCcw } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { Appointment, UpdateAppointment } from "@/hooks/api/useAppointments";
import { Patient } from "@/hooks/api/usePatientsApi";
import { Professional } from "@/hooks/api/useCareProfessionalsApi";

interface Props {
  appointments: Appointment[];
  patients: Patient[];
  professionals: Professional[];
  onCreate: (data: Appointment) => Promise<void>;
  onEdit: (id: string, data: UpdateAppointment) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const AppointmentsTemplate: React.FC<Props> = ({
  appointments,
  patients,
  professionals,
  onCreate,
  onEdit,
  onDelete }) => {
  const [error, setError] = useState("");
  const [toggleNewAppointments, setToggleNewAppointments] = useState<boolean>(false);
  const [sendEdit, setSendEdit] = useState<boolean>(false);
  const [form, setForm] = useState<formAppointmentType>({
    scheduledAt: "",
    status: " ",
    address: {
      street: " ",
      number: " ",
      complement: " ",
      neighborhood: " ",
      city: " ",
      state: " ",
      postalCode: " ",
      country: " ",
    },
    idPatient: 0,
    idCareProfessional: 0,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: UpdateAppointment = {
      scheduledAt: new Date(form.scheduledAt),
      status: form.status,
      idAddress: form.address.id!
    }
    try {
      if (sendEdit && editId) {
        await onEdit(editId, data);
      } else {
        await onCreate(form as Appointment);
      }
      resetForm();
    } catch (err) {
      console.error("Error:", err);
      setError("Erro ao salvar agendamento");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
    } catch (err) {
      console.error("Error:", err);
      setError("Erro ao deletar agendamento");
    }
  };

  const editAppointment = (appointment: Appointment) => {
    setSendEdit(true);
    setToggleNewAppointments(true);
    setFormData({
      ...appointment,
    });
    setEditId(appointment.id!.toString());
  };

  const resetForm = () => {
    setFormData({
      date: "",
      time: "",
      location: "",
      idPatient: 0,
      idCareProfessional: 0,
    });
    setSendEdit(false);
    setToggleNewAppointments(false);
    setEditId(null);
    setError("");
  };

  const CuidadorNome = ({ id }: { id: number }) => {
    const profissional = professionals.find(p => p.id === id);
    return <span>{profissional ? profissional.user.name : "Desconhecido"}</span>;
  };

  const appointmentButton = {
    text: "Agendar novo",
    classname:
      "w-full py-2 mt-2 text-sm font-medium text-white border border-gray-100 bg-black rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700",
    onclick: () => {
      setToggleNewAppointments(!toggleNewAppointments);
    },
    type: "submit",
  } as ButtonProps;

  if (error) return <p>Erro: {error}</p>;
  if (
    !appointments.length ||
    !professionals.length ||
    !patients.length
  )
    return <p>Carregando</p>;
  return (
    <BaseTemplate>
      <header className="py-4 flex items-center justify-start w-full">
        <Link href="/home-page">
          <FaChevronLeft />
        </Link>
        <h2 className="text-2xl font-semibold mx-4">Meus agendamentos</h2>
      </header>
      <div className="my-4 w-full">
        <h3 className="text-xl font-semibold">Próximos agendamentos</h3>

        {appointments.map((e) => (
          <div key={e.id} className="my-3">
            <div>
              <span className="text-gray-500">
                {new Date(e.date).toLocaleDateString()} - {e.time}
              </span>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <CiCalendarDate className="text-5xl" />
                <div className="flex flex-col">
                  <span>
                    Cuidador: <CuidadorNome id={e.idCareProfessional} />
                  </span>
                  <span className="text-gray-500">Local: {e.location}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold w-28 flex flex-col">
                  <span className="flex justify-end">(51)</span>
                  <span className="flex justify-end text-nowrap">
                    99999-6666
                  </span>
                </span>
                <FiRefreshCcw
                  className="text-xl mx-2 cursor-pointer"
                  onClick={() => editAppointment(e)}
                />
                <IoClose
                  className="text-xl text-red-700 cursor-pointer"
                  onClick={() => handleDelete(e.id!.toString())}
                />
              </div>
            </div>
            <hr />
          </div>
        ))}
        <Button {...appointmentButton} />
        {toggleNewAppointments && (
          <div className="my-4 w-full">
            <h3 className="text-xl font-semibold">Novo agendamento</h3>
            <form
              onSubmit={sendEdit ? handleEdit : handleSubmit}
              className="w-full flex flex-col"
            >
              <label>
                Digite o ID do Paciente
                <input
                  id="idPatient"
                  name="idPatient"
                  type="number"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.idPatient}
                />
              </label>
              <label>
                Digite o ID do Profissional
                <input
                  id="idCareProfessional"
                  name="idCareProfessional"
                  type="number"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.idCareProfessional}
                />
              </label>
              <label>
                Digite o endereço
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.location}
                />
              </label>
              <label>
                Selecione a data
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.date}
                />
              </label>
              <label>
                Selecione a data
                <input
                  id="time"
                  name="time"
                  type="time"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.time}
                />
              </label>
              {sendEdit ? (
                <button type="submit" className="bg-lime-800 text-white">
                  Atualizar
                </button>
              ) : (
                <button type="submit" className="bg-lime-800 text-white">
                  Enviar
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default AppointmentsTemplate;
