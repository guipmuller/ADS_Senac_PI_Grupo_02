"use client";

import { Appointment, CreateAppointment, UpdateAppointment, useAppointmentsApi } from "@/hooks/api/useAppointments";
import { useCareProfessionalsApi, Professional } from "@/hooks/api/useCareProfessionalsApi";
import { Patient, usePatientsApi } from "@/hooks/api/usePatientsApi";
import { useEffect, useState } from "react";
import AppointmentsTemplate from "../templates/mySchedulesPage/mySchedules";
import { useAddressesApi } from "@/hooks/api/useAdressesApi";
import { formAppointmentType } from "../templates/mySchedulesPage/types";
import { parseISO } from 'date-fns';

export default function MySchedulesContainer() {
  const appointmentsApi = useAppointmentsApi();
  const patientsApi = usePatientsApi();
  const professionalsApi = useCareProfessionalsApi();
  const addressApi = useAddressesApi();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [appointRes, patientRes, profRes] = await Promise.all([
        appointmentsApi.getAll(),
        patientsApi.getAll(),
        professionalsApi.getAll()
      ]);
      setAppointments(appointRes.data);
      setPatients(patientRes.data);
      setProfessionals(profRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (form: formAppointmentType) => {
    const address = await addressApi.create(form.address);
    const idAddress = address.data.id;
    const scheduledAt = parseISO(`${form.date}T${form.time}`);
    const newAppointment: CreateAppointment = {
      scheduledAt,
      idAddress,
      idPatient: form.idPatient,
      idCareProfessional: form.idCareProfessional
    };
    await appointmentsApi.create(newAppointment);
    await fetchData();
  };

  const handleEdit = async (id: number, data: UpdateAppointment) => {
    await appointmentsApi.update(id, data);
    await fetchData();
  };

  const handleDelete = async (id: number) => {
    await appointmentsApi.remove(id);
    await fetchData();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-grey-500"></div>
      </div>
    );
  }

  return (
    <AppointmentsTemplate
      appointments={appointments}
      patients={patients}
      professionals={professionals}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}