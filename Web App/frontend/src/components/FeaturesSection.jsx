import { 
  Calendar, 
  MessageCircle, 
  ShoppingBag, 
  TrendingUp, 
  Bell, 
  Users 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Personal Care Plan",
      description: "AI generates diet and timetable based on patient health reports.",
      color: "primary"
    },
    {
      icon: MessageCircle,
      title: "Voice & Chat Bot",
      description: "Ask diet or health questions anytime.",
      color: "secondary"
    },
    {
      icon: ShoppingBag,
      title: "Smart & Dynamic Nutritions",
      description: "NutriAI adapts to Indian affordability and availability.",
      color: "primary"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor weight, nutrients, and adherence to plan.",
      color: "secondary"
    },
    {
      icon: Bell,
      title: "Reminders & Notifications",
      description: "Eat on time, drink water, do exercises.",
      color: "primary"
    },
  ];

  // Color configuration
  const colors = {
    primary: {
      bg: 'bg-blue-50',
      icon: 'bg-blue-500',
      text: 'text-blue-700'
    },
    secondary: {
      bg: 'bg-green-50',
      icon: 'bg-green-500',
      text: 'text-green-700'
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Health Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to achieve your health goals with personalized AI-powered assistance
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colorConfig = colors[feature.color];
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center p-3 rounded-lg ${colorConfig.bg} mb-4`}>
                  <IconComponent className={`h-6 w-6 ${colorConfig.text}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Indicator */}
                <div className={`mt-4 h-1 w-0 group-hover:w-full transition-all duration-300 ${feature.color === 'primary' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <button className="bg-primary/90 hover:bg-primary text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
          <p className="text-gray-500 mt-4 text-sm">
            Start your journey to better health with our AI-powered platform
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;