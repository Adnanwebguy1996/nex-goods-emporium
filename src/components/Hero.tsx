
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Premium Digital Products for Creators
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover high-quality templates, UI kits, icons, and other digital resources to elevate your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                asChild
                className="bg-nex-600 hover:bg-nex-700 text-white font-medium rounded-lg"
                size="lg"
              >
                <Link to="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                asChild
              >
                <Link to="/categories">
                  View Categories
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-br from-nex-400 to-nex-600 rounded-2xl flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">NEX Digital Goods</h3>
                <p className="text-white/80">Premium marketplace for digital products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
