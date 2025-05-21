
import { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CreditCard, CheckCircle, Truck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formCompleted, setFormCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  // For demo purposes, we'll fake a completed checkout
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setFormCompleted(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="mb-6">
            <Link to="/cart" className="text-muted-foreground hover:text-foreground inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-nex-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            <div className="h-1 flex-1 mx-4 bg-gray-200">
              <div className={`h-full bg-nex-600 transition-all ${
                step >= 2 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-nex-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Confirmation</span>
            </div>
          </div>
          
          {step === 1 && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border space-y-6">
                    <h2 className="text-xl font-semibold">Billing Information</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input id="address" required placeholder="Enter your full address" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border space-y-6">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-nex-600" />
                      <h2 className="text-xl font-semibold">Payment Method</h2>
                    </div>

                    <RadioGroup defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod} className="gap-4">
                      <div className="flex items-center space-x-2 border p-4 rounded-lg">
                        <RadioGroupItem value="card" id="payment-card" />
                        <Label htmlFor="payment-card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-4 w-4" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border p-4 rounded-lg">
                        <RadioGroupItem value="cod" id="payment-cod" />
                        <Label htmlFor="payment-cod" className="flex items-center gap-2 cursor-pointer">
                          <Truck className="h-4 w-4" />
                          <span>Cash on Delivery (COD)</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required={paymentMethod === "card"} />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2 col-span-1">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" required={paymentMethod === "card"} />
                          </div>
                          <div className="space-y-2 col-span-1">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required={paymentMethod === "card"} />
                          </div>
                          <div className="space-y-2 col-span-1">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input id="zipCode" required={paymentMethod === "card"} />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Pay with cash upon delivery. Please have the exact amount ready when your order arrives.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-nex-600 hover:bg-nex-700 text-lg"
                  >
                    Complete Purchase
                  </Button>
                </form>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border h-fit">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span>2 items</span>
                    <Link to="/cart" className="text-nex-600 hover:underline text-sm">Edit</Link>
                  </div>
                  
                  <div className="space-y-2 border-b pb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$89.98</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$9.00</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total</span>
                    <span className="text-xl">$98.98</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="bg-white p-8 rounded-lg border text-center">
              <div className="flex justify-center mb-4">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank You for Your Purchase!</h2>
              <p className="text-muted-foreground mb-6">
                Your order has been received and is being processed.
              </p>
              
              <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg mb-6">
                <div className="text-left space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Order Number:</span>
                    <span>#NEX-12345</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>customer@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Payment Method:</span>
                    <span>{paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span>$98.98</span>
                  </div>
                </div>
              </div>
              
              <p className="mb-6">
                {paymentMethod === "cod" 
                  ? "You will receive an email confirmation shortly with your order details. Please have the exact payment amount ready at delivery."
                  : "You will receive an email confirmation shortly with your order details and download instructions."
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-nex-600 hover:bg-nex-700">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
                <Button variant="outline">
                  <Link to="/">Return to Home</Link>
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

export default Checkout;
