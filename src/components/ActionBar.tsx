import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ActionBarProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
  customAction?: React.ReactNode;
}

export const ActionBar = ({ 
  title, 
  subtitle, 
  showBack = false, 
  showMenu = false, 
  onMenuClick,
  customAction 
}: ActionBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-gradient-primary text-primary-foreground shadow-lg border-b border-primary-foreground/10">
      {/* Status bar space for mobile */}
      <div className="h-safe-top bg-gradient-primary"></div>
      
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3 flex-1">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9 shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold leading-tight truncate">{title}</h1>
            {subtitle && (
              <p className="text-sm text-primary-foreground/80 leading-tight truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          {customAction}
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};