
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Edit2, Save, X } from 'lucide-react';

interface CropPrice {
  id: string;
  name: string;
  price: number;
}

const CropPriceManager = () => {
  const { toast } = useToast();
  const [newCrop, setNewCrop] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [crops, setCrops] = useState<CropPrice[]>([
    { id: '1', name: 'Coffee', price: 180 },
    { id: '2', name: 'Pepper', price: 420 },
  ]);

  const handleAddCrop = () => {
    if (!newCrop || !newPrice) {
      toast({
        title: "Error",
        description: "Please fill in both crop name and price",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(newPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    setCrops([...crops, {
      id: Date.now().toString(),
      name: newCrop,
      price: price
    }]);

    setNewCrop('');
    setNewPrice('');

    toast({
      title: "Success",
      description: "New crop price added successfully",
    });
  };

  const handleUpdatePrice = (id: string, newPrice: string) => {
    const price = parseFloat(newPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    setCrops(crops.map(crop => 
      crop.id === id ? { ...crop, price } : crop
    ));
    setEditingId(null);

    toast({
      title: "Success",
      description: "Price updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="Crop name"
          value={newCrop}
          onChange={(e) => setNewCrop(e.target.value)}
        />
        <Input
          placeholder="Price per kg"
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <Button onClick={handleAddCrop}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Crop
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Crop</TableHead>
            <TableHead>Price (₹/kg)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crops.map((crop) => (
            <TableRow key={crop.id}>
              <TableCell>{crop.name}</TableCell>
              <TableCell>
                {editingId === crop.id ? (
                  <Input
                    type="number"
                    defaultValue={crop.price}
                    onChange={(e) => handleUpdatePrice(crop.id, e.target.value)}
                    className="w-24"
                  />
                ) : (
                  `₹${crop.price}`
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingId === crop.id ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingId(crop.id)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CropPriceManager;
