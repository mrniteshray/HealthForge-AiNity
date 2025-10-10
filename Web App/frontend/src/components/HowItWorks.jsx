import { Upload, Brain, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "Upload Your Health Reports",
      description: "Share lab reports, medical history, or fitness data. NutriAI analyzes your health profile.",
      features: ["Lab Reports", "Medical History", "Fitness Data", "Health Goals"],
      color: "primary",
      image: "/images/how-it-works-step1.webp",
      side: "left"
    },
    {
      step: 2,
      icon: Brain,
      title: "Get Your Custom Diet & Timetable",
      description: "NutriAI creates a disease-specific, budget-friendly, Indianized meal plan tailored to your needs.",
      features: ["Disease-Specific Plans", "Budget-Friendly Meals", "Indian Cuisine", "Personalized Timetable"],
      color: "secondary",
      image: "/images/how-it-works-step2.webp",
      side: "right"
    },
    {
      step: 3,
      icon: TrendingUp,
      title: "Track Progress & Stay On Track",
      description: "Monitor your diet, get reminders, and let NutriAI adjust your plan dynamically if needed.",
      features: ["Progress Tracking", "Smart Reminders", "Dynamic Adjustments", "Weekly Reports"],
      color: "primary",
      image: "/images/how-it-works-step3.webp",
      side: "left"
    }
  ];

  const colorClasses = {
    primary: {
      bg: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    secondary: {
      bg: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      light: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200'
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Brain className="h-4 w-4" />
            AI-Powered Health Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-blue-600">NutriAI</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your health journey with our intelligent 3-step process designed for lasting results
          </p>
        </div>

        {/* Steps Container */}
        <div className="space-y-20 lg:space-y-24">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const colors = colorClasses[step.color];
            const isEven = index % 2 === 0;
            
            return (
              <div key={step.step} className="relative">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.bg} text-white font-bold text-lg shadow-lg border-4 border-white`}>
                    {step.step}
                  </div>
                </div>

                {/* Content Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  step.side === 'right' ? 'lg:grid-flow-row-dense' : ''
                }`}>
                  
                  {/* Image Side */}
                  <div className={`order-1 ${step.side === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative">
                      {/* Main Image */}
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-64 lg:h-80 object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-20`}></div>
                      </div>
                      
                      {/* Floating Elements */}
                      <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl ${colors.light} border-2 ${colors.border} flex items-center justify-center shadow-lg`}>
                        <IconComponent className={`h-10 w-10 ${colors.text}`} />
                      </div>
                      
                      {/* Pattern Background */}
                      <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl -z-10"></div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`order-2 ${step.side === 'right' ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
                    <div className="relative">
                      {/* Step Indicator */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`p-3 rounded-xl ${colors.bg} text-white shadow-lg`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <span className={`text-sm font-semibold uppercase tracking-wide ${colors.text}`}>
                          Step {step.step}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle className={`h-5 w-5 ${colors.text} flex-shrink-0`} />
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button className={`inline-flex items-center gap-2 ${colors.bg} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}>
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-20 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-full text-white shadow-lg animate-bounce">
                        <ArrowRight className="h-5 w-5 transform rotate-90" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 lg:p-12 text-white shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Start Your Health Journey?
            </h3>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of users who transformed their health with NutriAI's personalized approach
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-xl transition-all duration-300">
                Book Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;