import BaseTemplate from '../BaseTemplate/BaseTemplate'
import Header from '@/components/molecules/header/Header'
import { useData } from './data'
import UserInfo from '@/components/molecules/UserInfo/UserInfo'
import Text from '@/components/atoms/Text/Text'
import ReviewCard from '@/components/molecules/ReviewCard/reviewCard'
import ContactItem from '@/components/molecules/contactItem/ContactItem'
import DivisionLine from '@/components/atoms/DivisionLine/DivisionLine'
import AboutCard from '@/components/molecules/AboutCard/AboutCard'
import { Review } from '@/hooks/api/useReviewsApi'
import { Professional } from '@/hooks/api/useCareProfessionalsApi'
import { User } from '@/hooks/api/useUsersApi'

type Props = {
  user: User
  professional: Professional | null
  reviews: Review[] | null
}

const CaregiversTemplate: React.FC<Props> = ({ user, professional, reviews }) => {
  const {
    caregiverHeader,
    customerAvaliation,
    contactInfo,
    about
  } = useData();

  return (
    <BaseTemplate>
      <Header {...caregiverHeader} />
      <UserInfo 
        avatar={{ src: '/user1.png', 
          alt: user.name, size: 48, initials: undefined, 
          className: 'w-10 h-10 rounded-full bg-gray-300' }}
        name={{ classname: 'text-sm font-medium text-black', text: user?.name }}
        subtext={{ classname: 'text-xs text-gray-500', text: 'Cuidadora Especializada' }}
      />
      <Text {...customerAvaliation} />
      {reviews?.map(review => (
        <ReviewCard
          key={review.id}
          avatar={{ 
            src: '/user1.png', 
            alt: 'avatar', size: 24, initials: undefined, 
            className: 'w-6 h-6 rounded-full bg-gray-300' }}
          name={{ classname: '', text: review.patient.name }}
          ratingStarts={{ rating: review.rating, max: undefined, className: undefined }}
          review={{ classname: '', text: review.comment }}
        />
      ))}
      <Text {...contactInfo} />
      <ContactItem
        icon={{ src: '/email.png', alt: 'icon', size: 48, className: 'w-10 h-10 rounded-full bg-gray-300' }}
        contactType={{ classname: 'text-xs font-bold', text: 'E-mail' }}
        contact={{ classname: 'font-bold', text: user.email }}
      />
      <DivisionLine />
      <ContactItem
        icon={{ src: '/phone.png', alt: 'icon', size: 48, className: 'w-10 h-10 rounded-full bg-gray-300' }}
        contactType={{ classname: 'text-xs font-bold', text: 'Telefone' }}
        contact={{ classname: 'font-bold', text: user.phoneNumber }}
      />
      <DivisionLine />
      <Text {...about} />
      <AboutCard
        image={{ alt: '', src: '/user1.png', width: 70, height: 70 }}
        title={{ classname: 'text-m font-semibold text-black w-full max-w-sm', text: 'Descrição' }}
        description={{ classname: '', text: professional?.professionalBiography ?? '' }}
      />
    </BaseTemplate>
  )
}

export default CaregiversTemplate