
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/lib/data";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Palette, Code, Layers, Plug, Zap, ArrowRight, Star } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-nex-600 via-nex-700 to-nex-800 text-white py-20 md:py-28">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Digital Product Categories
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Explore our comprehensive collection of digital assets across multiple niches
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-white/25 transition-colors">
                  <Star className="h-4 w-4" />
                  <span>Premium Quality</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-white/25 transition-colors">
                  <Package className="h-4 w-4" />
                  <span>Instant Download</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-white/25 transition-colors">
                  <Zap className="h-4 w-4" />
                  <span>Commercial License</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-b border-gray-200">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-nex-600">7</div>
                <div className="text-sm text-gray-600 font-medium">Categories</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-nex-600">785+</div>
                <div className="text-sm text-gray-600 font-medium">Digital Products</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-nex-600">50K+</div>
                <div className="text-sm text-gray-600 font-medium">Downloads</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-nex-600">99%</div>
                <div className="text-sm text-gray-600 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Browse Our Categories</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover the perfect digital assets for your next project across our specialized categories
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {categories.map((category) => {
                const data = categoryData[category as keyof typeof categoryData];
                const IconComponent = data.icon;
                
                return (
                  <Card key={category} className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white border-0 shadow-lg">
                    <CardHeader className="pb-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-6">
                          <div className={`${data.color} p-4 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold text-gray-900">{category}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Package className="h-4 w-4" />
                              <span className="font-medium">{data.productCount} products</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-8 pb-8">
                      <CardDescription className="text-gray-600 leading-relaxed text-base">
                        {data.description}
                      </CardDescription>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 text-lg">Key Features:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {data.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
                              <div className="w-2 h-2 bg-nex-600 rounded-full flex-shrink-0"></div>
                              <span className="font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-6">
                        <Link to={`/products?category=${encodeURIComponent(category)}`}>
                          <Button className="w-full bg-nex-600 hover:bg-nex-700 group py-6 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                            Browse {category}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
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

        {/* Why Choose Our Categories Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Why Choose Our Digital Products?</h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                    <Zap className="h-10 w-10" />
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
                    <Package className="h-10 w-10" />
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-nex-600 via-nex-700 to-nex-800 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Ready to Find Your Perfect Digital Asset?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Browse through our extensive collection and find exactly what you need for your next project
              </p>
              <div className="pt-4">
                <Link to="/products">
                  <Button size="lg" variant="outline" className="bg-white text-nex-600 hover:bg-gray-100 py-6 px-8 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    View All Products
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
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
