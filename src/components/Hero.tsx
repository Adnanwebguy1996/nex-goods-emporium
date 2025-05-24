
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Zap, Shield } from "lucide-react";

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
            
            {/* Feature highlights */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-nex-600" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-nex-600" />
                <span>Ready to Use</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-nex-600" />
                <span>Premium Quality</span>
              </div>
            </div>
            
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
            <div className="relative w-full h-[300px] md:h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Woman working on laptop - Digital workspace"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-nex-600/20 to-nex-800/20 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">NEX Digital Goods</h3>
                  <p className="text-white/90 drop-shadow">Premium marketplace for digital products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
