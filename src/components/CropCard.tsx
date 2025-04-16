
import React from 'react';
import { cn } from '@/lib/utils';

interface CropCardProps {
  cropName: string;
  price: number;
  unit?: string;
  updatedAt?: string;
  exporterName?: string;
  region?: string;
  className?: string;
  onClick?: () => void;
}

const CropCard = ({
  cropName,
  price,
  unit = 'per kg',
  updatedAt,
  exporterName,
  region,
  className,
  onClick,
}: CropCardProps) => {
  return (
    <div 
      className={cn("crop-card p-4 bg-white animate-fade-in", className)}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold capitalize">{cropName}</h3>
          {exporterName && <p className="text-sm text-gray-600">{exporterName}</p>}
          {region && <p className="text-xs text-gray-500">{region}</p>}
        </div>
        <div className="price-tag">
          ₹{price} {unit}
        </div>
      </div>
      
      {updatedAt && (
        <div className="mt-3 text-xs text-gray-400">
          Updated: {updatedAt}
        </div>
      )}
    </div>
  );
};

export default CropCard;
