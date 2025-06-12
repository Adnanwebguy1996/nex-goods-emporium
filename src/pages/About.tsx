
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Globe, 
  Zap, 
  Shield, 
  Star,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "15+ years experience in digital product development and marketplace strategy."
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Former design lead at major tech companies, passionate about user experience."
    },
    {
      name: "Emily Davis",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Full-stack developer with expertise in modern web technologies and scalability."
    },
    {
      name: "Alex Rodriguez",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Growth marketing expert helping creators and businesses reach their potential."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Creator-First",
      description: "We put creators and their needs at the center of everything we do, ensuring every feature serves their success."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous review to maintain our premium quality standards and customer satisfaction."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Building bridges between talented creators worldwide and businesses seeking exceptional digital solutions."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to deliver features that empower creators and delight customers."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "1000+", label: "Digital Products", icon: Target },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "Support Available", icon: Award }
  ];

  const achievements = [
    "Industry-leading customer satisfaction scores",
    "Featured in top design publications",
    "Award-winning marketplace platform",
    "Trusted by Fortune 500 companies"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by 50,000+ customers worldwide
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
                  About{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    NEX Digital
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  Empowering creators with premium digital resources. We connect talented designers 
                  and developers with businesses seeking exceptional quality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link to="/products" className="inline-flex items-center">
                      Explore Products
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    asChild
                    className="border-2 border-blue-200 hover:bg-blue-50 transition-all duration-300"
                  >
                    <a 
                      href="https://www.fiverr.com/sellers/adnanerxterm/edit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      Get in Touch
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="relative w-full h-[500px] md:h-[600px] object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                      <stat.icon className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                    {stat.number}
                  </div>
                  <div className="text-base md:text-lg text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Our Story</h2>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                  Founded in 2020 with a mission to revolutionize the digital marketplace
                </p>
              </div>
              
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div className="space-y-8">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Our journey began when our founders recognized a critical gap in the market: 
                    the lack of truly premium digital resources that could meet the demands of 
                    modern businesses and creative professionals.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Today, we're proud to be the go-to platform for thousands of premium digital 
                    products, serving a global community of creators and businesses who demand 
                    nothing but excellence.
                  </p>
                  
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                        <span className="text-lg text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-2xl blur-2xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Office workspace"
                    className="relative w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Our Values</h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                The principles that drive our commitment to excellence
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                        <value.icon className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl text-gray-900">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Meet Our Team</h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                The passionate experts behind NEX Digital Goods
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <img 
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full"></div>
                      </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl text-gray-900">{member.name}</CardTitle>
                    <p className="text-base md:text-lg text-blue-600 font-semibold">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                  Ready to work together? Let's create something amazing.
                </p>
              </div>
              
              <div className="grid gap-12 lg:grid-cols-2">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                    <Mail className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-900">Email</h3>
                      <p className="text-lg text-gray-600">hello@nexdigitalgoods.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
                    <Phone className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-900">Phone</h3>
                      <p className="text-lg text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                    <MapPin className="h-8 w-8 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-900">Address</h3>
                      <p className="text-lg text-gray-600">
                        123 Digital Street<br />
                        San Francisco, CA 94107<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="text-center pt-8">
                    <Button 
                      asChild 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <a 
                        href="https://www.fiverr.com/sellers/adnanerxterm/edit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-lg px-8 py-3"
                      >
                        Start Your Project
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-gray-900">Send us a message</CardTitle>
                    <p className="text-gray-600">We'll get back to you within 24 hours</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-semibold mb-3 block text-gray-700">Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold mb-3 block text-gray-700">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-gray-700">Subject</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-gray-700">Message</label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                        placeholder="Tell us more about your project..."
                      ></textarea>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg">
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
