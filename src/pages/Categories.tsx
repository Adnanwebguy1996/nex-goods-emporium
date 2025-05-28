
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-nex-600 via-nex-700 to-nex-800 text-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Digital Product Categories
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Explore our comprehensive collection of digital assets across multiple niches
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="inline h-4 w-4 mr-2" />
                  Premium Quality
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Package className="inline h-4 w-4 mr-2" />
                  Instant Download
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Zap className="inline h-4 w-4 mr-2" />
                  Commercial License
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gray-50 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-nex-600 mb-2">7</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-nex-600 mb-2">785+</div>
                <div className="text-sm text-gray-600">Digital Products</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-nex-600 mb-2">50K+</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-nex-600 mb-2">99%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse Our Categories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the perfect digital assets for your next project across our specialized categories
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {categories.map((category) => {
                const data = categoryData[category as keyof typeof categoryData];
                const IconComponent = data.icon;
                
                return (
                  <Card key={category} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`${data.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-1">{category}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Package className="h-4 w-4" />
                              {data.productCount} products
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {data.description}
                      </CardDescription>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-800">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {data.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-nex-600 rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Link to={`/products?category=${encodeURIComponent(category)}`}>
                        <Button className="w-full bg-nex-600 hover:bg-nex-700 group">
                          Browse {category}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Our Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Digital Products?</h2>
                <p className="text-lg text-gray-600">
                  Every product in our collection is carefully curated to meet professional standards
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-nex-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                  <p className="text-gray-600">
                    All products are tested and meet high-quality standards before being listed
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-nex-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
                  <p className="text-gray-600">
                    Download immediately after purchase with lifetime access to your files
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-nex-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Commercial License</h3>
                  <p className="text-gray-600">
                    Use our products in your commercial projects without any restrictions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-nex-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Perfect Digital Asset?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Browse through our extensive collection and find exactly what you need for your next project
              </p>
              <Link to="/products">
                <Button size="lg" variant="outline" className="bg-white text-nex-600 hover:bg-gray-100">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
