import BurgerMenu from '@/components/atoms/BurgerMenu/BurgerMenu';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa6';

interface Props {
  title: string;
  backLink: string;
}

export const AppointmentHeader = ({ title, backLink }: Props) => (
  <header className="py-4 flex items-center justify-between w-full ">
    <Link href={backLink}>
      <FaChevronLeft className="text-[#348a89] hover:text-gray-600 transition-colors" />
    </Link>
    <h2 className="text-2xl font-semibold mx-4">{title}</h2>
    <BurgerMenu />
  </header>
);