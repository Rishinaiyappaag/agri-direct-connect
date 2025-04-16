
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/UserAvatar';
import MessageItem from '@/components/MessageItem';
import { Send } from 'lucide-react';

// Mock contacts data
const MOCK_CONTACTS = [
  {
    id: '1',
    name: 'Global Crop Traders',
    role: 'exporter' as const,
    lastMessage: 'Can you provide samples of your coffee beans?',
    timestamp: '2h ago',
    unread: 2,
  },
  {
    id: '2',
    name: 'Agro World Exports',
    role: 'exporter' as const,
    lastMessage: 'We are interested in buying your paddy harvest',
    timestamp: '1d ago',
    unread: 0,
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    role: 'farmer' as const,
    lastMessage: 'What is your current buying price for pepper?',
    timestamp: '3d ago',
    unread: 0,
  }
];

// Mock messages for a conversation
const MOCK_MESSAGES = [
  {
    id: '1',
    senderId: '1',
    receiverId: 'currentUser',
    message: 'Hello! I saw you have coffee beans for sale. What variety are they?',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    senderId: 'currentUser',
    receiverId: '1',
    message: 'Hi! Yes, I have Arabica coffee beans. They are of premium quality.',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    senderId: '1',
    receiverId: 'currentUser',
    message: 'Great! What quantity can you provide?',
    timestamp: '10:35 AM',
  },
  {
    id: '4',
    senderId: 'currentUser',
    receiverId: '1',
    message: 'I currently have 500kg available for immediate sale.',
    timestamp: '10:36 AM',
  },
  {
    id: '5',
    senderId: '1',
    receiverId: 'currentUser',
    message: 'Perfect! Our current buying price is ₹185 per kg. Would you be able to deliver to our warehouse in Kerala?',
    timestamp: '10:40 AM',
  }
];

const Messages = () => {
  const { contactId } = useParams();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const navigate = useNavigate();
  
  // Find selected contact
  const selectedContact = contactId 
    ? MOCK_CONTACTS.find(contact => contact.id === contactId) 
    : null;
  
  const handleSendMessage = () => {
    if (!message.trim() || !contactId) return;
    
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'currentUser',
      receiverId: contactId,
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // In a real implementation, this would save to Firebase
    console.log('Sending message:', newMessage);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-160px)]">
        <div className="grid grid-cols-12 h-full">
          {/* Contact list (left sidebar) */}
          <div className="col-span-4 border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Messages</h2>
            </div>
            
            <div>
              {MOCK_CONTACTS.map(contact => (
                <div 
                  key={contact.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors
                    ${contactId === contact.id ? 'bg-gray-50' : ''}`}
                  onClick={() => navigate(`/messages/${contact.id}`)}
                >
                  <div className="flex items-start gap-3">
                    <UserAvatar 
                      name={contact.name} 
                      role={contact.role} 
                      size="md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.timestamp}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {contact.lastMessage}
                      </p>
                    </div>
                    
                    {contact.unread > 0 && (
                      <div className="bg-farm-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat window (right side) */}
          <div className="col-span-8 flex flex-col h-full">
            {selectedContact ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                  <UserAvatar 
                    name={selectedContact.name} 
                    role={selectedContact.role} 
                    size="sm"
                  />
                  <div>
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    <p className="text-xs text-gray-500 capitalize">
                      {selectedContact.role}
                    </p>
                  </div>
                </div>
                
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {messages.map(msg => (
                    <MessageItem
                      key={msg.id}
                      message={msg.message}
                      sender={msg.senderId === 'currentUser' 
                        ? currentUser?.name || 'You'
                        : selectedContact.name
                      }
                      timestamp={msg.timestamp}
                      isCurrentUser={msg.senderId === 'currentUser'}
                      senderRole={msg.senderId === 'currentUser' 
                        ? currentUser?.role 
                        : selectedContact.role
                      }
                    />
                  ))}
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="bg-farm-primary hover:bg-farm-secondary"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-gray-50">
                <div className="mb-4">
                  <MessageItem 
                    message="Select a conversation to start messaging"
                    sender="System"
                    timestamp=""
                    isCurrentUser={false}
                  />
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  You can contact farmers or exporters from their profiles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
