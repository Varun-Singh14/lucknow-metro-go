import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onViewDetail: () => void;
}

export const InfoCard = ({ title, description, icon, onViewDetail }: InfoCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base">
          <div className="text-primary">
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onViewDetail}
          className="w-full justify-between"
        >
          View Detail
          <ChevronRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
};