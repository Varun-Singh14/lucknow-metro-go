import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Users, IndianRupee, Train } from "lucide-react";
import { ActionBar } from "@/components/ActionBar";
import { BottomNavigation } from "@/components/BottomNavigation";
import { STATIONS, calculateFare, DEMO_USER } from "@/data/demoData";
import { useToast } from "@/hooks/use-toast";

export const HomePage = () => {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fare = fromStation && toStation ? calculateFare(fromStation, toStation, passengers) : 0;

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
      fromStation: STATIONS.find(s => s.id === fromStation),
      toStation: STATIONS.find(s => s.id === toStation),
      passengers,
      amount: fare,
    };

    navigate("/ticket", { state: { bookingData } });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <ActionBar 
        title={`Welcome, ${DEMO_USER.name}`}
        subtitle="Book your metro ticket"
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
              Book Metro Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Station Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from">From Station</Label>
                <Select value={fromStation} onValueChange={setFromStation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source station" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATIONS.map((station) => (
                      <SelectItem key={station.id} value={station.id}>
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
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

              <div className="space-y-2">
                <Label htmlFor="to">To Station</Label>
                <Select value={toStation} onValueChange={setToStation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination station" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATIONS.map((station) => (
                      <SelectItem key={station.id} value={station.id}>
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
      </div>

      <BottomNavigation />
    </div>
  );
};