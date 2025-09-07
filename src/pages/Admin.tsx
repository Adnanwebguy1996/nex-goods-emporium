import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import ProductDashboard from "@/components/ProductDashboard";
import VisitorTracker from "@/components/VisitorTracker";
import VisitorHeatmap from "@/components/VisitorHeatmap";
import AdminSetup from "@/components/AdminSetup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LogIn, Lock, Users, MapPin, Loader2, Package, BarChart3, Settings, Shield } from "lucide-react";
import { authService, type AdminUser } from "@/lib/firebase/authService";

// Firebase-based authentication component
const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      await authService.signInAdmin(email, password);
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to log in");
    }
    
    setIsLoggingIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Admin Portal</CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Sign in to manage your digital store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" /> 
                    Access Admin Panel
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">
                💡 Demo Access: Currently bypassed for testing
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Click "Access Admin Panel" to enter the CMS
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

const Admin = () => {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  
  useEffect(() => {
    // Temporarily bypass auth - set a mock admin user
    const mockAdmin = {
      uid: 'temp-admin',
      email: 'admin@nexdigital.com',
      displayName: 'Store Administrator',
      role: 'super_admin' as const,
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    setCurrentAdmin(mockAdmin);
    setLoading(false);
  }, []);
  
  const handleSignOut = async () => {
    try {
      await authService.signOutAdmin();
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };
  
  const handleSetupComplete = () => {
    setNeedsSetup(false);
  };
  
  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }
  
  // Show setup if needed
  if (needsSetup) {
    return <AdminSetup onSetupComplete={handleSetupComplete} />;
  }
  
  // If not admin, show login page
  if (!currentAdmin) {
    return <AdminAuth />;
  }
  
  // Admin dashboard
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-4xl font-bold mb-2">CMS Dashboard</h1>
                  <p className="text-blue-100 text-lg mb-4">
                    Welcome back, {currentAdmin.displayName}! Manage your digital store with ease.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Role: {currentAdmin.role.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Last Login: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="mt-4 md:mt-0 bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="products" className="space-y-8">
            <TabsList className="bg-white shadow-md border-0 p-2 rounded-xl">
              <TabsTrigger 
                value="products" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Package className="h-5 w-5" /> 
                Product Management
              </TabsTrigger>
              <TabsTrigger 
                value="visitors" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Users className="h-5 w-5" /> 
                Live Visitors
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <BarChart3 className="h-5 w-5" /> 
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="heatmap" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <MapPin className="h-5 w-5" /> 
                Activity Heatmap
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="space-y-4 mt-8">
              <ProductDashboard />
            </TabsContent>

            <TabsContent value="visitors" className="space-y-4 mt-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="mr-3 h-6 w-6" />
                    Real-time Visitor Tracking
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Monitor who's currently browsing your store
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <VisitorTracker />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 mt-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <BarChart3 className="mr-3 h-6 w-6" />
                    Store Analytics
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Coming soon - Advanced analytics dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-12 text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Detailed analytics including sales reports, customer insights, and performance metrics will be available soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="heatmap" className="space-y-4 mt-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <MapPin className="mr-3 h-6 w-6" />
                    Visitor Activity Heatmap
                  </CardTitle>
                  <CardDescription className="text-orange-100">
                    See where visitors spend their time on your site
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <VisitorHeatmap />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;