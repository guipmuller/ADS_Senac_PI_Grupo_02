import React from 'react';
import Image from 'next/image';
import { IconProps } from './types';

const Icon = ({
    src,
    alt,
    className,
    size
}: IconProps) => {
  return (
        <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className={className}
        />
  )
}

export default Icon