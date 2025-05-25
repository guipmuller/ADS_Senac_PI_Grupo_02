export type formAppointmentType = {
  idAppointment?: number;
  date: string;   // "2025-05-24"
  time: string;   // "14:30"
  status: string;
  address: formAddressType;
  idPatient: number;
  idCareProfessional: number
};

export type formAddressType = {
  id?: number | null;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

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

export type userType = {
  idUser: number,
  name: string,
  email: string,
  phoneNumber: number,
  cpf: number,
  password: string,
  createdAt: string,
  updatedAt: string
}