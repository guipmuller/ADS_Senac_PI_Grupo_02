import { DateDisplay } from "@/components/atoms/DateDisplay/DateDisplay";
import { Appointment } from "@/hooks/api/useAppointments";
import { CiCalendarDate } from "react-icons/ci";
import { AppointmentActions } from "../AppointmentActions/AppointmentActions";

export const AppointmentCard = ({
  appointment,
  onEdit,
  onDelete
}: {
  appointment: Appointment;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => (
  <div key={appointment.id} className="my-3">
    <div>
      <DateDisplay date={new Date(appointment.scheduledAt)} />
    </div>
    <div className="flex justify-between">
      <div className="flex">
        <CiCalendarDate className="text-5xl" />
        <div className="flex flex-col">
          <span>
            Cuidador: {appointment.careProfessional.name}
          </span>
          <span className="text-gray-500">Local: {appointment.address.street}</span>
        </div>
      </div>

      <AppointmentActions
        onEdit={() => onEdit(appointment.id!)}
        onDelete={() => onDelete(appointment.id!)}
        phoneNumber={appointment.careProfessional.phoneNumber}
      />
    </div>
    <hr />
  </div>
);