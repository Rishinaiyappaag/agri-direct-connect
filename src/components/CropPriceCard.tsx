
import { Leaf, Coffee, Wheat, CircleDot } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CropPriceProps {
  cropName: string;
  price: number;
}

const CropIcon = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case 'coffee':
      return <Coffee className="h-6 w-6 text-farm-primary" />;
    case 'paddy':
      return <Wheat className="h-6 w-6 text-farm-accent" />;
    case 'pepper':
      return <CircleDot className="h-6 w-6 text-farm-primary" />;
    case 'cardamom':
    default:
      return <Leaf className="h-6 w-6 text-farm-primary" />;
  }
};

const CropPriceCard = ({ cropName, price }: CropPriceProps) => {
  return (
    <Card className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <CropIcon name={cropName} />
        <span className="capitalize font-medium">{cropName}</span>
      </div>
      <span className="text-right">₹ {price}/kg</span>
    </Card>
  );
};

export default CropPriceCard;
