
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-nex-600">NEX</span>
              <span className="ml-1 text-lg font-medium">Digital Goods</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium digital products marketplace for creators and developers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Templates" className="text-sm text-muted-foreground hover:text-foreground">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/products?category=UI Kits" className="text-sm text-muted-foreground hover:text-foreground">
                  UI Kits
                </Link>
              </li>
              <li>
                <Link to="/products?category=Icons" className="text-sm text-muted-foreground hover:text-foreground">
                  Icons
                </Link>
              </li>
              <li>
                <Link to="/products?category=Ebooks" className="text-sm text-muted-foreground hover:text-foreground">
                  Ebooks
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/licenses" className="text-sm text-muted-foreground hover:text-foreground">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NEX Digital Goods. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              Instagram
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
