import { 
  Smartphone, 
  Mail, 
  MapPin, 
  Phone, 
  Heart,
  ArrowRight
} from 'lucide-react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Health Forge</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your Smart Indian Diet Coach. AI-powered health plans tailored for Indian lifestyles and local ingredients.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm">Made with love in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Features', 'How It Works', 'Testimonials'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact & Support</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="mailto:support@healthforge.in" 
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  support@healthforge.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-gray-300">Nashik, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href="tel:+919000012345" 
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                >
                  +91 90000 12345
                </a>
              </div>
            </div>
            
            {/* Additional Links */}
            <div className="mt-6 space-y-2">
              <a href="#" className="block text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
                Terms & Conditions
              </a>
              <a href="#" className="block text-gray-300 hover:text-primary transition-colors duration-300 text-sm">
                FAQs
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Get AI health tips, new features, and diet insights delivered to your inbox.
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
                />
                <button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-gray-400 text-xs">
                No spam ever. Unsubscribe anytime.
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { name: 'Instagram', icon: '📷', color: 'hover:text-pink-400' },
                  { name: 'LinkedIn', icon: '💼', color: 'hover:text-blue-400' },
                  { name: 'Twitter', icon: '🐦', color: 'hover:text-blue-300' },
                  { name: 'YouTube', icon: '▶️', color: 'hover:text-red-400' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 transform hover:scale-110 hover:bg-gray-700`}
                    title={social.name}
                  >
                    <span className="text-sm">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} <span className="text-primary font-semibold">Health Forge</span>. All rights reserved.
            </div>
            
            {/* Health Forge Brand */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Powered by</span>
              <span className="text-secondary font-semibold">Health Forge</span>
            </div>
            
            {/* Additional Links */}
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;