import React from 'react'
import BaseTemplate from '../BaseTemplate/BaseTemplate'
import Header from '@/components/molecules/header/Header'
import { useData } from './data'
import UserInfo from '@/components/molecules/UserInfo/UserInfo'
import Text from '@/components/atoms/Text/Text'
import ReviewCard from '@/components/molecules/ReviewCard/reviewCard'
import ContactItem from '@/components/molecules/contactItem/ContactItem'
import DivisionLine from '@/components/atoms/DivisionLine/DivisionLine'
import AboutCard from '@/components/molecules/AboutCard/AboutCard'

const CaregiversTemplate = () => {
    const {
        caregiverHeader,
        userInfo,
        customerAvaliation,
        reviewCard,
        contactInfo,
        email,
        phonenumber,
        about,
        aboutCard,
    } = useData();
  return (
    <BaseTemplate>
        <Header {...caregiverHeader}/>
        <UserInfo {...userInfo}/>
        <Text {...customerAvaliation}/>
        <ReviewCard {...reviewCard}/>
        <Text {...contactInfo}/>
        <ContactItem {...email}/>
        <DivisionLine/>
        <ContactItem {...phonenumber}/>
        <DivisionLine/>
        <Text {...about}/>
        <AboutCard {...aboutCard}/>
    </BaseTemplate>
  )
}

export default CaregiversTemplate