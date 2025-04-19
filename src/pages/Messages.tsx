import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/UserAvatar';
import MessageItem from '@/components/MessageItem';
import { Send } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';

const Messages = () => {
  const { contactId } = useParams();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const { messages, loading, sendMessage } = useMessages(currentUser, contactId);
  const navigate = useNavigate();
  
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

  const selectedContact = contactId 
    ? MOCK_CONTACTS.find(contact => contact.id === contactId) 
    : null;
  
  const handleSendMessage = async () => {
    if (!message.trim() || !contactId) return;
    
    await sendMessage(message.trim());
    setMessage('');
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
          
          <div className="col-span-8 flex flex-col h-full">
            {selectedContact ? (
              <>
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
                
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {loading ? (
                    <div className="text-center text-gray-500">Loading messages...</div>
                  ) : (
                    messages.map(msg => (
                      <MessageItem
                        key={msg.id}
                        message={msg.content}
                        sender={msg.sender_id === currentUser?.id 
                          ? currentUser?.name || 'You'
                          : selectedContact.name
                        }
                        timestamp={new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        isCurrentUser={msg.sender_id === currentUser?.id}
                        senderRole={msg.sender_id === currentUser?.id 
                          ? currentUser?.role 
                          : selectedContact.role
                        }
                      />
                    ))
                  )}
                </div>
                
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
                      disabled={!message.trim() || loading}
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
