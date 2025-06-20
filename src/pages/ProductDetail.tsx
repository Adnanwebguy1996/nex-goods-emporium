
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { ShoppingCart, Download, Share, FileText, ArrowLeft, Star, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.title} has been added to your cart.`,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 py-20">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Product Not Found</h1>
                <p className="text-xl text-gray-600">The product you're looking for doesn't exist or has been removed from our catalog.</p>
              </div>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                <Link to="/products" className="inline-flex items-center">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Back to Products
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="container px-4 md:px-6">
          <Link to="/products" className="text-blue-600 hover:text-blue-700 flex items-center font-medium transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Product Image */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 aspect-square shadow-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2 fill-current" />
                  <div className="font-semibold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <Download className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">1,200+</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <Shield className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Licensed</div>
                  <div className="text-sm text-gray-600">Commercial</div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{product.title}</h1>
                    <div className="flex items-center gap-4">
                      <p className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">4.9 (127 reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">Description</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-200">
                      <div className="text-sm font-medium text-blue-700 mb-1">File Type</div>
                      <div className="font-bold text-gray-900">{product.fileType}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl border border-green-200">
                      <div className="text-sm font-medium text-green-700 mb-1">File Size</div>
                      <div className="font-bold text-gray-900">{product.fileSize}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                      </Button>
                      <Button variant="outline" className="flex-1 border-2 border-gray-300 hover:bg-gray-50 py-4 text-lg font-semibold">
                        <Share className="mr-2 h-5 w-5" /> Share
                      </Button>
                    </div>
                    
                    <Button 
                      asChild 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 py-4 text-lg font-semibold"
                    >
                      <a 
                        href="https://www.fiverr.com/sellers/adnanerxterm/edit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        Need Custom Work?
                        <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="font-bold text-xl text-gray-900 mb-6">What's Included:</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <Download className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Instant Digital Download</div>
                      <div className="text-sm text-gray-600">Get immediate access after purchase</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <FileText className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Complete Documentation</div>
                      <div className="text-sm text-gray-600">Step-by-step setup and usage guide</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="bg-purple-500 p-2 rounded-lg">
                      <Shield className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Commercial License</div>
                      <div className="text-sm text-gray-600">Use in unlimited commercial projects</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <div className="bg-orange-500 p-2 rounded-lg">
                      <Zap className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Lifetime Updates</div>
                      <div className="text-sm text-gray-600">Free updates and improvements</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
