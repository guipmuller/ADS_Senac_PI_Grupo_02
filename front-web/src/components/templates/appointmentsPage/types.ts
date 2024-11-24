export type appointmentType = {
  idAppointment?: number;
  date: string;
  time: string;
  location: string;
  idPatient: number;
  idCareProfessional: number;
  createdAt?: string;
  updatedAt?: string;
};

export type patientType = {
  idPatient: number;
  patientName: string;
  patientCPF: string;
  patientBirthDate: string;
  createdAt: string;
  updatedAt: string;
  idUser: number;
};

export type careProfessionalType = {
  idCareProfessional: number;
  professionalRegistryCode: string;
  professionalBiography: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  idUser: number;
};
