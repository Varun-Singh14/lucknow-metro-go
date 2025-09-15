import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronRight,
  Phone,
  Mail
} from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { DEMO_USER } from "@/data/demoData";
import { useToast } from "@/hooks/use-toast";

export const BrowsePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("lucknow_metro_user");
    toast({
      title: "Logged out successfully",
      description: "Thank you for using Lucknow Metro!",
    });
    navigate("/");
  };

  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Manage your personal information",
      onClick: () => toast({ title: "Profile", description: "Feature coming soon!" })
    },
    {
      id: "recharge",
      label: "Recharge Metro Card",
      icon: CreditCard,
      description: "Add money to your metro card",
      onClick: () => toast({ title: "Recharge", description: "Feature coming soon!" })
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "App preferences and notifications",
      onClick: () => toast({ title: "Settings", description: "Feature coming soon!" })
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-primary p-6 text-primary-foreground">
          <h1 className="text-xl font-semibold mb-2">Account</h1>
          <p className="text-primary-foreground/80 text-sm">
            Manage your profile and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="p-4 -mt-4">
          <Card className="shadow-card mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {DEMO_USER.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{DEMO_USER.name}</h2>
                  <p className="text-sm text-muted-foreground">Metro Commuter</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{DEMO_USER.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">rahul.kumar@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">ID: {DEMO_USER.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} className="shadow-card">
                  <CardContent className="p-0">
                    <button
                      onClick={item.onClick}
                      className="w-full p-4 flex items-center gap-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Logout Button */}
          <Card className="shadow-card mt-6">
            <CardContent className="p-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </CardContent>
          </Card>

          {/* App Info */}
          <div className="mt-6 p-4 bg-gradient-surface rounded-lg border">
            <h4 className="font-medium mb-2">Lucknow Metro App</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Your trusted companion for metro travel in Lucknow.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Version 1.0.0</p>
              <p>© 2024 Lucknow Metro Rail Corporation</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};