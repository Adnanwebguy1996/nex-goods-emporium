
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Enhanced Stats Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 border-b border-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Trusted by Thousands of Creators Worldwide
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join our growing community of designers, developers, and entrepreneurs who trust our premium digital products to elevate their projects
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-4 group">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Package className="h-10 w-10" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900">1,000+</div>
                <div className="text-lg font-semibold text-gray-600">Premium Products</div>
              </div>
              
              <div className="text-center space-y-4 group">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Users className="h-10 w-10" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900">50K+</div>
                <div className="text-lg font-semibold text-gray-600">Happy Customers</div>
              </div>
              
              <div className="text-center space-y-4 group">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Download className="h-10 w-10" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900">24/7</div>
                <div className="text-lg font-semibold text-gray-600">Instant Access</div>
              </div>
              
              <div className="text-center space-y-4 group">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-3xl w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Star className="h-10 w-10" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900">100%</div>
                <div className="text-lg font-semibold text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        {/* Enhanced Categories Section */}
        <section className="py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Explore Our Premium Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover professionally crafted digital assets across specialized categories, each designed to accelerate your creative projects and business growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Package;
                return (
                  <Link 
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
                      <CardContent className="p-8 text-center space-y-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-5 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto shadow-lg group-hover:scale-115 group-hover:shadow-xl transition-all duration-500 relative z-10">
                          <IconComponent className="h-10 w-10" />
                        </div>
                        <div className="space-y-3 relative z-10">
                          <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                            {category}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Professional {category.toLowerCase()} designed for modern businesses and creative professionals
                          </p>
                          <div className="flex items-center justify-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors pt-2">
                            Explore Collection <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            
            <div className="text-center mt-16">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg">
                <Link to="/categories">
                  View All Categories
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Enhanced Trust Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Why Choose NEX Digital?
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  We're committed to delivering exceptional quality and value through every digital product in our curated marketplace
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center space-y-8 group">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <Star className="h-12 w-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Premium Quality Guaranteed</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Every product undergoes rigorous quality testing and review to ensure it meets professional standards and exceeds expectations
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-8 group">
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-8 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <Download className="h-12 w-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Instant Download & Access</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Get immediate access to your purchases with lifetime downloads and regular updates to keep your assets current
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-8 group">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <Shield className="h-12 w-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Commercial License Included</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Use our products in unlimited commercial projects without restrictions or additional licensing fees
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Signup Section */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Technology background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Ready to Elevate Your Projects?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Get exclusive access to premium digital products, personalized support, and special offers from our expert team.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="px-6 py-4 rounded-xl flex-1 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20 shadow-lg text-lg border-0" 
                />
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
                  Get Started
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-6">
                Join 50,000+ satisfied customers • No spam, unsubscribe anytime • Premium support included
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
