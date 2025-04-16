
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from '@/components/UserAvatar';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Checkbox
} from '@/components/ui/checkbox';

// Crop options for multi-select
const CROP_OPTIONS = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'paddy', label: 'Paddy (Rice)' },
  { id: 'pepper', label: 'Pepper' },
  { id: 'cardamom', label: 'Cardamom' },
  { id: 'cinnamon', label: 'Cinnamon' },
];

// Region options
const REGION_OPTIONS = [
  { value: 'kerala', label: 'Kerala' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'tamilnadu', label: 'Tamil Nadu' },
  { value: 'andhra', label: 'Andhra Pradesh' },
];

const Profile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [region, setRegion] = useState(currentUser?.region || '');
  const [selectedCrops, setSelectedCrops] = useState<string[]>(
    currentUser?.cropsInterested || []
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = async () => {
    if (!name) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await updateUserProfile({
        name,
        region,
        cropsInterested: selectedCrops,
      });
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      let message = "Failed to update profile";
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCropToggle = (cropId: string) => {
    setSelectedCrops(prev => 
      prev.includes(cropId)
        ? prev.filter(id => id !== cropId)
        : [...prev, cropId]
    );
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <UserAvatar 
              name={currentUser?.name || 'User'} 
              role={currentUser?.role}
              size="lg"
            />
            <div>
              <CardTitle>{currentUser?.name || 'User'}</CardTitle>
              <CardDescription className="capitalize">
                {currentUser?.role || 'User'}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={currentUser?.email || ''}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed
                </p>
              </div>
              
              <div>
                <Label htmlFor="region">Region</Label>
                <Select 
                  value={region} 
                  onValueChange={setRegion}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGION_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-2 block">
                  {currentUser?.role === 'farmer' 
                    ? 'Crops you grow' 
                    : 'Crops you buy'
                  }
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {CROP_OPTIONS.map(crop => (
                    <div key={crop.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`crop-${crop.id}`}
                        checked={selectedCrops.includes(crop.id)}
                        onCheckedChange={() => handleCropToggle(crop.id)}
                      />
                      <Label htmlFor={`crop-${crop.id}`}>{crop.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="bg-farm-primary hover:bg-farm-secondary"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
