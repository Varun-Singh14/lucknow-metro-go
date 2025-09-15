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
    <div className="sticky top-0 z-50 bg-gradient-primary text-primary-foreground shadow-lg">
      <div className="flex items-center h-14 px-4">
        {/* Left side - Back button */}
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10 h-10 w-10 -ml-2 mr-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        )}
        
        {/* Center - Title */}
        <div className="flex-1 text-center px-2">
          <h1 className="text-lg font-semibold truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-primary-foreground/70 truncate -mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Right side - Custom action or menu */}
        <div className="flex items-center gap-2">
          {customAction && (
            <div className="flex items-center">
              {customAction}
            </div>
          )}
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="text-primary-foreground hover:bg-primary-foreground/10 h-10 w-10 -mr-2"
            >
              <MoreVertical className="w-6 h-6" />
            </Button>
          )}
          {/* Add spacer when no back button to center the title */}
          {!showBack && !customAction && !showMenu && (
            <div className="w-10"></div>
          )}
        </div>
      </div>
    </div>
  );
};