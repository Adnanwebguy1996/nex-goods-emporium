
import { Button } from "@/components/ui/button";
import { CreditCard, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface PaymentButtonProps {
  productTitle: string;
  price: number;
  className?: string;
}

const PaymentButton = ({ productTitle, price, className }: PaymentButtonProps) => {
  const handlePayment = () => {
    // In a real app, this would integrate with Stripe or another payment processor
    // For now, we'll show instructions for manual payment
    toast.success("Redirecting to payment...", {
      description: "You'll be redirected to complete your purchase securely."
    });
    
    // Simulate payment redirect - replace with actual payment integration
    const paymentUrl = `https://www.fiverr.com/sellers/adnanerxterm/edit?product=${encodeURIComponent(productTitle)}&price=${price}`;
    window.open(paymentUrl, '_blank');
  };

  return (
    <Button 
      onClick={handlePayment}
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold ${className}`}
      size="lg"
    >
      <CreditCard className="mr-2 h-5 w-5" />
      Pay ${price.toFixed(2)}
      <ExternalLink className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default PaymentButton;
