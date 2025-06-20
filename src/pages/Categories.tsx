
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/lib/data";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Palette, Code, Layers, Plug, Zap, ArrowRight, Star, Download, Shield } from "lucide-react";

// Icon mapping for categories with enhanced descriptions
const categoryData = {
  "Templates": {
    icon: Code,
    description: "Professional website templates, landing pages, and design layouts ready to customize for your business needs.",
    features: ["Responsive Design", "Modern UI/UX", "Easy Customization", "Cross-browser Compatible"],
    productCount: 150,
    color: "bg-blue-500"
  },
  "UI Kits": {
    icon: Layers,
    description: "Complete user interface component libraries and design systems for faster development and consistent branding.",
    features: ["Component Libraries", "Design Systems", "Figma Files", "React Components"],
    productCount: 85,
    color: "bg-purple-500"
  },
  "Icons": {
    icon: Palette,
    description: "Premium icon collections in multiple formats including SVG, PNG, and vector files for all your design projects.",
    features: ["Multiple Formats", "Scalable Vectors", "Web Optimized", "Commercial License"],
    productCount: 200,
    color: "bg-pink-500"
  },
  "Scripts": {
    icon: Code,
    description: "Ready-to-use JavaScript libraries, PHP scripts, and automation tools to enhance your web applications.",
    features: ["JavaScript Libraries", "PHP Scripts", "API Integrations", "Documentation"],
    productCount: 120,
    color: "bg-green-500"
  },
  "Plugins": {
    icon: Plug,
    description: "WordPress plugins, browser extensions, and third-party integrations to extend your platform's functionality.",
    features: ["WordPress Plugins", "Browser Extensions", "CMS Integrations", "Easy Installation"],
    productCount: 95,
    color: "bg-orange-500"
  },
  "Elementor": {
    icon: Zap,
    description: "Elementor Pro templates, widgets, and page builder assets for creating stunning WordPress websites with ease.",
    features: ["Pro Templates", "Custom Widgets", "Page Builder", "Mobile Responsive"],
    productCount: 75,
    color: "bg-red-500"
  },
  "Divi website assets": {
    icon: Package,
    description: "Divi theme layouts, modules, and child themes designed to work seamlessly with Elegant Themes' Divi builder.",
    features: ["Divi Layouts", "Custom Modules", "Child Themes", "Pre-built Pages"],
    productCount: 60,
    color: "bg-indigo-500"
  },
};

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 text-white py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Technology background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Digital Product Categories
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed">
                Explore our comprehensive collection of premium digital assets across specialized categories, crafted by industry professionals
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-base">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center space-x-3 hover:bg-white/25 transition-colors">
                  <Star className="h-5 w-5" />
                  <span>Premium Quality Guaranteed</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center space-x-3 hover:bg-white/25 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>Instant Download</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center space-x-3 hover:bg-white/25 transition-colors">
                  <Shield className="h-5 w-5" />
                  <span>Commercial License</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 border-b border-gray-200">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
              <div className="space-y-4 group">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Package className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900">7</div>
                <div className="text-lg font-semibold text-gray-600">Specialized Categories</div>
              </div>
              <div className="space-y-4 group">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Star className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900">785+</div>
                <div className="text-lg font-semibold text-gray-600">Premium Products</div>
              </div>
              <div className="space-y-4 group">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Download className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900">50K+</div>
                <div className="text-lg font-semibold text-gray-600">Happy Customers</div>
              </div>
              <div className="space-y-4 group">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900">99%</div>
                <div className="text-lg font-semibold text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Categories Grid */}
        <section className="py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Explore Our Categories</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Each category features hand-picked, professional-grade digital assets designed to accelerate your creative workflow and business success
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
              {categories.map((category) => {
                const data = categoryData[category as keyof typeof categoryData];
                const IconComponent = data.icon;
                
                return (
                  <Card key={category} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg">
                    <CardHeader className="pb-8 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-6">
                          <div className={`${data.color} p-5 rounded-2xl text-white group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                            <IconComponent className="h-10 w-10" />
                          </div>
                          <div className="space-y-3">
                            <CardTitle className="text-2xl font-bold text-gray-900">{category}</CardTitle>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <Package className="h-4 w-4" />
                              <span className="font-semibold">{data.productCount} premium products</span>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="font-semibold">4.9/5</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-8 pb-8">
                      <CardDescription className="text-gray-600 leading-relaxed text-lg">
                        {data.description}
                      </CardDescription>
                      
                      <div className="space-y-6">
                        <h4 className="font-bold text-gray-900 text-lg">What's Included:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {data.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0"></div>
                              <span className="font-medium text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-6">
                        <Link to={`/products?category=${encodeURIComponent(category)}`}>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500">
                            Explore {category}
                            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Why Choose Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Why Choose NEX Digital?</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  We're committed to delivering exceptional quality and unmatched value through every product in our curated marketplace
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center space-y-8 group">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <Star className="h-12 w-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Premium Quality Guarantee</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Every product undergoes rigorous testing and quality assurance to ensure professional standards and customer satisfaction
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-8 group">
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-8 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <Download className="h-12 w-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Instant Access & Updates</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Download immediately after purchase with lifetime access and regular updates to keep your digital assets current
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-8 group">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <Shield className="h-12 w-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">Full Commercial License</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Use our products in unlimited commercial projects without restrictions, additional fees, or attribution requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Browse Products CTA Section */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Ready to Transform Your Projects?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who have elevated their creative work with our premium digital products and expert support
              </p>
              <div className="flex justify-center pt-4">
                <Button asChild size="lg" variant="outline" className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 px-8 py-4 text-lg font-bold">
                  <Link to="/products" className="inline-flex items-center">
                    Browse All Products
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
