import { ArrowRight, CheckCircle, Shield, Smartphone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-primary to-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Illustration/Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              {/* Main Illustration Container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  
                  {/* AI + Food Illustration */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-4">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-8 h-2 bg-green-200 rounded"></div>
                        <div className="w-6 h-2 bg-yellow-200 rounded"></div>
                        <div className="w-10 h-2 bg-red-200 rounded"></div>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">AI Analysis Complete</div>
                      <div className="text-xs text-gray-500">Personalized plan ready!</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">Healthy</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="text-xs font-medium text-gray-700">🥗 Indian Meals</div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4" />
              Trusted by 10,000+ Users
            </div>

            {/* Headline */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Start Your AI-Powered{' '}
              <span className="text-yellow-300">Health Journey</span>{' '}
              Today!
            </h2>

            {/* Subtext */}
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Let NutriAI create your personalized Indian diet plan based on your health reports — affordable, local, and smart.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="group bg-white text-primary hover:bg-gray-100 font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center gap-3">
                Start Free Trial
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                View Demo
              </button>
            </div>

            {/* Support Features */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>No payment needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Works offline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>AI nutrition experts</span>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="pt-4 border-t border-white/20">
                <p className="text-white/70 text-sm">
                  <span className="font-semibold">30-second setup</span> • <span className="font-semibold">100% personalized</span> • <span className="font-semibold">₹0 upfront cost</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;