// This page redirects to login if not authenticated, otherwise to home

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("lucknow_metro_user");
    if (user) {
      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-primary">
      <div className="text-center text-primary-foreground">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>Loading Lucknow Metro...</p>
      </div>
    </div>
  );
};

export default Index;
