import React from 'react';
import { FaStar } from 'react-icons/fa';
import { RatingStarsProps } from './types';

const RatingStars = ({max, className, rating}: RatingStarsProps) => {
  return (
     <div className={`flex gap-0.5 text-yellow-500 ${className}`}>
      {[...Array(max)].map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? 'fill-yellow-500' : 'fill-gray-300'}
        />
      ))}
    </div>
  )
}

export default RatingStars