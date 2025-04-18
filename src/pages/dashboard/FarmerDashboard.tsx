
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NearbyExporters from '@/components/NearbyExporters';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const firstName = currentUser?.name?.split(' ')[0] || 'Farmer';

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Hello, {firstName}!</h1>
        
        <Button 
          onClick={() => navigate('/list-crop')}
          className="w-full bg-farm-primary hover:bg-farm-secondary text-white py-6 text-lg"
        >
          List My Crop
        </Button>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Nearby Exporters</h2>
          <NearbyExporters />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Inquiries</h2>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <UserCircle className="h-10 w-10 text-gray-400" />
              <div>
                <h3 className="font-medium">Global Exports</h3>
                <p className="text-sm text-gray-500">Paddy</p>
              </div>
              <span className="ml-auto text-sm text-gray-500">Apr 24</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
