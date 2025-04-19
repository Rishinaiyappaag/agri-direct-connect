
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, PhoneCall, Mail, User } from 'lucide-react';
import UserAvatar from './UserAvatar';

// Mock data - would be replaced with real API data
const MOCK_EXPORTERS = [
  {
    id: '1',
    name: 'Global Exports Ltd',
    email: 'global@exports.com',
    phone: '+91 98765 43210',
    location: 'Kerala',
    imageUrl: null,
    crops: [
      { name: 'Coffee', price: 180 },
      { name: 'Pepper', price: 420 }
    ],
    distance: '5km'
  },
  {
    id: '2',
    name: 'Asian Trading Co',
    email: 'contact@asiantrading.com',
    phone: '+91 98765 12345',
    location: 'Karnataka',
    imageUrl: null,
    crops: [
      { name: 'Coffee', price: 175 },
      { name: 'Cardamom', price: 1200 }
    ],
    distance: '8km'
  }
];

const NearbyExporters = () => {
  return (
    <div className="grid gap-4">
      {MOCK_EXPORTERS.map((exporter) => (
        <Card key={exporter.id} className="hover:shadow-md transition-shadow border-farm-accent">
          <CardHeader className="pb-4">
            <div className="flex gap-4">
              <UserAvatar
                name={exporter.name}
                imageSrc={exporter.imageUrl}
                role="exporter"
                size="lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-farm-primary">{exporter.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exporter.location}</span>
                      <Badge variant="secondary" className="bg-farm-accent text-farm-primary">
                        {exporter.distance}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-2">
                  <a href={`tel:${exporter.phone}`} className="flex items-center gap-1 text-sm text-farm-primary hover:text-farm-secondary">
                    <PhoneCall className="w-4 h-4" />
                    {exporter.phone}
                  </a>
                  <a href={`mailto:${exporter.email}`} className="flex items-center gap-1 text-sm text-farm-primary hover:text-farm-secondary">
                    <Mail className="w-4 h-4" />
                    {exporter.email}
                  </a>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {exporter.crops.map((crop) => (
                <div 
                  key={crop.name} 
                  className="flex justify-between items-center p-2 bg-farm-accent/20 rounded border border-farm-accent"
                >
                  <span className="text-farm-primary">{crop.name}</span>
                  <span className="font-semibold text-farm-primary">₹{crop.price}/kg</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NearbyExporters;
