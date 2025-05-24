"use client";

import { Appointment, UpdateAppointment, useAppointmentsApi } from "@/hooks/api/useAppointments";
import { useCareProfessionalsApi, Professional } from "@/hooks/api/useCareProfessionalsApi";
import { Patient, usePatientsApi } from "@/hooks/api/usePatientsApi";
import { useEffect, useState } from "react";
import AppointmentsTemplate from "../templates/appointmentsPage/appointments";

export default function AppointmentsContainer() {
  const appointimentsApi = useAppointmentsApi();
  const patientsApi = usePatientsApi();
  const professionalsApi = useCareProfessionalsApi();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {{
    const [appointRes, patientRes, profRes] = await Promise.all([
      appointimentsApi.getAll(),
      patientsApi.getAll(),
      professionalsApi.getAll()
    ])
      setAppointments(appointRes.data);
      setPatients(patientRes.data);
      setProfessionals(profRes.data);
    } 
  }

  const handleCreate = async (data: Appointment) => {
      await appointimentsApi.create(data)
      await fetchData();
    }

    const handleEdit = async (id: string, data: UpdateAppointment) => {
      await appointimentsApi.update(id, data)
      await fetchData();
    }

    const handleDelete = async (id: string) => {
      await appointimentsApi.remove(id)
      await fetchData();
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
  )
}
