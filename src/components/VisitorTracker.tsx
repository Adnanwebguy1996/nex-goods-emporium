
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, Monitor, Smartphone, Tablet } from "lucide-react";
import { visitorService, type VisitorData } from "@/lib/firebase/visitorService";

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

const formatTime = (timestamp: any) => {
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 1) return "Active now";
  if (diffInMinutes === 1) return "1 min ago";
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  
  const hours = Math.floor(diffInMinutes / 60);
  if (hours === 1) return "1 hour ago";
  return `${hours} hours ago`;
};

const formatSessionDuration = (startTime: any) => {
  const start = startTime?.toDate ? startTime.toDate() : new Date(startTime);
  const now = new Date();
  const minutes = Math.floor((now.getTime() - start.getTime()) / 60000);
  
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  return `${hours}h ${remainingMins}m`;
};

const VisitorTracker: React.FC = () => {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track current visitor
    visitorService.trackVisitor('/admin').catch(console.error);

    // Subscribe to real-time visitor updates
    const unsubscribe = visitorService.subscribeToVisitors((updatedVisitors) => {
      setVisitors(updatedVisitors);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const activeVisitors = visitors.filter(v => {
    const lastActive = v.lastActive.toDate();
    return new Date().getTime() - lastActive.getTime() < 300000; // Active in last 5 minutes
  }).length;

  const uniqueCountries = new Set(visitors.map(v => v.countryCode)).size;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading visitor data...</p>
        </div>
      </div>
    );
  }

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
            Live Visitors (Real-time Firebase Data)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {visitors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No active visitors at the moment</p>
              <p className="text-sm mt-2">Visit other pages to see real visitor tracking!</p>
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
                  const lastActive = visitor.lastActive.toDate();
                  const isActive = new Date().getTime() - lastActive.getTime() < 300000;
                  
                  return (
                    <TableRow key={visitor.id} className={isActive ? "bg-green-50" : ""}>
                      <TableCell className="flex items-center space-x-2">
                        <span className="text-lg">
                          {getCountryFlag(visitor.countryCode)}
                        </span>
                        <div>
                          <span className="font-medium">{visitor.location}</span>
                          <br />
                          <span className="text-xs text-gray-500">{visitor.sessionId}</span>
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
                      <TableCell>{formatSessionDuration(visitor.sessionStart)}</TableCell>
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
