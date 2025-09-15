import { ArrowLeft, MoreVertical, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface ActionBarProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
  customAction?: React.ReactNode;
  showCitySelector?: boolean;
  selectedCity?: string;
  onCityChange?: (cityId: string) => void;
  cities?: Array<{ id: string; name: string }>;
}

export const ActionBar = ({ 
  title, 
  subtitle, 
  showBack = false, 
  showMenu = false, 
  onMenuClick,
  customAction,
  showCitySelector = false,
  selectedCity,
  onCityChange,
  cities = []
}: ActionBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-gradient-primary text-primary-foreground shadow-lg">
      <div className="flex items-center min-h-14 px-4 py-2">
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
        
        {/* Center - Title and City Selector */}
        <div className="flex-1 text-center px-2">
          <h1 className="text-lg font-semibold truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-primary-foreground/70 truncate -mt-1">
              {subtitle}
            </p>
          )}
          {showCitySelector && cities.length > 0 && (
            <div className="mt-2 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-primary-foreground/70" />
              <Select value={selectedCity} onValueChange={onCityChange}>
                <SelectTrigger className="w-32 h-8 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground text-sm">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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