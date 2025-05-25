import { FiRefreshCcw } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface AppointmentActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  phoneNumber?: string;
}

export const AppointmentActions = ({
  onEdit,
  onDelete,
  phoneNumber = ""
}: AppointmentActionsProps) => {
  const formattedPhone = phoneNumber 
    ? `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2, 6)}-${phoneNumber.substring(6, 11)}`
    : "";

  return (
    <div className="flex justify-between items-center">
      {phoneNumber && (
        <span className="font-bold w-28 flex flex-col">
          <span className="flex justify-end">{formattedPhone.split(' ')[0]}</span>
          <span className="flex justify-end text-nowrap">
            {formattedPhone.split(' ').slice(1).join(' ')}
          </span>
        </span>
      )}
      
      <FiRefreshCcw
        className="text-xl mx-2 cursor-pointer hover:text-blue-500 transition-colors"
        onClick={onEdit}
        aria-label="Editar agendamento"
      />
      <IoClose
        className="text-xl text-red-700 cursor-pointer hover:text-red-900 transition-colors"
        onClick={onDelete}
        aria-label="Excluir agendamento"
      />
    </div>
  );
};