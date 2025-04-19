
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export const useMessages = (currentUser: User | null, selectedContactId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !selectedContactId) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${currentUser.id},sender_id.eq.${selectedContactId}`)
          .or(`receiver_id.eq.${currentUser.id},receiver_id.eq.${selectedContactId}`)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id.eq.${currentUser.id}`
        },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
        }
      )
      .subscribe();

    fetchMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser?.id, selectedContactId]);

  const sendMessage = async (content: string) => {
    if (!currentUser || !selectedContactId) return;

    try {
      const { error } = await supabase.from('messages').insert({
        sender_id: currentUser.id,
        receiver_id: selectedContactId,
        content,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return { messages, loading, sendMessage };
};
