import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Working Professional | Mumbai",
      feedback: "NutriAI helped me balance my diet with local ingredients — no fancy food, just smart planning. I feel more energetic every day!",
      rating: 5,
      image: "https://media.istockphoto.com/id/1287869774/photo/portrait-of-a-smiling-woman-of-indian-ethnicity-against-a-blue-wall.jpg?s=612x612&w=0&k=20&c=5UFmzWUYgipCXeEWAr6f6UpDPoDnZSIdtxJkbpp8-4M="
    },
    {
      id: 2,
      name: "Rohit Verma",
      role: "Type-2 Diabetic | Pune",
      feedback: "The AI-generated plan was so accurate! It considered my blood reports and even gave me affordable meal ideas.",
      rating: 5,
      image: "https://www.shutterstock.com/image-photo/portrait-man-looking-away-folding-260nw-2451558735.jpg"
    },
    {
      id: 3,
      name: "Aisha Khan",
      role: "Homemaker | Lucknow",
      feedback: "I loved the voice chatbot! It's like talking to my personal nutritionist in Hindi. Super easy to follow!",
      rating: 4,
      image: "https://www.shutterstock.com/image-photo/portrait-young-indian-man-against-260nw-1870946140.jpg"
    },
    {
      id: 4,
      name: "Arjun Patel",
      role: "Fitness Enthusiast | Nashik",
      feedback: "Progress tracking is gold! I can see how my nutrient intake improves weekly — truly Indian-focused and practical.",
      rating: 5,
      image: "https://www.shutterstock.com/image-photo/happy-confident-wealthy-young-indian-260nw-2197444545.jpg"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? "fill-primary text-primary" 
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Quote className="h-4 w-4" />
            Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-primary">Users Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how NutriAI is transforming lives with personalized, affordable health solutions
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Quote className="h-4 w-4 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial.rating)}
                <span className="text-sm text-gray-500 ml-2">{testimonial.rating}.0</span>
              </div>

              {/* Feedback */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.feedback}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-secondary">{testimonial.role}</p>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/5 to-secondary/5 rounded-tl-2xl -z-10"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Meals Planned</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;