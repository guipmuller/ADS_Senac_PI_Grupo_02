import { format } from "date-fns";

export const DateDisplay = ({ date }: { date: Date }) => (
  <span className="text-gray-500">
    {format(date, 'dd/MM/yyyy')} - {format(date, 'HH:mm')}
  </span>
);