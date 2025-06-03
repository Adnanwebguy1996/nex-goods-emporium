
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
  ip: string;
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
    "US": "🇺🇸", "GB": "🇬🇧", "CA": "🇨🇦", "AU": "🇦🇺", "DE": "🇩🇪",
    "FR": "🇫🇷", "IN": "🇮🇳", "JP": "🇯🇵", "BR": "🇧🇷", "IT": "🇮🇹",
    "ES": "🇪🇸", "MX": "🇲🇽", "NL": "🇳🇱", "SE": "🇸🇪", "NO": "🇳🇴",
    "PK": "🇵🇰", "AE": "🇦🇪", "SA": "🇸🇦", "BD": "🇧🇩", "MY": "🇲🇾",
    "SG": "🇸🇬", "TH": "🇹🇭", "VN": "🇻🇳", "PH": "🇵🇭", "ID": "🇮🇩",
    "TR": "🇹🇷", "RU": "🇷🇺", "UA": "🇺🇦", "PL": "🇵🇱", "CZ": "🇨🇿",
    "ZA": "🇿🇦", "EG": "🇪🇬", "NG": "🇳🇬", "KE": "🇰🇪", "MA": "🇲🇦",
    "AR": "🇦🇷", "CL": "🇨🇱", "CO": "🇨🇴", "PE": "🇵🇪", "UY": "🇺🇾"
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

const generateRealisticVisitor = () => {
  const internationalLocations = [
    { location: "New York, USA", countryCode: "US" },
    { location: "London, UK", countryCode: "GB" },
    { location: "Toronto, Canada", countryCode: "CA" },
    { location: "Sydney, Australia", countryCode: "AU" },
    { location: "Berlin, Germany", countryCode: "DE" },
    { location: "Paris, France", countryCode: "FR" },
    { location: "Mumbai, India", countryCode: "IN" },
    { location: "Tokyo, Japan", countryCode: "JP" },
    { location: "São Paulo, Brazil", countryCode: "BR" },
    { location: "Rome, Italy", countryCode: "IT" },
    { location: "Madrid, Spain", countryCode: "ES" },
    { location: "Mexico City, Mexico", countryCode: "MX" },
    { location: "Amsterdam, Netherlands", countryCode: "NL" },
    { location: "Stockholm, Sweden", countryCode: "SE" },
    { location: "Oslo, Norway", countryCode: "NO" },
    { location: "Karachi, Pakistan", countryCode: "PK" },
    { location: "Dubai, UAE", countryCode: "AE" },
    { location: "Riyadh, Saudi Arabia", countryCode: "SA" },
    { location: "Dhaka, Bangladesh", countryCode: "BD" },
    { location: "Kuala Lumpur, Malaysia", countryCode: "MY" },
    { location: "Singapore", countryCode: "SG" },
    { location: "Bangkok, Thailand", countryCode: "TH" },
    { location: "Ho Chi Minh City, Vietnam", countryCode: "VN" },
    { location: "Manila, Philippines", countryCode: "PH" },
    { location: "Jakarta, Indonesia", countryCode: "ID" },
    { location: "Istanbul, Turkey", countryCode: "TR" },
    { location: "Moscow, Russia", countryCode: "RU" },
    { location: "Kiev, Ukraine", countryCode: "UA" },
    { location: "Warsaw, Poland", countryCode: "PL" },
    { location: "Prague, Czech Republic", countryCode: "CZ" },
    { location: "Cape Town, South Africa", countryCode: "ZA" },
    { location: "Cairo, Egypt", countryCode: "EG" },
    { location: "Lagos, Nigeria", countryCode: "NG" },
    { location: "Nairobi, Kenya", countryCode: "KE" },
    { location: "Casablanca, Morocco", countryCode: "MA" },
    { location: "Buenos Aires, Argentina", countryCode: "AR" },
    { location: "Santiago, Chile", countryCode: "CL" },
    { location: "Bogotá, Colombia", countryCode: "CO" },
    { location: "Lima, Peru", countryCode: "PE" },
    { location: "Montevideo, Uruguay", countryCode: "UY" }
  ];

  const pages = ["/", "/products", "/categories", "/about", "/products/prod_001", "/products/prod_002", "/cart"];
  const browsers = ["Chrome", "Safari", "Firefox", "Edge", "Opera"];
  const devices = ["Desktop", "Mobile", "Tablet"];

  const randomLocation = internationalLocations[Math.floor(Math.random() * internationalLocations.length)];
  const randomPage = pages[Math.floor(Math.random() * pages.length)];
  const randomBrowser = browsers[Math.floor(Math.random() * browsers.length)];
  const randomDevice = devices[Math.floor(Math.random() * devices.length)];

  // Generate realistic activity time (within last 10 minutes for active visitors)
  const activeTime = new Date(Date.now() - Math.random() * 600000); // 0-10 minutes ago
  
  return {
    id: `v${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    location: randomLocation.location,
    countryCode: randomLocation.countryCode,
    page: randomPage,
    lastActive: activeTime,
    browser: randomBrowser,
    device: randomDevice,
    sessionDuration: Math.random() * 45 + 1, // 1-45 minutes
    ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
  };
};

const VisitorTracker: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    // Initialize with realistic international visitors
    const initialVisitors = Array.from({ length: 5 }, generateRealisticVisitor);
    setVisitors(initialVisitors);

    // Real-time visitor simulation
    const interval = setInterval(() => {
      setVisitors(prev => {
        let updated = [...prev];

        // Update existing visitors (page changes, activity)
        updated = updated.map(visitor => {
          if (Math.random() > 0.85) { // 15% chance of activity update
            const pages = ["/", "/products", "/categories", "/about", "/cart"];
            return {
              ...visitor,
              page: pages[Math.floor(Math.random() * pages.length)],
              lastActive: new Date(),
              sessionDuration: visitor.sessionDuration + (Math.random() * 3)
            };
          }
          return visitor;
        });

        // Remove visitors who have been inactive (simulate leaving)
        updated = updated.filter(visitor => 
          Date.now() - visitor.lastActive.getTime() < 900000 // Remove after 15 minutes
        );

        // Add new visitors occasionally
        if (Math.random() > 0.7 && updated.length < 12) {
          const newVisitor = generateRealisticVisitor();
          updated = [newVisitor, ...updated];
        }

        // Sort by last active (most recent first)
        return updated.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime());
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const activeVisitors = visitors.filter(v => 
    new Date().getTime() - v.lastActive.getTime() < 300000 // Active in last 5 minutes
  ).length;

  const uniqueCountries = new Set(visitors.map(v => v.countryCode)).size;

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
                <p className="text-sm text-gray-600">Total Online</p>
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
                <p className="text-2xl font-bold text-purple-600">{uniqueCountries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" /> 
            Live International Visitors
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
                        <div>
                          <span className="font-medium">{visitor.location}</span>
                          <br />
                          <span className="text-xs text-gray-500">{visitor.ip}</span>
                        </div>
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
                          <div>
                            <span>{visitor.device}</span>
                            <br />
                            <span className="text-xs text-gray-500">{visitor.browser}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatSessionDuration(visitor.sessionDuration)}</TableCell>
                      <TableCell>
                        <Badge variant={isActive ? "default" : "secondary"}>
                          {isActive ? "🟢 Active" : "🟡 Idle"}
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
