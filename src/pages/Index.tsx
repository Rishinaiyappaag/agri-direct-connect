
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, List, MessageCircle, User } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Agricultural Trade Platform
        </h1>
        
        <p className="text-lg text-gray-600">
          Connect farmers with exporters for high-demand commodities such as coffee, paddy, pepper, cardamom, and cinnamon.
        </p>

        <Button 
          onClick={() => navigate('/login')}
          className="bg-farm-primary hover:bg-farm-secondary text-white px-8 py-6 text-lg"
        >
          Get Started
        </Button>

        <img 
          src="/lovable-uploads/ae08b892-6455-4544-8146-260b06b4f9a4.png" 
          alt="Farmer and exporter handshake" 
          className="w-full max-w-sm mt-8"
        />
      </div>

      <nav className="w-full flex justify-around items-center py-4 border-t bg-white">
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600">
          <List className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600">
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-600">
          <User className="h-6 w-6" />
        </Button>
      </nav>
    </div>
  );
};

export default Index;
