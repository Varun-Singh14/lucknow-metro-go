import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Users, CreditCard, Calendar, X } from "lucide-react";
import { ActionBar } from "@/components/ActionBar";
import { BottomNavigation } from "@/components/BottomNavigation";
import { generateQRCode, Booking } from "@/data/demoData";
import { useToast } from "@/hooks/use-toast";

export const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQRIndex, setCurrentQRIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const bookingData = location.state?.bookingData;
  
  // If no booking data, redirect to home
  useEffect(() => {
    if (!bookingData) {
      navigate("/home");
    }
  }, [bookingData, navigate]);

  if (!bookingData) return null;

  // Create a complete booking with all details
  const now = new Date();
  const validTill = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
  
  const booking: Booking = {
    id: `booking_${Date.now()}`,
    userId: "demo123",
    fromStation: bookingData.fromStation,
    toStation: bookingData.toStation,
    passengers: bookingData.passengers,
    amount: bookingData.amount,
    bookingDate: now,
    validTill: validTill,
    status: 'active',
    transactionId: `TXN${Date.now()}`,
    paymentProvider: "GPay",
    qrCodes: Array.from({ length: bookingData.passengers }, (_, i) => 
      generateQRCode(`booking_${Date.now()}`, i)
    )
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentQRIndex < booking.passengers - 1) {
      setCurrentQRIndex(currentQRIndex + 1);
    }
    if (isRightSwipe && currentQRIndex > 0) {
      setCurrentQRIndex(currentQRIndex - 1);
    }
  };

  const handleCancelBooking = () => {
    toast({
      title: "Booking Cancelled",
      description: "Your ticket has been cancelled successfully",
    });
    navigate("/home");
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <ActionBar 
        title="Metro Ticket"
        showBack={true}
        customAction={
          <Badge 
            className={`${booking.status === 'active' ? 'bg-success' : 'bg-destructive'} text-white`}
          >
            {booking.status.toUpperCase()}
          </Badge>
        }
      />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Ticket Card */}
        <Card className="shadow-metro overflow-hidden">
          {/* Route Information */}
          <CardHeader className="bg-gradient-surface">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-semibold">{booking.fromStation.name}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary mx-4" />
              <div className="text-center flex-1">
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-semibold">{booking.toStation.name}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Passenger Counter */}
            {booking.passengers > 1 && (
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentQRIndex(Math.max(0, currentQRIndex - 1))}
                    disabled={currentQRIndex === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <span className="font-semibold text-primary px-4">
                    Passenger {currentQRIndex + 1}/{booking.passengers}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentQRIndex(Math.min(booking.passengers - 1, currentQRIndex + 1))}
                    disabled={currentQRIndex === booking.passengers - 1}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* QR Code */}
            <div 
              className="bg-white p-8 rounded-lg border-2 border-dashed border-primary/30 mb-6"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="text-center">
                <div className="bg-black w-48 h-48 mx-auto rounded-lg flex items-center justify-center">
                  <div className="text-white text-xs font-mono p-2 text-center break-all">
                    {booking.qrCodes[currentQRIndex]}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Scan this QR code at metro station
                </p>
                {booking.passengers > 1 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Swipe left/right for other passengers
                  </p>
                )}
              </div>
            </div>

            {/* Ticket Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Valid Till</span>
                </div>
                <span className="font-medium text-sm">{formatDateTime(booking.validTill)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Passengers</span>
                </div>
                <span className="font-medium">{booking.passengers}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Transaction ID</span>
                </div>
                <span className="font-medium text-xs">{booking.transactionId}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Payment</span>
                </div>
                <span className="font-medium">{booking.paymentProvider}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Booked On</span>
                </div>
                <span className="font-medium text-sm">{formatDateTime(booking.bookingDate)}</span>
              </div>
            </div>

            {/* Cancel Button */}
            <Button
              onClick={handleCancelBooking}
              variant="outline"
              className="w-full mb-6 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel Booking
            </Button>

            {/* Info Section */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Lucknow Metro Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ticket valid for 24 hours from booking time</li>
                <li>• Show QR code at entry and exit gates</li>
                <li>• Keep ticket safe during journey</li>
                <li>• No refund after ticket expiry</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};