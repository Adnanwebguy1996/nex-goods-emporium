
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Heatmap, Cell, XAxis, YAxis, Tooltip } from "recharts";
import { MapPin } from "lucide-react";

interface PageView {
  page: string;
  hour: number;
  views: number;
}

const mockHeatmapData: PageView[] = [];

// Generate mock heatmap data
const pages = ["/", "/products", "/cart", "/checkout", "/products/prod_001"];
const hours = Array.from({ length: 24 }, (_, i) => i);

// Fill mock data
pages.forEach(page => {
  hours.forEach(hour => {
    // Generate more realistic patterns
    let views = 0;
    
    // Simulate peak hours
    if (hour >= 9 && hour <= 17) {
      views = Math.floor(Math.random() * 20) + 10; // Higher traffic during business hours
    } else if (hour >= 18 && hour <= 22) {
      views = Math.floor(Math.random() * 15) + 5; // Medium traffic in evening
    } else {
      views = Math.floor(Math.random() * 5) + 1; // Low traffic overnight
    }
    
    // Homepage gets more traffic
    if (page === "/") {
      views = views * 2;
    }
    
    mockHeatmapData.push({
      page,
      hour,
      views
    });
  });
});

const VisitorHeatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<PageView[]>(mockHeatmapData);
  
  // In a real app, we would update this data from a server
  useEffect(() => {
    const interval = setInterval(() => {
      setHeatmapData(prev => 
        prev.map(item => ({
          ...item,
          views: item.views + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0)
        }))
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const formatHour = (hour: number) => {
    if (hour === 0) return "12am";
    if (hour === 12) return "12pm";
    return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
  };
  
  const getIntensity = (views: number) => {
    if (views > 30) return "#ef4444";
    if (views > 20) return "#f97316";
    if (views > 10) return "#facc15";
    if (views > 5) return "#84cc16";
    return "#22c55e";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <MapPin className="mr-2 h-6 w-6" /> 
          Visitor Activity Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ChartContainer className="h-full" config={{}}>
            <Heatmap
              data={heatmapData}
              nameKey="hour"
              dataKey="page"
              valueKey="views"
            >
              <XAxis 
                dataKey="hour" 
                type="number" 
                tickFormatter={formatHour}
                tickCount={12}
              />
              <YAxis 
                dataKey="page" 
                type="category"
                tickLine={false}
              />
              <Tooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number, name: string) => [`${value} views`, `Page: ${name}`]}
              />
              {heatmapData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getIntensity(entry.views)}
                />
              ))}
            </Heatmap>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorHeatmap;
