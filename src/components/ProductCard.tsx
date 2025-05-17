
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { type Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          {product.featured && (
            <div className="absolute top-0 right-0 bg-nex-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
              Featured
            </div>
          )}
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <h3 className="font-semibold text-lg line-clamp-2 mt-1">{product.title}</h3>
            </div>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        </div>
        <Button size="sm" className="bg-nex-600 hover:bg-nex-700">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
