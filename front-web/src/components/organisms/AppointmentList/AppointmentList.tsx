import { AppointmentCard } from '@/components/molecules/AppointmentCard/AppointmentCard';
import { EmptyState } from '@/components/atoms/EmptyState/EmptyState';
import { Appointment } from '@/hooks/api/useAppointments';

interface Props {
  appointments: Appointment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const AppointmentList = ({ appointments, onEdit, onDelete }: Props) => (
  <>
    <h3 className="text-xl font-semibold mb-4">Próximos agendamentos</h3>
    
    {appointments.length > 0 ? (
      <div className="space-y-4">
        {appointments.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    ) : (
      <EmptyState message="Nenhum agendamento encontrado" />
    )}
  </>
);