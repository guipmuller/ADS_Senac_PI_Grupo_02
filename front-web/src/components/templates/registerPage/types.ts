export interface UserFormData {
  name: string;
  email: string;
  confirmarEmail: string;
  phoneNumber: string;
  cpf: string;
  role: 'Paciente' | 'Cuidador' | null;
  dadosEspecificos: {
    patientName?: string;
    patientCpf?: string;
    patientBirthDate?: string;
    coren?: string;
    biografia?: string;
  };
}

export const INITIAL_FORM_STATE: UserFormData = {
    name: '',
    email: '',
    confirmarEmail: '',
    phoneNumber: '',
    cpf: '',
    role: null,
    dadosEspecificos: {}
  };

  export interface RegisterTemplateProps {
  onCreate: (formData: UserFormData) => Promise<{ success: boolean; error: unknown } | undefined>;
}
