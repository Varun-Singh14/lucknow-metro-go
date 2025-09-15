import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, IndianRupee, Ticket } from "lucide-react";
import { ActionBar } from "@/components/ActionBar";
import { BottomNavigation } from "@/components/BottomNavigation";
import { createDemoBookings } from "@/data/demoData";
import { useNavigate } from "react-router-dom";

export const HistoryPage = () => {
  const navigate = useNavigate();
  const bookings = createDemoBookings();

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-white">Active</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'used':
        return <Badge variant="secondary">Used</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewTicket = (booking: any) => {
    if (booking.status === 'active') {
      // Navigate to ticket page with booking data
      navigate('/ticket', { 
        state: { 
          bookingData: {
            fromStation: booking.fromStation,
            toStation: booking.toStation,
            passengers: booking.passengers,
            amount: booking.amount,
          },
          existingBooking: booking
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <ActionBar 
        title="Booking History"
        subtitle="View your past and active bookings"
      />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {bookings.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="p-8 text-center">
              <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No bookings yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start by booking your first metro ticket
              </p>
              <Button 
                onClick={() => navigate('/home')}
                className="bg-gradient-primary border-0"
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id} className="shadow-card">
              <CardContent className="p-4">
                {/* Status and Date */}
                <div className="flex items-center justify-between mb-3">
                  {getStatusBadge(booking.status)}
                  <span className="text-sm text-muted-foreground">
                    {formatDateTime(booking.bookingDate)}
                  </span>
                </div>

                {/* Route */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm">
                    <span className="font-medium">{booking.fromStation.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="text-sm">
                    <span className="font-medium">{booking.toStation.name}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.passengers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.amount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {booking.status === 'active' ? 'Valid till' : 'Expired'}
                    </span>
                  </div>
                </div>

                {/* Valid Till */}
                <div className="text-xs text-muted-foreground mb-4">
                  Valid till: {formatDateTime(booking.validTill)}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-3">
                  {booking.status === 'active' && (
                    <Button
                      size="sm"
                      onClick={() => handleViewTicket(booking)}
                      className="flex-1 bg-gradient-primary border-0"
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      View Ticket
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    disabled
                  >
                    Receipt
                  </Button>
                </div>

                {/* Transaction Details */}
                <div className="pt-3 border-t border-border text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>TXN: {booking.transactionId}</span>
                    <span>{booking.paymentProvider}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};