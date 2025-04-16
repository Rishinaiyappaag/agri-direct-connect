
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Edit2, Save, User, MessageSquare } from 'lucide-react';

interface CropPrice {
  id: string;
  name: string;
  price: number;
}

const INITIAL_CROP_PRICES: CropPrice[] = [
  { id: 'coffee', name: 'Coffee', price: 180 },
  { id: 'paddy', name: 'Paddy', price: 50 },
  { id: 'pepper', name: 'Pepper', price: 420 },
  { id: 'cardamom', name: 'Cardamom', price: 1000 },
  { id: 'cinnamon', name: 'Cinnamon', price: 200 },
];

const ExporterDashboard = () => {
  const [cropPrices, setCropPrices] = useState<CropPrice[]>(INITIAL_CROP_PRICES);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Mock farmer inquiries data
  const [inquiries] = useState([
    { 
      id: '1', 
      farmerName: 'Rajesh Kumar', 
      crop: 'coffee', 
      quantity: '500kg', 
      message: 'I have 500kg of Arabica coffee beans ready for export. What price can you offer?',
      date: '2023-04-10' 
    },
    { 
      id: '2', 
      farmerName: 'Sunita Patel', 
      crop: 'cardamom', 
      quantity: '200kg', 
      message: 'Looking for a buyer for my cardamom harvest. Can you provide current market rates?',
      date: '2023-04-09' 
    },
    { 
      id: '3', 
      farmerName: 'Mohamed Ali', 
      crop: 'pepper', 
      quantity: '350kg', 
      message: 'I have black pepper ready for sale. Interested in your buying price.',
      date: '2023-04-07' 
    },
  ]);

  const handleEditPrice = (cropId: string, currentPrice: number) => {
    setEditingPrice(cropId);
    setTempPrice(currentPrice);
  };

  const handleSavePrice = (cropId: string) => {
    if (tempPrice <= 0) {
      toast({
        title: "Invalid price",
        description: "Price must be greater than zero",
        variant: "destructive",
      });
      return;
    }

    setCropPrices(prev => 
      prev.map(crop => 
        crop.id === cropId ? { ...crop, price: tempPrice } : crop
      )
    );
    
    setEditingPrice(null);
    
    toast({
      title: "Price updated",
      description: "Your buying price has been updated successfully",
    });
    
    // In a real implementation, this would save to Firebase
    console.log(`Updated price for ${cropId} to ${tempPrice}`);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Crop prices */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Your Buying Prices</h2>
            <p className="text-sm text-gray-600 mb-4">
              Set the prices at which you are willing to buy crops from farmers. 
              These prices will be visible to farmers in your area.
            </p>
            
            <div className="space-y-4 mt-6">
              {cropPrices.map(crop => (
                <div key={crop.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">{crop.name}</h3>
                  </div>
                  
                  <div className="flex items-center">
                    {editingPrice === crop.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(Number(e.target.value))}
                          className="w-24 text-right"
                        />
                        <span className="text-sm text-gray-600 mr-2">/kg</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleSavePrice(crop.id)}
                        >
                          <Save size={18} />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">₹{crop.price}</span>
                        <span className="text-sm text-gray-600 mr-2">/kg</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleEditPrice(crop.id, crop.price)}
                        >
                          <Edit2 size={18} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button>
                Publish Price Updates
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column: Recent inquiries */}
        <div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">
              Recent Inquiries
            </h2>
            
            <div className="space-y-4">
              {inquiries.map(inquiry => (
                <div 
                  key={inquiry.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-farm-primary transition-colors"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-600" />
                      <span className="font-medium">{inquiry.farmerName}</span>
                    </div>
                    <span className="text-xs text-gray-500">{inquiry.date}</span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex gap-2 text-sm text-gray-700">
                      <span className="font-medium capitalize">{inquiry.crop}</span>
                      <span>•</span>
                      <span>{inquiry.quantity}</span>
                    </div>
                    <p className="text-sm mt-2 text-gray-600">
                      {inquiry.message}
                    </p>
                  </div>
                  
                  <Button
                    className="w-full mt-3 bg-farm-primary hover:bg-farm-secondary"
                    size="sm"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Reply
                  </Button>
                </div>
              ))}
            </div>
            
            <Button
              variant="outline" 
              className="w-full mt-4"
            >
              View All Inquiries
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExporterDashboard;
