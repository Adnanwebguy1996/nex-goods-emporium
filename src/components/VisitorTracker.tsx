
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, Monitor, Smartphone, Tablet } from "lucide-react";

interface Visitor {
  id: string;
  location: string;
  countryCode: string;
  page: string;
  lastActive: Date;
  browser: string;
  device: string;
  sessionDuration: number;
}

const getDeviceIcon = (device: string) => {
  switch (device.toLowerCase()) {
    case 'mobile':
      return <Smartphone className="h-4 w-4" />;
    case 'tablet':
      return <Tablet className="h-4 w-4" />;
    default:
      return <Monitor className="h-4 w-4" />;
  }
};

const getCountryFlag = (countryCode: string) => {
  const flags: { [key: string]: string } = {
    "PK": "🇵🇰", "US": "🇺🇸", "GB": "🇬🇧", "DE": "🇩🇪", 
    "CA": "🇨🇦", "AU": "🇦🇺", "FR": "🇫🇷", "IN": "🇮🇳",
    "JP": "🇯🇵", "BR": "🇧🇷", "AE": "🇦🇪", "SA": "🇸🇦"
  };
  return flags[countryCode] || "🌍";
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 1) return "Active now";
  if (diffInMinutes === 1) return "1 min ago";
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  
  const hours = Math.floor(diffInMinutes / 60);
  if (hours === 1) return "1 hour ago";
  return `${hours} hours ago`;
};

const formatSessionDuration = (minutes: number) => {
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${Math.floor(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = Math.floor(minutes % 60);
  return `${hours}h ${remainingMins}m`;
};

const VisitorTracker: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);

  useEffect(() => {
    // Initialize with some realistic visitor data
    const initialVisitors: Visitor[] = [
      {
        id: "v1",
        location: "Karachi, Pakistan",
        countryCode: "PK",
        page: "/products",
        lastActive: new Date(Date.now() - 30000),
        browser: "Chrome",
        device: "Mobile",
        sessionDuration: 5.2
      },
      {
        id: "v2",
        location: "Lahore, Pakistan",
        countryCode: "PK",
        page: "/",
        lastActive: new Date(Date.now() - 120000),
        browser: "Safari",
        device: "Desktop",
        sessionDuration: 12.8
      },
      {
        id: "v3",
        location: "Dubai, UAE",
        countryCode: "AE",
        page: "/categories",
        lastActive: new Date(Date.now() - 45000),
        browser: "Firefox",
        device: "Tablet",
        sessionDuration: 3.1
      }
    ];

    setVisitors(initialVisitors);
    setTotalVisitors(initialVisitors.length);

    // Simulate realistic visitor updates
    const interval = setInterval(() => {
      setVisitors(prev => {
        const updated = prev.map(visitor => {
          // Randomly update some visitors
          if (Math.random() > 0.8) {
            const pages = ["/", "/products", "/categories", "/cart", "/checkout"];
            return {
              ...visitor,
              page: pages[Math.floor(Math.random() * pages.length)],
              lastActive: new Date(),
              sessionDuration: visitor.sessionDuration + Math.random() * 2
            };
          }
          return visitor;
        });

        // Occasionally add a new visitor
        if (Math.random() > 0.9 && updated.length < 8) {
          const locations = [
            { location: "Islamabad, Pakistan", countryCode: "PK" },
            { location: "London, UK", countryCode: "GB" },
            { location: "New York, USA", countryCode: "US" },
            { location: "Toronto, Canada", countryCode: "CA" },
            { location: "Riyadh, Saudi Arabia", countryCode: "SA" }
          ];
          const pages = ["/", "/products", "/categories", "/about"];
          const browsers = ["Chrome", "Safari", "Firefox", "Edge"];
          const devices = ["Desktop", "Mobile", "Tablet"];

          const randomLocation = locations[Math.floor(Math.random() * locations.length)];
          
          const newVisitor: Visitor = {
            id: `v${Date.now()}`,
            location: randomLocation.location,
            countryCode: randomLocation.countryCode,
            page: pages[Math.floor(Math.random() * pages.length)],
            lastActive: new Date(),
            browser: browsers[Math.floor(Math.random() * browsers.length)],
            device: devices[Math.floor(Math.random() * devices.length)],
            sessionDuration: Math.random() * 2
          };

          return [newVisitor, ...updated];
        }

        return updated;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const activeVisitors = visitors.filter(v => 
    new Date().getTime() - v.lastActive.getTime() < 300000 // Active in last 5 minutes
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Now</p>
                <p className="text-2xl font-bold text-green-600">{activeVisitors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Visitors</p>
                <p className="text-2xl font-bold text-blue-600">{visitors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Countries</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(visitors.map(v => v.countryCode)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" /> 
            Live Visitor Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {visitors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No active visitors at the moment</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Current Page</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Session Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.map((visitor) => {
                  const isActive = new Date().getTime() - visitor.lastActive.getTime() < 300000;
                  
                  return (
                    <TableRow key={visitor.id} className={isActive ? "bg-green-50" : ""}>
                      <TableCell className="flex items-center space-x-2">
                        <span className="text-lg">
                          {getCountryFlag(visitor.countryCode)}
                        </span>
                        <span className="font-medium">{visitor.location}</span>
                      </TableCell>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {visitor.page}
                        </code>
                      </TableCell>
                      <TableCell>{formatTime(visitor.lastActive)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getDeviceIcon(visitor.device)}
                          <span>{visitor.device}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatSessionDuration(visitor.sessionDuration)}</TableCell>
                      <TableCell>
                        <Badge variant={isActive ? "default" : "secondary"}>
                          {isActive ? "Active" : "Idle"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorTracker;
