import React from 'react';
import { AvatarProps } from './types';
import Image from 'next/image';

const Avatar = ({
    src,
    alt,
    initials,
    className,
    size
}: AvatarProps) => {
  return (
    <div>   {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={className}
        />
      ) : (
        <span>{initials}</span>
      )}</div>
  )
}

export default Avatar