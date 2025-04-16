
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import FarmerDashboard from './FarmerDashboard';
import ExporterDashboard from './ExporterDashboard';

const Dashboard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  // Render different dashboard based on user role
  return currentUser.role === 'farmer' ? (
    <FarmerDashboard />
  ) : (
    <ExporterDashboard />
  );
};

export default Dashboard;
