
import React, { useState } from 'react';
import CropCard from '@/components/CropCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Filter, RefreshCw } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for exporters and their prices
const MOCK_EXPORTERS = [
  {
    id: '1',
    name: 'Global Crop Traders',
    region: 'Kerala',
    crops: {
      coffee: 185,
      paddy: 52,
      pepper: 430,
      cardamom: 1050,
      cinnamon: 210
    },
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    name: 'Agro World Exports',
    region: 'Karnataka',
    crops: {
      coffee: 178,
      paddy: 50,
      pepper: 420,
      cardamom: 1000,
      cinnamon: 200
    },
    lastUpdated: '5 hours ago'
  },
  {
    id: '3',
    name: 'Harvest International',
    region: 'Tamil Nadu',
    crops: {
      coffee: 180,
      paddy: 51,
      pepper: 425,
      cardamom: 1020,
      cinnamon: 205
    },
    lastUpdated: '1 day ago'
  },
  {
    id: '4',
    name: 'Sunshine Agro Exports',
    region: 'Andhra Pradesh',
    crops: {
      coffee: 183,
      paddy: 53,
      pepper: 428,
      cardamom: 1030,
      cinnamon: 208
    },
    lastUpdated: '3 hours ago'
  }
];

// Available crop types
const CROP_TYPES = ['coffee', 'paddy', 'pepper', 'cardamom', 'cinnamon'];

const FarmerDashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const navigate = useNavigate();

  // Filter exporters based on selected crop
  const filteredExporters = selectedCrop 
    ? MOCK_EXPORTERS.filter(exporter => exporter.crops[selectedCrop as keyof typeof exporter.crops] > 0)
    : MOCK_EXPORTERS;

  // Handle contact exporter
  const handleContactExporter = (exporterId: string) => {
    navigate(`/messages/${exporterId}`);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Find Exporters
          </h2>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter size={16} />
                  {selectedCrop ? `Crop: ${selectedCrop}` : 'Filter by crop'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {CROP_TYPES.map(crop => (
                  <DropdownMenuCheckboxItem
                    key={crop}
                    checked={selectedCrop === crop}
                    onCheckedChange={() => 
                      setSelectedCrop(selectedCrop === crop ? null : crop)
                    }
                  >
                    {crop.charAt(0).toUpperCase() + crop.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <RefreshCw size={16} />
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">
            {selectedCrop 
              ? `Exporters buying ${selectedCrop}`
              : 'All exporters near you'
            }
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExporters.map(exporter => (
              <div key={exporter.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{exporter.name}</h4>
                  <p className="text-sm text-gray-600">{exporter.region}</p>
                </div>
                
                <div className="p-4 pt-0">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Current buying prices:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(exporter.crops)
                      .filter(([crop, _]) => !selectedCrop || crop === selectedCrop)
                      .map(([crop, price]) => (
                        <div key={crop} className="text-sm">
                          <span className="capitalize">{crop}:</span> 
                          <span className="font-medium text-farm-primary ml-1">₹{price}/kg</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
                
                <div className="px-4 pb-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Updated {exporter.lastUpdated}
                  </span>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-farm-primary hover:bg-farm-secondary"
                    onClick={() => handleContactExporter(exporter.id)}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
