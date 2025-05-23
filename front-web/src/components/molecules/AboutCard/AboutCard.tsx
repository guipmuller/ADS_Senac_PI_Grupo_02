/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { AboutCardProps } from './types';
import Image from 'next/image';
import Text from '@/components/atoms/Text/Text';

const AboutCard = ({image, title, description }: AboutCardProps) => {
  return (
    <div className="flex items-center gap-3 w-full max-w-sm space-y-2">
        <Image {...image}/>
        <div>
          <Text {...title}/>
          <Text {...description}/>
        </div>
    </div>
  )
}

export default AboutCard