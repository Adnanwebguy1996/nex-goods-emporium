
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { categories } from "@/lib/data";
import { Link } from "react-router-dom";
import { Package, Palette, Code, Layers, Plug, Zap } from "lucide-react";

// Icon mapping for categories
const categoryIcons = {
  "Templates": Code,
  "UI Kits": Layers,
  "Icons": Palette,
  "Scripts": Code,
  "Plugins": Plug,
  "Elementor": Zap,
  "Divi website assets": Package,
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Stats Section */}
        <section className="py-12 bg-white border-y">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-nex-600">1000+</div>
                <div className="text-sm text-gray-600">Digital Products</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-nex-600">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-nex-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-nex-600">100%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        {/* Categories Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Package;
                return (
                  <Link 
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="bg-white hover:bg-gray-50 border rounded-lg p-6 text-center transition-all hover:shadow-md group"
                  >
                    <div className="flex justify-center mb-3">
                      <IconComponent className="h-8 w-8 text-nex-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-medium">{category}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-12 bg-nex-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="mb-6">Get the latest updates on new products and special discounts.</p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 rounded-lg flex-1 text-gray-800" 
                />
                <button className="bg-white text-nex-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
