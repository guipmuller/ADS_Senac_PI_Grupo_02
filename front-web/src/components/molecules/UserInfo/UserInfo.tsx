import React from 'react';
import Avatar from '@/components/atoms/Avatar/avatar';
import Text from '@/components/atoms/Text/Text';
import { UserInfoProps } from './types';

const UserInfo = ({avatar, name, subtext} : UserInfoProps) => {
  return (
    <div className="flex items-center gap-3 w-full max-w-sm space-y-2">
        <Avatar {...avatar}/>
        <div className="flex flex-col">
          <Text {...name}/>
          <Text {...subtext}/>
        </div>
    </div>
  )
}

export default UserInfo