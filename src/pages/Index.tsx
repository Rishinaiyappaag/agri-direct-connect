
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, List, MessageCircle, User, Tractor, Briefcase } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleSignUp = (role: 'farmer' | 'exporter') => {
    navigate('/signup', { state: { defaultRole: role } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-farm-light">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-farm-primary">
          Agricultural Trade Platform
        </h1>
        
        <p className="text-lg text-farm-secondary">
          Connect farmers with exporters for high-demand commodities such as coffee, paddy, pepper, cardamom, and cinnamon.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button 
            onClick={() => handleSignUp('farmer')}
            className="bg-farm-primary hover:bg-farm-secondary text-white px-8 py-6 text-lg shadow-md transition-colors flex justify-center items-center gap-3"
          >
            <Tractor className="w-6 h-6" />
            Register as Farmer
          </Button>

          <Button 
            onClick={() => handleSignUp('exporter')}
            className="bg-farm-primary hover:bg-farm-secondary text-white px-8 py-6 text-lg shadow-md transition-colors flex justify-center items-center gap-3"
          >
            <Briefcase className="w-6 h-6" />
            Register as Exporter
          </Button>

          <p className="text-farm-secondary text-sm mt-2">
            Already have an account?{' '}
            <Button 
              variant="link" 
              onClick={() => navigate('/login')} 
              className="text-farm-primary p-0 h-auto font-semibold"
            >
              Sign In
            </Button>
          </p>
        </div>
      </div>

      <nav className="w-full flex justify-around items-center py-4 border-t bg-white">
        <Button variant="ghost" size="icon" className="text-farm-primary hover:bg-farm-accent/20">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-farm-primary hover:bg-farm-accent/20">
          <List className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-farm-primary hover:bg-farm-accent/20">
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-farm-primary hover:bg-farm-accent/20">
          <User className="h-6 w-6" />
        </Button>
      </nav>
    </div>
  );
};

export default Index;
