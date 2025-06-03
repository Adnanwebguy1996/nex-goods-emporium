
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
import { ArrowLeft, CreditCard, CheckCircle, Truck, Smartphone, Globe } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formCompleted, setFormCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("skrill");
  
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

                    <RadioGroup defaultValue="skrill" value={paymentMethod} onValueChange={setPaymentMethod} className="gap-4">
                      <div className="flex items-center space-x-2 border p-4 rounded-lg">
                        <RadioGroupItem value="skrill" id="payment-skrill" />
                        <Label htmlFor="payment-skrill" className="flex items-center gap-2 cursor-pointer">
                          <Globe className="h-4 w-4" />
                          <span>Skrill</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border p-4 rounded-lg">
                        <RadioGroupItem value="payoneer" id="payment-payoneer" />
                        <Label htmlFor="payment-payoneer" className="flex items-center gap-2 cursor-pointer">
                          <Globe className="h-4 w-4" />
                          <span>Payoneer</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border p-4 rounded-lg">
                        <RadioGroupItem value="easypaisa" id="payment-easypaisa" />
                        <Label htmlFor="payment-easypaisa" className="flex items-center gap-2 cursor-pointer">
                          <Smartphone className="h-4 w-4" />
                          <span>Easypaisa Manual Payment</span>
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
                    
                    {paymentMethod === "skrill" && (
                      <div className="border-2 border-blue-500 bg-blue-50 p-6 rounded-lg space-y-4">
                        <div className="flex items-center gap-2">
                          <Globe className="h-6 w-6 text-blue-600" />
                          <h3 className="font-semibold text-lg text-blue-800">Skrill Payment</h3>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed">
                          Please send your payment via <strong>Skrill</strong> to the following email address:
                        </p>

                        <div className="bg-white p-4 rounded-lg border border-blue-200 space-y-3">
                          <div className="text-sm">
                            <div className="flex items-center gap-2">
                              <span>📧</span>
                              <span className="font-medium">Skrill Email:</span>
                              <span className="font-mono">nexmarketingslotion@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-medium">Amount to Pay:</span>
                              <span className="font-bold text-blue-600">$98.98</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                          After making the payment, kindly share a screenshot of the transaction or mention the <strong>Transaction ID</strong> when contacting our support.
                        </p>

                        <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                          <p className="text-sm text-orange-800 font-medium flex items-center gap-2">
                            <span>⚠️</span>
                            Orders will only be processed after payment is confirmed.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="skrillTransactionId">Transaction ID (Required after payment)</Label>
                          <Input 
                            id="skrillTransactionId" 
                            placeholder="Enter Skrill transaction ID" 
                            required={paymentMethod === "skrill"} 
                          />
                          <p className="text-xs text-gray-600">You can update this after making the payment</p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "payoneer" && (
                      <div className="border-2 border-purple-500 bg-purple-50 p-6 rounded-lg space-y-4">
                        <div className="flex items-center gap-2">
                          <Globe className="h-6 w-6 text-purple-600" />
                          <h3 className="font-semibold text-lg text-purple-800">Payoneer Payment</h3>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed">
                          Please send your payment via <strong>Payoneer</strong> to the following email address:
                        </p>

                        <div className="bg-white p-4 rounded-lg border border-purple-200 space-y-3">
                          <div className="text-sm">
                            <div className="flex items-center gap-2">
                              <span>📧</span>
                              <span className="font-medium">Payoneer Email:</span>
                              <span className="font-mono">nexmarketingslotion@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-medium">Amount to Pay:</span>
                              <span className="font-bold text-purple-600">$98.98</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                          After making the payment, kindly share a screenshot of the transaction or mention the <strong>Transaction ID</strong> when contacting our support.
                        </p>

                        <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                          <p className="text-sm text-orange-800 font-medium flex items-center gap-2">
                            <span>⚠️</span>
                            Orders will only be processed after payment is confirmed.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="payoneerTransactionId">Transaction ID (Required after payment)</Label>
                          <Input 
                            id="payoneerTransactionId" 
                            placeholder="Enter Payoneer transaction ID" 
                            required={paymentMethod === "payoneer"} 
                          />
                          <p className="text-xs text-gray-600">You can update this after making the payment</p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "easypaisa" && (
                      <div className="border-2 border-green-500 bg-green-50 p-6 rounded-lg space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">💸</span>
                          <h3 className="font-semibold text-lg text-green-800">Manual Payment Details (Easypaisa)</h3>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed">
                          We currently do not offer online payment. Please complete your payment via <strong>Easypaisa</strong> using the details below:
                        </p>

                        <div className="bg-white p-4 rounded-lg border border-green-200 space-y-3">
                          <div className="grid grid-cols-1 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <span>📛</span>
                              <span className="font-medium">Name:</span>
                              <span>Syed Adnan Ali Shah</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>📱</span>
                              <span className="font-medium">Mobile Number:</span>
                              <span className="font-mono">0334 1225843</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>📧</span>
                              <span className="font-medium">Email:</span>
                              <span>adnan_shah670@hotmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>🏦</span>
                              <span className="font-medium">IBAN:</span>
                              <span className="font-mono">PK95TMFB0000000046244832</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Amount to Pay:</span>
                              <span className="font-bold text-green-600">PKR 9,899</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                          After making the payment, kindly share a screenshot of the transaction or mention the <strong>Order ID</strong> when contacting our support.
                        </p>

                        <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                          <p className="text-sm text-orange-800 font-medium flex items-center gap-2">
                            <span>⚠️</span>
                            Orders will only be processed after payment is confirmed.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="transactionId">Transaction ID (Required after payment)</Label>
                          <Input 
                            id="transactionId" 
                            placeholder="Enter transaction ID from receipt" 
                            required={paymentMethod === "easypaisa"} 
                          />
                          <p className="text-xs text-gray-600">You can update this after making the payment</p>
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
                    {paymentMethod === "easypaisa" ? "Confirm Order (Pay via Easypaisa)" : 
                     paymentMethod === "skrill" ? "Confirm Order (Pay via Skrill)" :
                     paymentMethod === "payoneer" ? "Confirm Order (Pay via Payoneer)" : "Complete Purchase"}
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
                    <span>
                      {paymentMethod === "cod" ? "Cash on Delivery" : 
                       paymentMethod === "easypaisa" ? "Easypaisa Manual Payment" : 
                       paymentMethod === "skrill" ? "Skrill" :
                       paymentMethod === "payoneer" ? "Payoneer" : "Unknown"}
                    </span>
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
                  : paymentMethod === "easypaisa"
                  ? "Your order is confirmed! Please complete the payment using the Easypaisa details provided and send us the transaction screenshot or Order ID for quick processing."
                  : paymentMethod === "skrill"
                  ? "Your order is confirmed! Please complete the payment via Skrill to nexmarketingslotion@gmail.com and send us the transaction screenshot or Transaction ID for quick processing."
                  : paymentMethod === "payoneer"
                  ? "Your order is confirmed! Please complete the payment via Payoneer to nexmarketingslotion@gmail.com and send us the transaction screenshot or Transaction ID for quick processing."
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
