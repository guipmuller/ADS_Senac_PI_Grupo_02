// components/organisms/AppointmentForm/AppointmentForm.tsx
import { AddressForm } from '@/components/molecules/AddressForm/AddressForm';
import { SubmitButton } from '@/components/atoms/SubmitButton/SubmitButton';
import { ErrorMessage } from '@/components/atoms/ErrorMessage/ErrorMessage';
import { formAppointmentType } from '@/components/templates/mySchedulesPage/types';
import { Patient } from '@/hooks/api/usePatientsApi';
import { Professional } from '@/hooks/api/useCareProfessionalsApi';
import { SelectInput } from '@/components/atoms/SelectInput/SelectInput';

interface Props {
  form: formAppointmentType;
  patients: Patient[];
  professionals: Professional[];
  isEditing: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AppointmentForm = ({
  form,
  patients,
  professionals,
  isEditing,
  error,
  onChange,
  onAddressChange,
  onSubmit
}: Props) => (
  <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
    <SelectInput 
      label="Selecione o Paciente"
      name="idPatient"
      options={patients.map(p => ({ 
        value: p.id!, 
        label: p.patientName 
      }))}
      value={form.idPatient}
      onChange={(value) => onChange({ 
        target: { name: 'idPatient', value: String(value) } 
      } as React.ChangeEvent<HTMLInputElement>)}
    />

    <SelectInput 
      label="Selecione o Profissional"
      name="idCareProfessional"
      options={professionals.map(p => ({ 
        value: p.id!, 
        label: p.user.name 
      }))}
      value={form.idCareProfessional}
      onChange={(value) => onChange({ 
        target: { name: 'idCareProfessional', value: String(value) } 
      } as React.ChangeEvent<HTMLInputElement>)}
    />

    <AddressForm
      form={form}
      onAddressChange={onAddressChange} 
      onChange={onAddressChange}    
    />

    {error && <ErrorMessage message={error} />}

    <SubmitButton isEditing={isEditing} />
  </form>
);