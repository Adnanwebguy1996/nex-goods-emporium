
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { ShoppingCart, Download, Share, FileText, ArrowLeft } from "lucide-react";
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-16">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <Link to="/products" className="text-muted-foreground hover:text-foreground flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden border aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center">
                  <span className="text-sm font-medium bg-nex-100 text-nex-800 px-2.5 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="ml-2 text-sm font-medium bg-nex-600 text-white px-2.5 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold mt-2">{product.title}</h1>
                <p className="text-2xl font-bold mt-2 text-nex-600">${product.price.toFixed(2)}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">File Type</div>
                  <div className="font-medium">{product.fileType}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="text-sm text-muted-foreground mb-1">Size</div>
                  <div className="font-medium">{product.fileSize}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    className="flex-1 bg-nex-600 hover:bg-nex-700 text-white"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share className="mr-2 h-5 w-5" /> Share
                  </Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">What you'll get:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Download className="text-nex-600 h-5 w-5 mr-2" />
                    <span>Instant digital download</span>
                  </li>
                  <li className="flex items-center">
                    <FileText className="text-nex-600 h-5 w-5 mr-2" />
                    <span>Comprehensive documentation</span>
                  </li>
                </ul>
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
