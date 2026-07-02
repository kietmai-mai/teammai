import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Home, Calendar, CheckCircle } from 'lucide-react';

// Deal data based on the uploaded images
const deals = [
  {
    id: 1,
    image: '/deal1.jpg',
    title: 'Just Funded - Philadelphia Rowhome',
    location: 'Philadelphia, PA 19148',
    type: 'First-Time Homebuyer',
    amount: '$425,000',
    date: 'March 2025',
    description: 'Beautifully renovated rowhome funded for a first-time homebuyer.',
  },
  {
    id: 2,
    image: '/deal2.jpg',
    title: 'Cash Out Refi Success',
    location: 'Philadelphia, PA',
    type: 'Cash-Out Refinance',
    amount: '$380,000',
    date: 'February 2025',
    description: 'No tax return program - helped client access equity.',
  },
  {
    id: 3,
    image: '/deal3.jpg',
    title: 'Client Testimonial - First Home',
    location: 'Delaware County, PA',
    type: 'Conventional Loan',
    amount: '$350,000',
    date: 'February 2025',
    description: '5-star review from a happy first-time homeowner!',
  },
  {
    id: 4,
    image: '/deal4.jpg',
    title: 'Clear to Close - 13 Days!',
    location: 'Montgomery County, PA',
    type: 'Conventional Loan',
    amount: '$520,000',
    date: 'February 2025',
    description: 'Saved the transaction - client almost lost EMD.',
  },
  {
    id: 5,
    image: '/deal5.jpg',
    title: 'First-Time Homebuyer Success',
    location: 'Philadelphia, PA 19122',
    type: 'FHA Loan',
    amount: '$295,000',
    date: 'January 2025',
    description: 'Modern townhouse closed and funded for young professional.',
  },
  {
    id: 6,
    image: '/deal6.jpg',
    title: 'Closed & Funded - Family Home',
    location: 'Bucks County, PA',
    type: 'VA Loan',
    amount: '$485,000',
    date: 'January 2025',
    description: 'Helped a veteran family achieve their homeownership dream.',
  },
];

export default function DealsSummary() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-cream relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold font-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Success Stories
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-navy mb-4">
            Recent Deals <span className="text-gradient-gold">Closed</span>
          </h2>
          <p className="text-navy/70 max-w-2xl mx-auto text-lg">
            Helping families achieve their homeownership dreams across Pennsylvania. 
            Here are some of our recent success stories.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'opacity-100 hover:bg-gold hover:text-white'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'opacity-100 hover:bg-gold hover:text-white'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {deals.map((deal, index) => (
              <div
                key={deal.id}
                className={`flex-shrink-0 w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden group card-hover transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  scrollSnapAlign: 'start',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {deal.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-display font-semibold text-lg">
                      {deal.title}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-navy/60 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{deal.location}</span>
                  </div>

                  <p className="text-navy/70 text-sm mb-4 line-clamp-2">
                    {deal.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-navy/50 mb-1">Loan Amount</p>
                      <p className="text-xl font-display font-bold text-gold">
                        {deal.amount}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-navy/50 mb-1">Closed Date</p>
                      <div className="flex items-center gap-1 text-navy/70 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{deal.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Successfully Funded</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { label: 'Total Funded', value: '$100M+', icon: Home },
            { label: 'Happy Clients', value: '500+', icon: CheckCircle },
            { label: 'Average Close Time', value: '21 Days', icon: Calendar },
            { label: 'Success Rate', value: '98%', icon: CheckCircle },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-2xl font-display font-bold text-navy mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-navy/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
