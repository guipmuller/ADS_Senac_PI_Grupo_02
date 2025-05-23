import React from 'react';
import Icon from '@/components/atoms/Icon/Icon';
import Text from '@/components/atoms/Text/Text';
import { ContactItemProps } from './types';

const ContactItem = ({ icon, contactType, contact }: ContactItemProps) => {
  return (
    <div className='flex items-center justify-between w-full max-w-sm space-y-2'>
      <div className="flex items-center gap-2">
        <Icon {...icon}/>
        <Text {...contactType}/>
      </div>
      <Text {...contact}/>
    </div>
  )
}

export default ContactItem