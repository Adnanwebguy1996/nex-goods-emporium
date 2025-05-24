
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { MapPin } from "lucide-react";

interface PageView {
  page: string;
  hour: number;
  views: number;
}

interface HeatmapCell {
  hour: string;
  page: string;
  views: number;
  intensity: string;
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
  
  const getIntensityColor = (views: number) => {
    if (views > 30) return "#ef4444";
    if (views > 20) return "#f97316";
    if (views > 10) return "#facc15";
    if (views > 5) return "#84cc16";
    return "#22c55e";
  };

  // Transform data for each page into chart format
  const chartData = pages.map(page => {
    const pageData = heatmapData.filter(item => item.page === page);
    return {
      page: page === "/" ? "Home" : page.replace("/", "").replace(/\//g, " > "),
      data: pageData.map(item => ({
        hour: formatHour(item.hour),
        views: item.views,
        color: getIntensityColor(item.views)
      }))
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <MapPin className="mr-2 h-6 w-6" /> 
          Visitor Activity Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {chartData.map((pageChart, pageIndex) => (
            <div key={pageIndex} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">{pageChart.page}</h3>
              <div className="h-[120px] w-full">
                <ChartContainer className="h-full" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pageChart.data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <XAxis 
                        dataKey="hour" 
                        tick={{ fontSize: 10 }}
                        interval={1}
                      />
                      <YAxis hide />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        formatter={(value: number, name: string) => [`${value} views`, `${pageChart.page}`]}
                      />
                      <Bar dataKey="views" radius={[2, 2, 0, 0]}>
                        {pageChart.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#22c55e" }}></div>
            <span>Low (1-5)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#84cc16" }}></div>
            <span>Medium (6-10)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#facc15" }}></div>
            <span>High (11-20)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#f97316" }}></div>
            <span>Very High (21-30)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#ef4444" }}></div>
            <span>Peak (30+)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorHeatmap;
