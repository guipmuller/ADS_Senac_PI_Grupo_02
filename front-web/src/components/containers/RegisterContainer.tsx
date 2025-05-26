'use client';

import { useCareProfessionalsApi } from "@/hooks/api/useCareProfessionalsApi";
import { Patient, usePatientsApi } from "@/hooks/api/usePatientsApi";
import { User, useUsersApi } from "@/hooks/api/useUsersApi";
import RegisterTemplate from "../templates/registerPage/page";
import { UserFormData } from "../templates/registerPage/types";

export default function RegisterContainer() {
  const usersApi = useUsersApi();
  const patientsApi = usePatientsApi();
  const professionalsApi = useCareProfessionalsApi();

  const handleCreate = async (formData: UserFormData) => {
    try {
      const userData: User = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        cpf: formData.cpf,
        isPatient: formData.role === 'Paciente',
      }
      console.log("Cadastrando usuario:", JSON.stringify({userData}));
      const user = await usersApi.create(userData);
      console.log("Usuario cadastrado:", user);
      const idUser = user.data.id;
      if (formData.role === 'Paciente') {
        const parseBirthDate = (dateString: string) => {
          if (!dateString) return null;

          const [day, month, year] = dateString.split('/');
          return `${year}-${month}-${day}`; // Formato ISO (YYYY-MM-DD)
        };

        const patientData: Patient = {
          idUser: idUser,
          patientName: formData.dadosEspecificos.patientName || '',
          patientCpf: formData.dadosEspecificos.patientCpf || '',
          patientBirthDate: parseBirthDate(formData.dadosEspecificos.patientBirthDate || '')!,
        };
        console.log("Cadastrando paciente:", patientData);
        await patientsApi.create(patientData);
      }
      if (formData.role === 'Cuidador') {
        await professionalsApi.create({
          idUser,
          professionalRegistryCode: formData.dadosEspecificos.coren || '',
          professionalBiography: formData.dadosEspecificos.biografia || '',
        });
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return { success: false, error };
    }
  }
  return (
    <RegisterTemplate onCreate={handleCreate} />
  )
}