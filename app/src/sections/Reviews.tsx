import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Google Reviews data - these would typically come from an API
const googleReviews = [
  {
    id: 1,
    name: 'N. Nguyen',
    rating: 5,
    date: '2 weeks ago',
    review:
      'Mai was very knowledgeable and incredibly helpful throughout my first-time home-buying process. She took the time to explain everything and made the process feel easy and stress-free. I felt supported every step of the way and would highly recommend Mai to anyone looking to kickstart their mortgage.',
    avatar: 'NN',
    verified: true,
  },
  {
    id: 2,
    name: 'Hai P.',
    rating: 5,
    date: '1 month ago',
    review:
      'Best mortgage officer you will find. Very knowledgeable and work extremely well under tight deadline. Mai helped me with both my first home and rental property. Highly recommend!',
    avatar: 'HP',
    verified: true,
  },
  {
    id: 3,
    name: 'A. Cdhury',
    rating: 5,
    date: '2 months ago',
    review:
      'Mai Hoang was amazing throughout my home loan process. She guided me step by step, answered all my questions, and made everything smooth and stress-free. Thanks to her help, I was able to get my loan approved and buy my house without problems. I highly recommend her to anyone looking for a reliable and professional loan officer.',
    avatar: 'AC',
    verified: true,
  },
  {
    id: 4,
    name: 'T. Tran',
    rating: 5,
    date: '3 months ago',
    review:
      'Working with Mai was a wonderful experience. She is professional, responsive, and truly cares about her clients. She made the entire mortgage process seamless and was always available to answer my questions. I closed on time with a great rate!',
    avatar: 'TT',
    verified: true,
  },
  {
    id: 5,
    name: 'L. Pham',
    rating: 5,
    date: '4 months ago',
    review:
      'I cannot recommend Mai enough! As a first-time homebuyer, I had so many questions and concerns. Mai patiently walked me through every step, explained all my options, and helped me secure a fantastic rate. Her bilingual support was also incredibly helpful for my family.',
    avatar: 'LP',
    verified: true,
  },
  {
    id: 6,
    name: 'K. Le',
    rating: 5,
    date: '5 months ago',
    review:
      'Mai helped us refinance our home and saved us hundreds every month. The process was quick, professional, and hassle-free. She found us the best rate and handled all the paperwork efficiently. We are so grateful for her expertise!',
    avatar: 'KL',
    verified: true,
  },
];

const stats = [
  { label: 'Google Rating', value: '4.9', suffix: '/5' },
  { label: 'Total Reviews', value: '50', suffix: '+' },
  { label: 'Response Rate', value: '100', suffix: '%' },
];

export default function Reviews() {
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
      { threshold: 0.1 }
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
      const scrollAmount = 400;
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
    <section
      ref={sectionRef}
      id="reviews"
      className="py-24 bg-gradient-to-b from-cream to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold font-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-navy mb-4">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
          <p className="text-navy/70 max-w-2xl mx-auto text-lg mb-8">
            Real stories from homeowners we've helped achieve their dreams. 
            Our commitment to excellence shows in every review.
          </p>

          {/* Google Rating Badge */}
          <div
            className={`inline-flex items-center gap-4 bg-white rounded-2xl shadow-lg px-6 py-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-display font-bold text-navy">
                    4.9
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-gold fill-gold"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-navy/60">Based on 50+ Google Reviews</p>
              </div>
            </div>
            <a
              href="https://www.google.com/search?q=Mai+Hoang-+Loan+Officer+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-semibold hover:text-gold-dark transition-colors text-sm"
            >
              View All Reviews →
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-display font-bold text-navy">
                {stat.value}
                <span className="text-gold">{stat.suffix}</span>
              </p>
              <p className="text-sm text-navy/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reviews Carousel */}
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

          {/* Reviews Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {googleReviews.map((review, index) => (
              <div
                key={review.id}
                className={`flex-shrink-0 w-[350px] bg-white rounded-2xl shadow-lg p-6 transition-all duration-700 hover:shadow-xl ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  scrollSnapAlign: 'start',
                  transitionDelay: `${400 + index * 100}ms`,
                }}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-gold/20 mb-4" />

                {/* Review Text */}
                <p className="text-navy/80 leading-relaxed mb-6 line-clamp-4">
                  "{review.review}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center text-white font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{review.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-navy/50">{review.date}</p>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-navy/70 mb-4">
            Join our satisfied clients and start your homeownership journey today.
          </p>
          <a
            href="https://www.google.com/search?q=Mai+Hoang-+Loan+Officer+Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-dark transition-colors"
          >
            Read More Reviews on Google
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.351c.192-.192-.054-.3-.297-.108l-5.965 3.759-2.568-.802c-.56-.176-.572-.56.117-.828l10.037-3.869c.466-.174.875.108.713.827z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
