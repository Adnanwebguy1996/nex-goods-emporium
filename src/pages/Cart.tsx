
import { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { type CartItem } from "@/lib/data";

const Cart = () => {
  // For demo, let's show a couple of products in the cart
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { ...products[0], quantity: 1 },
    { ...products[2], quantity: 1 },
  ]);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax for demo
  const total = subtotal + tax;
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-white">
                    <div className="w-20 h-20 rounded overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <Link 
                        to={`/products/${item.id}`} 
                        className="font-medium hover:text-nex-600 transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center">
                          <button 
                            className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 h-8 border-y text-center" 
                          />
                          <button 
                            className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-4">
                  <Link to="/products" className="text-nex-600 hover:text-nex-700 inline-flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => setCartItems([])}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg border h-fit">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total</span>
                    <span className="text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Input placeholder="Discount code" />
                  <Button variant="outline" className="w-full">Apply</Button>
                  <Button 
                    className="w-full bg-nex-600 hover:bg-nex-700"
                    asChild
                  >
                    <Link to="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="flex justify-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button 
                className="mt-4 bg-nex-600 hover:bg-nex-700"
                asChild
              >
                <Link to="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
