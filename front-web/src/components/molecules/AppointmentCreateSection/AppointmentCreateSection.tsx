interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

export const AppointmentCreateSection = ({ isOpen, children }: Props) => (
  isOpen ? (
    <div className="my-4 w-full">
      <h3 className="text-xl font-semibold mb-4">Novo agendamento</h3>
      {children}
    </div>
  ) : null
);