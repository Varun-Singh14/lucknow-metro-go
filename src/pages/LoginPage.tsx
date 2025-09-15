import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Train } from "lucide-react";
import { DEMO_CREDENTIALS } from "@/data/demoData";
import { useToast } from "@/hooks/use-toast";

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (userId === DEMO_CREDENTIALS.id && password === DEMO_CREDENTIALS.password) {
        localStorage.setItem("lucknow_metro_user", JSON.stringify({ 
          id: userId, 
          loginTime: Date.now() 
        }));
        toast({
          title: "Login Successful",
          description: "Welcome to Lucknow Metro!",
        });
        navigate("/home");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Use demo123 / password123",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="bg-card rounded-full p-4 w-20 h-20 mx-auto mb-4 shadow-metro">
            <Train className="w-12 h-12 text-primary mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            Lucknow Metro
          </h1>
          <p className="text-primary-foreground/80">
            Fast, Safe & Convenient Travel
          </p>
        </div>

        <Card className="shadow-metro">
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to book your metro tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary border-0 shadow-metro"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Demo Credentials:</p>
              <p className="text-sm text-muted-foreground">ID: demo123</p>
              <p className="text-sm text-muted-foreground">Password: password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};