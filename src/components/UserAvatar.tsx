
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  imageSrc?: string;
  role?: 'farmer' | 'exporter';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar = ({
  name,
  imageSrc,
  role,
  size = 'md',
  className,
}: UserAvatarProps) => {
  // Get initials from name
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Determine size class
  const sizeClass = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-lg',
  }[size];

  // Determine background color based on role
  const bgColorClass = role === 'farmer' 
    ? 'bg-farm-primary text-white' 
    : role === 'exporter' 
      ? 'bg-farm-accent text-white' 
      : 'bg-gray-200 text-gray-700';

  return (
    <Avatar className={cn(sizeClass, className)}>
      <AvatarImage src={imageSrc} alt={name} />
      <AvatarFallback className={bgColorClass}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
