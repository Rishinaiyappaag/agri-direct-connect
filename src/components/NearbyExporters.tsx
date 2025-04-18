
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, PhoneCall } from 'lucide-react';

// Mock data - would be replaced with real API data
const MOCK_EXPORTERS = [
  {
    id: '1',
    name: 'Global Exports Ltd',
    location: 'Kerala',
    crops: [
      { name: 'Coffee', price: 180 },
      { name: 'Pepper', price: 420 }
    ],
    distance: '5km'
  },
  {
    id: '2',
    name: 'Asian Trading Co',
    location: 'Karnataka',
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
        <Card key={exporter.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{exporter.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{exporter.location}</span>
                  <Badge variant="secondary">{exporter.distance}</Badge>
                </div>
              </div>
              <PhoneCall className="w-5 h-5 text-farm-primary cursor-pointer" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {exporter.crops.map((crop) => (
                <div key={crop.name} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>{crop.name}</span>
                  <span className="font-semibold">₹{crop.price}/kg</span>
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
