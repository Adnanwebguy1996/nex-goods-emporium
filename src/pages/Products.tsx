import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/data";
import { productService } from "@/lib/firebase/productService";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Star, Filter, Loader2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { Product } from "@/lib/data";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [sortOption, setSortOption] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Load products from Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const firebaseProducts = await productService.getAllProducts();
        setProducts(firebaseProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Apply filtering and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by category if selected
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOption, searchQuery]);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory) {
      searchParams.set("category", selectedCategory);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  }, [selectedCategory, setSearchParams]);

  // Handle category selection
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 text-white py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium Digital Products</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover thousands of high-quality digital assets crafted by professional designers and developers
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Premium Quality</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span>{filteredProducts.length} Products Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for templates, UI kits, icons, and more..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-14 pl-6 pr-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg"
              />
            </div>
          </div>
          
          {/* Enhanced Filters and Sort */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Filter className="h-4 w-4" />
                  <span>Filter by category:</span>
                </div>
                <Button
                  variant={!selectedCategory ? "default" : "outline"}
                  onClick={() => handleCategoryChange(null)}
                  size="sm"
                  className={!selectedCategory ? "bg-blue-600 hover:bg-blue-700 shadow-md" : "hover:bg-gray-50"}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => handleCategoryChange(category)}
                    size="sm"
                    className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700 shadow-md" : "hover:bg-gray-50"}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-w-[160px] border-2 hover:bg-gray-50">
                    Sort by <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem 
                    onClick={() => setSortOption("featured")}
                    className="flex justify-between"
                  >
                    <span>Featured First</span>
                    {sortOption === "featured" && <Check className="h-4 w-4 text-blue-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSortOption("price-asc")}
                    className="flex justify-between"
                  >
                    <span>Price: Low to High</span>
                    {sortOption === "price-asc" && <Check className="h-4 w-4 text-blue-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSortOption("price-desc")}
                    className="flex justify-between"
                  >
                    <span>Price: High to Low</span>
                    {sortOption === "price-desc" && <Check className="h-4 w-4 text-blue-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSortOption("name-asc")}
                    className="flex justify-between"
                  >
                    <span>Name: A to Z</span>
                    {sortOption === "name-asc" && <Check className="h-4 w-4 text-blue-600" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSortOption("name-desc")}
                    className="flex justify-between"
                  >
                    <span>Name: Z to A</span>
                    {sortOption === "name-desc" && <Check className="h-4 w-4 text-blue-600" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <div className="max-w-md mx-auto space-y-6">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
                  <Filter className="h-12 w-12 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">No products found</h3>
                  <p className="text-gray-600">
                    We couldn't find any products matching your criteria
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-6 border-2 hover:bg-gray-50"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
