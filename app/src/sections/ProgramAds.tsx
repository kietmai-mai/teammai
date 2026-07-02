import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, Zap, Heart, Award } from 'lucide-react';

const programAds = [
  {
    id: 1,
    image: '/preapproval ad1.jpg',
    title: 'Things to Avoid',
    subtitle: 'During Your Mortgage Process',
    description: 'Essential tips to ensure a smooth loan approval process.',
    icon: Shield,
    color: 'bg-amber-500',
  },
  {
    id: 2,
    image: '/preapproval ad 2.jpg',
    title: 'Refinance Success',
    subtitle: 'Save on Your Monthly Payments',
    description: 'See how much you could save with our refinance programs.',
    icon: Zap,
    color: 'bg-blue-500',
  },
  {
    id: 3,
    image: '/preapproval ad 3.jpg',
    title: 'Physician Mortgage',
    subtitle: '100% Doctor Financing',
    description: 'Special programs for medical professionals.',
    icon: Heart,
    color: 'bg-green-500',
  },
  {
    id: 4,
    image: '/preapproval ad 4.jpg',
    title: 'Client Testimonials',
    subtitle: 'What Our Clients Say',
    description: 'Real reviews from satisfied homeowners.',
    icon: Award,
    color: 'bg-purple-500',
  },
  {
    id: 5,
    image: '/preapproval ad 5.jpg',
    title: '5-Star Service',
    subtitle: 'Excellence in Every Transaction',
    description: 'Our commitment to exceptional customer service.',
    icon: Sparkles,
    color: 'bg-gold',
  },
  {
    id: 6,
    image: '/preapproval ad 6.jpg',
    title: 'First-Time Buyers',
    subtitle: 'Your Path to Homeownership',
    description: 'Special guidance for first-time homebuyers.',
    icon: Heart,
    color: 'bg-rose-500',
  },
];

export default function ProgramAds() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resources"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1A3A52 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold font-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Special Offers
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-navy mb-4">
            Featured <span className="text-gradient-gold">Programs</span>
          </h2>
          <p className="text-navy/70 max-w-2xl mx-auto text-lg">
            Discover our exclusive mortgage programs designed to help you achieve 
            your homeownership dreams with ease and confidence.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programAds.map((ad, index) => (
            <div
              key={ad.id}
              className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${index === 0 || index === 3 ? 'md:row-span-2' : ''}`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredId(ad.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div
                className={`relative overflow-hidden ${
                  index === 0 || index === 3 ? 'h-80 md:h-full' : 'h-64'
                }`}
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === ad.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent transition-opacity duration-500 ${
                    hoveredId === ad.id ? 'opacity-90' : 'opacity-70'
                  }`}
                />

                {/* Icon Badge */}
                <div
                  className={`absolute top-4 left-4 w-12 h-12 ${ad.color} rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 ${
                    hoveredId === ad.id ? 'scale-110 rotate-6' : ''
                  }`}
                >
                  <ad.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold text-sm font-medium mb-2 block">
                    {ad.subtitle}
                  </span>
                  <h3 className="font-display text-2xl text-white font-semibold mb-2">
                    {ad.title}
                  </h3>
                  <p
                    className={`text-white/80 text-sm mb-4 transition-all duration-500 ${
                      hoveredId === ad.id
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {ad.description}
                  </p>
                  <a
                    href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-white font-semibold transition-all duration-300 ${
                      hoveredId === ad.id
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 bg-gradient-to-r from-navy to-navy-light rounded-2xl p-8 md:p-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="font-display text-3xl text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Take the first step towards your dream home. Our team is ready to guide 
            you through the mortgage process with personalized service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-white font-accent font-semibold px-8 py-4 rounded-lg hover:bg-gold-light transition-colors inline-flex items-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:814-386-7005"
              className="bg-white/10 text-white font-accent font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors inline-flex items-center gap-2 border border-white/30"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
