
import React from 'react';
import { cn } from '@/lib/utils';
import UserAvatar from './UserAvatar';

interface MessageItemProps {
  message: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
  senderRole?: 'farmer' | 'exporter';
}

const MessageItem = ({
  message,
  sender,
  timestamp,
  isCurrentUser,
  senderRole,
}: MessageItemProps) => {
  return (
    <div className={cn(
      "flex gap-2 mb-3",
      isCurrentUser ? "flex-row-reverse" : "flex-row"
    )}>
      <UserAvatar 
        name={sender} 
        size="sm" 
        role={senderRole}
        className="mt-1" 
      />
      
      <div className={cn(
        "max-w-[75%] rounded-lg px-3 py-2",
        isCurrentUser
          ? "bg-farm-primary text-white rounded-tr-none"
          : "bg-gray-100 text-gray-800 rounded-tl-none"
      )}>
        <p className="text-sm">{message}</p>
        <p className={cn(
          "text-xs mt-1",
          isCurrentUser ? "text-white/70" : "text-gray-500"
        )}>
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
