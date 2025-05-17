
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock authentication - in a real app, use proper auth like Supabase
const AdminAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Mock authentication - replace with real auth system
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        localStorage.setItem("isAdmin", "true");
        window.location.reload();
        toast.success("Logged in successfully");
      } else {
        toast.error("Invalid credentials");
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your products</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-nex-600 hover:bg-nex-700" 
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Demo credentials: admin / password
          </p>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is admin from localStorage
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);
  
  // Show loading state while checking auth
  if (isAdmin === null) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  // If not admin, show login page
  if (!isAdmin) {
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
                Manage your product catalog
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("isAdmin");
                window.location.reload();
              }}
              className="mt-4 md:mt-0"
            >
              Sign Out
            </Button>
          </div>
          
          <Tabs defaultValue="products" className="mt-6">
            <TabsList className="mb-8">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="add">Add Product</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="space-y-4">
              <ProductList />
            </TabsContent>
            
            <TabsContent value="add">
              <ProductForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
