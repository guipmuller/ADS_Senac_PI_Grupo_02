import { TextProps } from "@/components/atoms/Text/types";
import { AboutCardProps } from "@/components/molecules/AboutCard/types";
import { ContactItemProps } from "@/components/molecules/contactItem/types";
import { HeaderProps } from "@/components/molecules/header/types";
import { ReviewCardProps } from "@/components/molecules/ReviewCard/types";
import { UserInfoProps } from "@/components/molecules/UserInfo/types";
import { FaChevronLeft } from "react-icons/fa";

const useData = () => {

  const caregiverHeader = {
    text: {
      text: 'Cuidador',
      classname: 'font-sans font-medium text-base',
    },
    children: <FaChevronLeft />,
  } as HeaderProps;

  const userInfo = {
    avatar: {
      //src: '/user1.png',
      alt: 'Avatar',
      size: 48,
      className:
        'w-10 h-10 rounded-full bg-gray-300',
    },
    name: {
      //text: 'Carla Pereira',
      classname: 'text-sm font-medium text-black',
    },
    subtext: {
      text: 'Cuidadora Especializada',
      classname: 'text-xs text-gray-500'
    }
  } as UserInfoProps;

  const customerAvaliation = {
    text: 'Avaliações dos Clientes',
    classname: 'text-sm font-semibold text-black mt-4 mb-2 w-full max-w-sm'
  } as TextProps

  const reviewCard = {
    avatar: {
      src: '/userReview.png',
      alt: 'avatar',
      className: 'w-6 h-6 rounded-full bg-gray-300',
      size: 24
    },
    name: {
      text: 'Lucas Pereira',
      classname: 'text-xs font-bold'
    },
    ratingStarts: {
      rating: 4,
      className: 'flex gap-0.5 text-yellow-500 text-sm',
      max: 5
    },
    review: {
      classname: '',
      text: 'Profissional muito atencioso e dedicado'
    }
  } as ReviewCardProps

  const contactInfo = {
    text: 'Informações de Contato',
    classname: 'text-sm font-semibold text-black mt-4 mb-2 w-full max-w-sm'
  } as TextProps

  const email = {
    icon: {
      src: '/email.png',
      alt: 'icon',
      size: 48,
      className: 'w-10 h-10 rounded-full bg-gray-300'
    },
    contactType: {
      text: 'E-mail',
      classname: 'text-xs font-bold'
    },
    contact: {
      text: 'carlapereira@example.com',
      classname: 'font-bold'
    }
  } as ContactItemProps

  const phonenumber = {
    icon: {
      src: '/phone.png',
      alt: 'icon',
      size: 48,
      className: 'w-10 h-10 rounded-full bg-gray-300'
    },
    contactType: {
      text: 'Telefone',
      classname: 'text-xs font-bold'
    },
    contact: {
      text: '+55 11 98765-4321',
      classname: 'font-bold'
    }
  } as ContactItemProps

  const about = {
    text: 'Sobre Carla',
    classname: 'text-m font-semibold text-black mt-4 mb-2 w-full max-w-sm'
  } as TextProps

  const aboutCard = {
    image: {
      alt: 'Foto do usuário',
      src: '/user1.png',
      width: 70,
      height: 70
    },
    title: {
      text: 'Descrição',
      classname: 'text-m font-semibold text-black w-full max-w-sm'
    },
    description: {
      text: 'Profissional dedicada, com vasta experiência em cuidados de saúde.',
      classname: '',
    },
  } as AboutCardProps

  return {
    caregiverHeader,
    userInfo,
    customerAvaliation,
    reviewCard,
    contactInfo,
    email,
    phonenumber,
    about,
    aboutCard
  };
};

export { useData };