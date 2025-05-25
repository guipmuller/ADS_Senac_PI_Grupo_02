import React from 'react';
import { ReviewCardProps } from './types';
import Avatar from '@/components/atoms/Avatar/avatar';
import RatingStars from '@/components/atoms/ratingStars/ratingStars';
import Text from '@/components/atoms/Text/Text';

const ReviewCard = ({ avatar, name, ratingStarts, review }: ReviewCardProps) => {
  return (
    <div className='bg-gray-100 p-4 rounded-lg w-full max-w-sm space-y-2'>
        <div className='flex items-center justify-between'>
            <div className="flex items-center gap-2">
                <Avatar {...avatar}/>
                <Text {...name}/>
            </div>
            <RatingStars {...ratingStarts}/>
        </div>
            <Text {...review}/>
    </div>
  )
}

export default ReviewCard