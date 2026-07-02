import { useRef, useState, useEffect } from 'react';
import {
  MapPin,
  Heart,
  Bell,
  TrendingUp,
  Search,
  Home,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Save Favorites',
    description: 'Bookmark properties you love and compare them side by side.',
  },
  {
    icon: TrendingUp,
    title: 'Price Tracking',
    description: 'Get notified when saved properties change in price.',
  },
  {
    icon: Bell,
    title: 'Market Alerts',
    description: 'Stay informed about new listings in your target areas.',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Filter by price, location, size, and more.',
  },
];

const sampleProperties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    price: '$485,000',
    address: '123 Main Street',
    city: 'Philadelphia, PA 19147',
    beds: 3,
    baths: 2,
    sqft: 1850,
    status: 'For Sale',
    isNew: true,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    price: '$625,000',
    address: '456 Oak Avenue',
    city: 'Philadelphia, PA 19103',
    beds: 4,
    baths: 3,
    sqft: 2400,
    status: 'For Sale',
    isNew: false,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    price: '$395,000',
    address: '789 Pine Road',
    city: 'Philadelphia, PA 19122',
    beds: 2,
    baths: 2,
    sqft: 1200,
    status: 'Price Drop',
    isNew: false,
  },
];

export default function PropertyTracker() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProperty, setActiveProperty] = useState(0);
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

  // Auto-rotate properties
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProperty((prev) => (prev + 1) % sampleProperties.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tracker"
      className="py-24 bg-gradient-to-b from-white to-cream relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="inline-block text-gold font-accent font-semibold text-sm uppercase tracking-wider mb-3">
              Property Tools
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-navy mb-6">
              Track Your <span className="text-gradient-gold">Dream Property</span>
            </h2>
            <p className="text-navy/70 text-lg mb-8 leading-relaxed">
              Save and monitor properties that catch your eye. Our property tracking 
              tool helps you stay organized and informed throughout your home search 
              journey.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-start gap-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">{feature.title}</h4>
                    <p className="text-sm text-navy/60">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 group"
            >
              Start Tracking
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Side - Property Cards */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Map Background */}
            <div className="absolute inset-0 bg-navy/5 rounded-3xl transform rotate-3" />
            <div className="absolute inset-0 bg-navy/5 rounded-3xl transform -rotate-2" />

            {/* Property Card Stack */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Map Header */}
              <div className="bg-navy p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span className="text-white font-medium">Philadelphia, PA</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-gold rounded-full animate-pulse" />
                  <span className="text-white/70 text-sm">Live Updates</span>
                </div>
              </div>

              {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                {sampleProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className={`absolute inset-0 transition-all duration-700 ${
                      activeProperty === index
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-110'
                    }`}
                  >
                    <img
                      src={property.image}
                      alt={property.address}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  </div>
                ))}

                {/* Property Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {sampleProperties[activeProperty].isNew && (
                    <span className="bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                      New Listing
                    </span>
                  )}
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      sampleProperties[activeProperty].status === 'Price Drop'
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-navy'
                    }`}
                  >
                    {sampleProperties[activeProperty].status}
                  </span>
                </div>

                {/* Heart Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-navy" />
                </button>

                {/* Property Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-2xl font-display font-bold mb-1">
                    {sampleProperties[activeProperty].price}
                  </p>
                  <p className="text-white/90 font-medium">
                    {sampleProperties[activeProperty].address}
                  </p>
                  <p className="text-white/70 text-sm">
                    {sampleProperties[activeProperty].city}
                  </p>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-navy/50" />
                    <span className="text-sm text-navy/70">
                      {sampleProperties[activeProperty].beds} beds
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-navy/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    <span className="text-sm text-navy/70">
                      {sampleProperties[activeProperty].baths} baths
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-navy/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                    <span className="text-sm text-navy/70">
                      {sampleProperties[activeProperty].sqft.toLocaleString()} sqft
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 flex gap-3">
                <button className="flex-1 bg-gold text-white font-semibold py-3 rounded-lg hover:bg-gold-dark transition-colors">
                  View Details
                </button>
                <button className="flex-1 border-2 border-navy text-navy font-semibold py-3 rounded-lg hover:bg-navy hover:text-white transition-colors">
                  Schedule Tour
                </button>
              </div>

              {/* Property Indicators */}
              <div className="flex justify-center gap-2 pb-4">
                {sampleProperties.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProperty(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeProperty === index
                        ? 'w-6 bg-gold'
                        : 'bg-navy/20 hover:bg-navy/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-navy/60">Market Trend</p>
                  <p className="font-semibold text-navy">+5.2% this month</p>
                </div>
              </div>
            </div>

            {/* Floating Alert Card */}
            <div
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float"
              style={{ animationDelay: '2s' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-navy/60">New Alert</p>
                  <p className="font-semibold text-navy">3 new listings</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div
          className={`mt-20 grid md:grid-cols-3 gap-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            {
              icon: CheckCircle,
              title: 'Pre-Approval Ready',
              description: 'Get pre-approved quickly to strengthen your offers.',
            },
            {
              icon: Star,
              title: 'Expert Guidance',
              description: 'Work with experienced loan officers every step.',
            },
            {
              icon: DollarSign,
              title: 'Competitive Rates',
              description: 'Access the best mortgage rates available.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <h4 className="font-display font-semibold text-navy text-lg mb-2">
                {item.title}
              </h4>
              <p className="text-navy/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
