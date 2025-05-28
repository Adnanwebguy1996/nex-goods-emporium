
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
  Phone
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
      description: "We put creators and their needs at the center of everything we do."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every product is carefully reviewed to ensure premium quality standards."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Building a worldwide community of creators, designers, and developers."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly evolving our platform with cutting-edge features and tools."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "1000+", label: "Digital Products", icon: Target },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "Support Available", icon: Award }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-nex-50 to-nex-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  About NEX Digital Goods
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  We're passionate about empowering creators with premium digital resources. 
                  Our marketplace connects talented designers and developers with businesses 
                  and individuals who need high-quality digital products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-nex-600 hover:bg-nex-700">
                    <Link to="/products">Explore Products</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="#contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-nex-600/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <stat.icon className="h-8 w-8 md:h-10 md:w-10 text-nex-600" />
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-nex-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Our Story</h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Founded in 2020, NEX Digital Goods started with a simple mission
                </p>
              </div>
              
              <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Our journey began when our founders, frustrated with the lack of quality 
                    digital resources available online, decided to create a marketplace that 
                    would truly serve the creative community.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Today, we're proud to host thousands of premium digital products from 
                    talented creators worldwide, helping businesses and individuals bring 
                    their visions to life with professional-grade resources.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    We believe in the power of great design and development to transform 
                    ideas into reality, and we're committed to making these tools accessible 
                    to everyone.
                  </p>
                </div>
                <div className="order-first lg:order-last">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Office workspace"
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <value.icon className="h-10 w-10 md:h-12 md:w-12 text-nex-600" />
                    </div>
                    <CardTitle className="text-lg md:text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-base text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate people behind NEX Digital Goods
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg md:text-xl">{member.name}</CardTitle>
                    <p className="text-sm md:text-base text-nex-600 font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-base text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Have questions? We'd love to hear from you.
                </p>
              </div>
              
              <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-nex-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">hello@nexdigitalgoods.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-nex-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-nex-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Address</h3>
                      <p className="text-gray-600">
                        123 Digital Street<br />
                        San Francisco, CA 94107<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nex-600"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nex-600"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nex-600"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <textarea 
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nex-600"
                        placeholder="Tell us more about your inquiry..."
                      ></textarea>
                    </div>
                    <Button className="w-full bg-nex-600 hover:bg-nex-700">
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
