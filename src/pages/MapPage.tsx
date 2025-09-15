import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Train, Clock, MapPin } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { STATIONS } from "@/data/demoData";

export const MapPage = () => {
  const [currentTrainPosition] = useState(10); // Demo: train at 10th station

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-primary p-6 text-primary-foreground">
          <h1 className="text-xl font-semibold mb-2">Metro Line Map</h1>
          <p className="text-primary-foreground/80 text-sm">
            Track your metro in real-time
          </p>
        </div>

        {/* Current Train Status */}
        <div className="p-4 -mt-4">
          <Card className="shadow-card mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Train className="w-5 h-5 text-primary animate-pulse" />
                Live Train Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Currently at:</p>
                  <p className="text-primary font-semibold">
                    {STATIONS[currentTrainPosition].name}
                  </p>
                </div>
                <Badge className="bg-success text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  On Time
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Metro Line */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Red Line Route
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Metro Line */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
                
                {/* Stations */}
                <div className="space-y-4">
                  {STATIONS.map((station, index) => {
                    const isCurrentStation = index === currentTrainPosition;
                    const isPassedStation = index < currentTrainPosition;
                    
                    return (
                      <div key={station.id} className="relative flex items-center">
                        {/* Station Dot */}
                        <div className={`
                          relative z-10 w-4 h-4 rounded-full border-2 mr-4
                          ${isCurrentStation 
                            ? 'bg-success border-success animate-pulse' 
                            : isPassedStation
                            ? 'bg-primary border-primary'
                            : 'bg-background border-muted-foreground'
                          }
                        `}>
                          {isCurrentStation && (
                            <div className="absolute -inset-2 bg-success/20 rounded-full animate-ping"></div>
                          )}
                        </div>
                        
                        {/* Station Info */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`
                              font-medium
                              ${isCurrentStation ? 'text-success' : 'text-foreground'}
                            `}>
                              {station.name}
                            </span>
                            <div className="flex items-center gap-2">
                              {isCurrentStation && (
                                <Badge variant="secondary" className="text-xs">
                                  <Train className="w-3 h-3 mr-1" />
                                  Current
                                </Badge>
                              )}
                              <Badge 
                                variant={station.status === 'open' ? 'default' : 'destructive'}
                                className="text-xs"
                              >
                                {station.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Station {index + 1} of {STATIONS.length}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="shadow-card mt-4">
            <CardContent className="pt-6">
              <h4 className="font-medium mb-3">Legend</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span>Current Position</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Passed Stations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-muted rounded-full border border-muted-foreground"></div>
                  <span>Upcoming Stations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  <span>Metro Line</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};