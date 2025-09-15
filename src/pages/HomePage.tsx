import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Users, IndianRupee, Train, AlertTriangle, Wifi, Heart, HelpCircle } from "lucide-react";
import { ActionBar } from "@/components/ActionBar";
import { InfoCard } from "@/components/InfoCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { CITIES, calculateFare, DEMO_USER } from "@/data/demoData";
import { useToast } from "@/hooks/use-toast";

export const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState("lucknow");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentCity = CITIES.find(c => c.id === selectedCity);
  const stations = currentCity ? currentCity.stations : [];
  
  const fare = fromStation && toStation ? calculateFare(fromStation, toStation, passengers, selectedCity) : 0;

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    setFromStation("");
    setToStation("");
  };

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleBookTicket = () => {
    if (!fromStation || !toStation) {
      toast({
        title: "Please select stations",
        description: "Both source and destination stations are required",
        variant: "destructive",
      });
      return;
    }

    if (fromStation === toStation) {
      toast({
        title: "Invalid selection",
        description: "Source and destination cannot be the same",
        variant: "destructive",
      });
      return;
    }

    // Create booking data and navigate to ticket screen
    const bookingData = {
      fromStation: stations.find(s => s.id === fromStation),
      toStation: stations.find(s => s.id === toStation),
      passengers,
      amount: fare,
      city: currentCity,
    };

    navigate("/ticket", { state: { bookingData } });
  };

  const handleInfoCardClick = (type: string) => {
    // Navigate to detail pages or show modals
    toast({
      title: "Information",
      description: `${type} details coming soon`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <ActionBar 
        title="UP Metro"
        subtitle="Book your metro ticket"
        showCitySelector={true}
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        cities={CITIES}
        customAction={
          <div className="bg-primary-foreground/20 rounded-full p-1.5">
            <Train className="w-4 h-4" />
          </div>
        }
      />

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Booking Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="w-5 h-5 text-primary" />
              Book Metro Ticket - {currentCity?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Station Selection with Swap Button */}
            <div className="flex items-center gap-4">
              {/* Station Dropdowns - Left Side */}
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From Station</Label>
                  <Select value={fromStation} onValueChange={setFromStation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source station" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station.id} value={station.id}>
                          {station.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To Station</Label>
                  <Select value={toStation} onValueChange={setToStation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination station" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station.id} value={station.id}>
                          {station.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Swap Button - Right Side */}
              <div className="flex flex-col items-center justify-center h-full pt-8">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleSwapStations}
                  className="rounded-full"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Passengers */}
            <div className="space-y-2">
              <Label htmlFor="passengers" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Number of Passengers
              </Label>
              <Input
                id="passengers"
                type="number"
                min="1"
                max="10"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              />
            </div>

            {/* Fare Display */}
            {fare > 0 && (
              <div className="bg-gradient-surface p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Total Fare</span>
                  <div className="flex items-center gap-1 text-primary font-bold text-lg">
                    <IndianRupee className="w-4 h-4" />
                    {fare}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Valid for 24 hours from booking
                </p>
              </div>
            )}

            {/* Book Button */}
            <Button
              onClick={handleBookTicket}
              className="w-full bg-gradient-primary border-0 shadow-metro"
              disabled={!fromStation || !toStation}
            >
              Book Ticket - ₹{fare}
            </Button>
          </CardContent>
        </Card>

        {/* Information Cards */}
        <div className="grid grid-cols-1 gap-4">
          <InfoCard
            title="Dos and Don'ts"
            description="Please Observe These Guidelines for an Enjoyable Journey."
            icon={<AlertTriangle className="w-5 h-5" />}
            onViewDetail={() => handleInfoCardClick("Dos and Don'ts")}
          />
          
          <InfoCard
            title="Station Facilities"
            description="Explore the amenities available to enhance your journey experience."
            icon={<Wifi className="w-5 h-5" />}
            onViewDetail={() => handleInfoCardClick("Station Facilities")}
          />
          
          <InfoCard
            title="For Differently Abled"
            description="Facilities tailored for the differently-abled community."
            icon={<Heart className="w-5 h-5" />}
            onViewDetail={() => handleInfoCardClick("For Differently Abled")}
          />
          
          <InfoCard
            title="FAQs"
            description="Find answers to commonly asked questions about UP Metro services."
            icon={<HelpCircle className="w-5 h-5" />}
            onViewDetail={() => handleInfoCardClick("FAQs")}
          />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};