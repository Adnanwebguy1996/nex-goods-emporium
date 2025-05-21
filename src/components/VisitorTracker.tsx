
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Users } from "lucide-react";

// Mock visitor data
interface Visitor {
  id: string;
  ip: string;
  country: string;
  countryCode: string;
  page: string;
  lastActive: string;
  browser: string;
  device: string;
}

const mockVisitors: Visitor[] = [
  {
    id: "v1",
    ip: "192.168.1.1",
    country: "United States",
    countryCode: "US",
    page: "/products",
    lastActive: new Date().toISOString(),
    browser: "Chrome",
    device: "Desktop"
  },
  {
    id: "v2",
    ip: "10.0.0.1",
    country: "United Kingdom",
    countryCode: "GB",
    page: "/products/prod_001",
    lastActive: new Date(Date.now() - 2 * 60000).toISOString(),
    browser: "Firefox",
    device: "Mobile"
  },
  {
    id: "v3",
    ip: "172.16.0.1",
    country: "Germany",
    countryCode: "DE",
    page: "/",
    lastActive: new Date(Date.now() - 5 * 60000).toISOString(),
    browser: "Safari",
    device: "Tablet"
  },
  {
    id: "v4",
    ip: "192.168.0.10",
    country: "Canada",
    countryCode: "CA",
    page: "/cart",
    lastActive: new Date(Date.now() - 1 * 60000).toISOString(),
    browser: "Edge",
    device: "Desktop"
  },
  {
    id: "v5",
    ip: "10.10.10.10",
    country: "Australia",
    countryCode: "AU",
    page: "/checkout",
    lastActive: new Date(Date.now() - 3 * 60000).toISOString(),
    browser: "Chrome",
    device: "Mobile"
  }
];

// Function to format the timestamp
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes === 1) {
    return "1 minute ago";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else {
    const hours = Math.floor(diffInMinutes / 60);
    if (hours === 1) {
      return "1 hour ago";
    } else {
      return `${hours} hours ago`;
    }
  }
};

const VisitorTracker: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [activeVisitors, setActiveVisitors] = useState<number>(0);

  useEffect(() => {
    // In a real app, this would be a WebSocket or polling connection
    // to get real-time visitor data
    setActiveVisitors(visitors.length);

    // Simulate new visitors coming in
    const interval = setInterval(() => {
      // Randomly decide if we should add a new visitor or update an existing one
      if (Math.random() > 0.7) {
        const countries = ["US", "GB", "DE", "CA", "AU", "FR", "JP", "BR", "IN"];
        const pages = ["/", "/products", "/cart", "/checkout", "/products/prod_001"];
        const browsers = ["Chrome", "Firefox", "Safari", "Edge"];
        const devices = ["Desktop", "Mobile", "Tablet"];

        const randomCountryCode = countries[Math.floor(Math.random() * countries.length)];
        const randomCountry = {
          "US": "United States",
          "GB": "United Kingdom",
          "DE": "Germany",
          "CA": "Canada",
          "AU": "Australia",
          "FR": "France",
          "JP": "Japan",
          "BR": "Brazil",
          "IN": "India"
        }[randomCountryCode] || "Unknown";

        const newVisitor: Visitor = {
          id: `v${Date.now()}`,
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          country: randomCountry,
          countryCode: randomCountryCode,
          page: pages[Math.floor(Math.random() * pages.length)],
          lastActive: new Date().toISOString(),
          browser: browsers[Math.floor(Math.random() * browsers.length)],
          device: devices[Math.floor(Math.random() * devices.length)]
        };

        setVisitors(prev => [newVisitor, ...prev.slice(0, 9)]);
        setActiveVisitors(prev => prev + 1);
      } else {
        // Update a random existing visitor
        setVisitors(prev => {
          if (prev.length === 0) return prev;
          
          const indexToUpdate = Math.floor(Math.random() * prev.length);
          const pages = ["/", "/products", "/cart", "/checkout", "/products/prod_001"];
          
          const updated = [...prev];
          updated[indexToUpdate] = {
            ...updated[indexToUpdate],
            page: pages[Math.floor(Math.random() * pages.length)],
            lastActive: new Date().toISOString()
          };
          
          return updated;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" /> 
            Live Visitors
            <span className="ml-2 text-sm px-2 py-1 bg-green-500 text-white rounded-full">
              {activeVisitors} Online
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Page</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>Device</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitors.map((visitor) => (
                <TableRow key={visitor.id}>
                  <TableCell className="flex items-center">
                    <span className="mr-2 text-lg">
                      {visitor.countryCode === "US" && "🇺🇸"}
                      {visitor.countryCode === "GB" && "🇬🇧"}
                      {visitor.countryCode === "DE" && "🇩🇪"}
                      {visitor.countryCode === "CA" && "🇨🇦"}
                      {visitor.countryCode === "AU" && "🇦🇺"}
                      {visitor.countryCode === "FR" && "🇫🇷"}
                      {visitor.countryCode === "JP" && "🇯🇵"}
                      {visitor.countryCode === "BR" && "🇧🇷"}
                      {visitor.countryCode === "IN" && "🇮🇳"}
                    </span>
                    <span>{visitor.country}</span>
                  </TableCell>
                  <TableCell className="font-mono">{visitor.page}</TableCell>
                  <TableCell>{formatTime(visitor.lastActive)}</TableCell>
                  <TableCell>{visitor.browser}</TableCell>
                  <TableCell>{visitor.device}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorTracker;
