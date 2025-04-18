
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CropPriceManager from '@/components/CropPriceManager';

const ExporterDashboard = () => {
  const { currentUser } = useAuth();
  const firstName = currentUser?.name?.split(' ')[0] || 'Exporter';

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Hello, {firstName}!</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Your Buying Prices</h2>
          <p className="text-sm text-gray-600 mb-4">
            Set the prices at which you are willing to buy crops from farmers. 
            These prices will be visible to farmers in your area.
          </p>
          
          <CropPriceManager />
        </div>
      </div>
    </div>
  );
};

export default ExporterDashboard;
