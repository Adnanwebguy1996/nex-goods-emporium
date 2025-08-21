
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import VisitorTracker from "@/components/VisitorTracker";
import VisitorHeatmap from "@/components/VisitorHeatmap";
import AdminSetup from "@/components/AdminSetup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LogIn, Lock, Users, MapPin, Loader2 } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Sign in with your admin credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Sign in
                  </>
                )}
              </Button>
            </form>
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
      email: 'admin@temp.com',
      displayName: 'Temporary Admin',
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
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {currentAdmin.displayName}! Manage your store and monitor activity.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">Role:</span>
                <span className="text-sm font-medium capitalize">{currentAdmin.role.replace('_', ' ')}</span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="mt-4 md:mt-0"
            >
              Sign Out
            </Button>
          </div>
          
          <Tabs defaultValue="products" className="mt-6">
            <TabsList className="mb-8">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="add">Add Product</TabsTrigger>
              <TabsTrigger value="visitors" className="flex items-center gap-1">
                <Users className="h-4 w-4" /> Live Visitors
              </TabsTrigger>
              <TabsTrigger value="heatmap" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Activity Heatmap
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="space-y-4">
              <ProductList />
            </TabsContent>
            
            <TabsContent value="add">
              <ProductForm />
            </TabsContent>

            <TabsContent value="visitors">
              <VisitorTracker />
            </TabsContent>

            <TabsContent value="heatmap">
              <VisitorHeatmap />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
