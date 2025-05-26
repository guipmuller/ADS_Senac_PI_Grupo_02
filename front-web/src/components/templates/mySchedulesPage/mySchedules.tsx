"use client";
import React, { useState } from "react";
import BaseTemplate from "../BaseTemplate/BaseTemplate";
import Button from "@/components/atoms/Button/button";
import { ButtonProps } from "@/components/atoms/Button/types";
import { formAppointmentType } from "./types";
import { Appointment, UpdateAppointment } from "@/hooks/api/useAppointments";
import { Patient } from "@/hooks/api/usePatientsApi";
import { Professional } from "@/hooks/api/useCareProfessionalsApi";
import { format, parseISO } from "date-fns";
import { AppointmentHeader } from "@/components/molecules/AppointmentHeader/AppointmentHeader";
import { AppointmentList } from "@/components/organisms/AppointmentList/AppointmentList";
import { AppointmentCreateSection } from "@/components/molecules/AppointmentCreateSection/AppointmentCreateSection";
import { AppointmentForm } from "@/components/organisms/AppointmentForm/AppointmentForm";

interface Props {
  appointments: Appointment[];
  patients: Patient[];
  professionals: Professional[];
  onCreate: (form: formAppointmentType) => Promise<void>;
  onEdit: (id: number, data: UpdateAppointment) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const INITIAL_FORM_STATE: formAppointmentType = {
  date: "2025-01-01",
  time: "12:00",
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
};

const MySchedulesTemplate: React.FC<Props> = ({
  appointments,
  patients,
  professionals,
  onCreate,
  onEdit,
  onDelete,
}) => {
  const [error, setError] = useState("");
  const [toggleNewAppointments, setToggleNewAppointments] =
    useState<boolean>(false);
  const [sendEdit, setSendEdit] = useState<boolean>(false);
  const [form, setForm] = useState<formAppointmentType>(INITIAL_FORM_STATE);
  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "date") {
      setForm((prev) => ({ ...prev, date: value }));
    } else if (name === "time") {
      setForm((prev) => ({ ...prev, time: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const validateForm = () => {
    if (!form.date || !form.time) return "Data e hora são obrigatórias";
    if (!form.idPatient) return "Selecione um paciente";
    if (!form.idCareProfessional) return "Selecione um profissional";
    if (!form.address.street || !form.address.number || !form.address.city)
      return "Preencha o endereço completo";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      if (sendEdit && editId) {
        const data: UpdateAppointment = {
          scheduledAt: parseISO(`${form.date}T${form.time}`),
          status: form.status,
          idAddress: form.address.id!,
        };
        await onEdit(editId, data);
      } else {
        await onCreate(form as formAppointmentType);
      }
      resetForm();
    } catch (err) {
      console.error("Error:", err);
      setError("Erro ao salvar agendamento");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
    } catch (err) {
      console.error("Error:", err);
      setError("Erro ao deletar agendamento");
    }
  };

  const editAppointment = (id: number) => {
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) {
      setError("Agendamento não encontrado");
      return;
    }

    setSendEdit(true);
    setToggleNewAppointments(true);
    setForm({
      date: format(new Date(appointment.scheduledAt), "dd/MM/yyyy"),
      time: format(new Date(appointment.scheduledAt), "HH:mm"),
      idPatient: appointment.patient.id,
      idCareProfessional: appointment.careProfessional.id,
      ...appointment,
    });
    setEditId(id);
  };

  const resetForm = () => {
    setForm(INITIAL_FORM_STATE);
    setSendEdit(false);
    setToggleNewAppointments(false);
    setEditId(null);
    setError("");
  };

  const appointmentButton = {
    text: "Agendar novo",
    classname:
      "w-full py-2 mt-2 text-sm font-medium text-white border border-gray-100 bg-black rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700",
    onclick: () => {
      setToggleNewAppointments(!toggleNewAppointments);
    },
    type: "button",
  } as ButtonProps;

  return (
    <BaseTemplate>
      <AppointmentHeader title="Meus agendamentos" backLink="/home" />
      <section className="my-4 w-full">
        <AppointmentList
          appointments={appointments}
          onEdit={editAppointment}
          onDelete={handleDelete}
        />

        <Button {...appointmentButton} />

        <AppointmentCreateSection isOpen={toggleNewAppointments}>
          <AppointmentForm
            form={form}
            patients={patients}
            professionals={professionals}
            isEditing={sendEdit}
            error={error}
            onChange={handleChange}
            onAddressChange={handleAddressChange}
            onSubmit={handleSubmit}
          />
        </AppointmentCreateSection>
      </section>
    </BaseTemplate>
  );
};

export default MySchedulesTemplate;
