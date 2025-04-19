import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from '@/components/UserAvatar';
import { Phone, Mail } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';

const CROP_OPTIONS = [
  { id: 'coffee', label: 'Coffee' },
  { id: 'paddy', label: 'Paddy (Rice)' },
  { id: 'pepper', label: 'Pepper' },
  { id: 'cardamom', label: 'Cardamom' },
  { id: 'cinnamon', label: 'Cinnamon' },
];

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
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
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
        phone,
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
        <h1 className="text-2xl font-bold text-farm-primary mb-6">Your Profile</h1>
        
        <Card className="border-farm-accent shadow-sm">
          <CardHeader className="flex flex-row items-center gap-4 border-b border-farm-accent/20">
            <UserAvatar 
              name={currentUser?.name || 'User'} 
              role={currentUser?.role}
              size="lg"
            />
            <div>
              <CardTitle className="text-farm-primary">{currentUser?.name || 'User'}</CardTitle>
              <CardDescription className="capitalize text-farm-secondary">
                {currentUser?.role || 'User'}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="border-farm-accent/50 focus-visible:ring-farm-primary"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-farm-primary/50" />
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="pl-10 border-farm-accent/50 focus-visible:ring-farm-primary"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-farm-primary/50" />
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="pl-10 bg-farm-accent/10"
                  />
                </div>
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
                  <SelectTrigger className="border-farm-accent/50">
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
              className="bg-farm-primary hover:bg-farm-secondary text-white"
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
