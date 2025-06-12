
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { categories } from "@/lib/data";
import { Link } from "react-router-dom";
import { Package, Palette, Code, Layers, Plug, Zap, ArrowRight, Star, Users, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Enhanced Stats Section */}
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Thousands of Creators
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join our community of designers, developers, and entrepreneurs who trust our digital products
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-3">
                <div className="bg-gradient-to-br from-nex-500 to-nex-700 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-lg">
                  <Package className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900">1000+</div>
                <div className="text-sm font-medium text-gray-600">Digital Products</div>
              </div>
              
              <div className="text-center space-y-3">
                <div className="bg-gradient-to-br from-nex-500 to-nex-700 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-lg">
                  <Users className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900">50K+</div>
                <div className="text-sm font-medium text-gray-600">Happy Customers</div>
              </div>
              
              <div className="text-center space-y-3">
                <div className="bg-gradient-to-br from-nex-500 to-nex-700 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-lg">
                  <Download className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900">24/7</div>
                <div className="text-sm font-medium text-gray-600">Instant Download</div>
              </div>
              
              <div className="text-center space-y-3">
                <div className="bg-gradient-to-br from-nex-500 to-nex-700 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-lg">
                  <Star className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900">100%</div>
                <div className="text-sm font-medium text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        {/* Enhanced Categories Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Browse by Category
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the perfect digital assets for your next project across our specialized categories
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Package;
                return (
                  <Link 
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border-0 shadow-md bg-white">
                      <CardContent className="p-8 text-center space-y-4">
                        <div className="bg-gradient-to-br from-nex-500 to-nex-700 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-nex-600 transition-colors">
                          {category}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Professional {category.toLowerCase()} for your projects
                        </p>
                        <div className="flex items-center justify-center text-nex-600 font-medium text-sm group-hover:text-nex-700 transition-colors">
                          Explore <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-nex-600 hover:bg-nex-700 shadow-lg">
                <Link to="/categories">
                  View All Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Why Choose Our Digital Products?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Every product in our collection is carefully curated to meet professional standards
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-nex-500 to-nex-700 text-white p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                    <Star className="h-10 w-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">Premium Quality</h3>
                    <p className="text-gray-600 leading-relaxed">
                      All products are tested and meet high-quality standards before being listed
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-nex-500 to-nex-700 text-white p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                    <Download className="h-10 w-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">Instant Access</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Download immediately after purchase with lifetime access to your files
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-nex-500 to-nex-700 text-white p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                    <Shield className="h-10 w-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">Commercial License</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Use our products in your commercial projects without any restrictions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Newsletter Section */}
        <section className="py-20 bg-gradient-to-br from-nex-600 via-nex-700 to-nex-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container px-4 md:px-6 mx-auto relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Stay Updated with Latest Digital Products
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Get exclusive access to new releases, special discounts, and industry insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="px-6 py-4 rounded-lg flex-1 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-lg" 
                />
                <Button className="bg-white text-nex-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-sm text-white/70">
                Join 10,000+ creators who get our weekly newsletter. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
