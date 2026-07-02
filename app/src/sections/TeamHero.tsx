import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Phone, Mail, Award, Star, MapPin } from 'lucide-react';

export default function TeamHero() {
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

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-cream to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold font-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Your Trusted Partners
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-navy mb-4">
            Meet Your <span className="text-gradient-gold">Loan Team</span>
          </h2>
          <p className="text-navy/70 max-w-2xl mx-auto text-lg">
            Dedicated professionals committed to helping you achieve your homeownership dreams 
            with personalized service and expert guidance.
          </p>
        </div>

        {/* Main Content Card */}
        <div
          className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid lg:grid-cols-5">
            {/* Portrait Image - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 relative">
              <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
                <img
                  src="/mai-hero-portrait.jpg"
                  alt="Mai Hoang & Michael Mai - Loan Originators"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 lg:bg-gradient-to-l lg:from-white lg:via-white/50 lg:to-transparent" />
                
                {/* Mobile Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                  <div className="bg-navy/90 backdrop-blur-sm rounded-xl p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-gold fill-gold" />
                      <span className="font-semibold">Best Mortgage Company</span>
                    </div>
                    <p className="text-white/80 text-sm">CO-NMLS #1910591 | Licensed in PA, NJ, DE, MD, FL, TX & More</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - Takes 3 columns on large screens */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              {/* Names & Titles */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-gold font-semibold text-sm">LICENSED PROFESSIONALS</p>
                    <p className="text-navy/60 text-sm">Mai Hoang NMLS #2180679 | CO-NMLS #1910591</p>
                  </div>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-navy mb-2">
                  Mai Hoang <span className="text-gold">&</span> Michael Mai
                </h3>
                <p className="text-navy/70 text-lg">
                  Loan Originators at Absolute Mortgage & Lending
                </p>
              </div>

              {/* Description */}
              <p className="text-navy/70 leading-relaxed mb-8">
                With over 10 years of combined experience in the mortgage industry, Mai and Michael 
                have helped hundreds of families achieve their dream of homeownership. Their bilingual 
                expertise in English and Vietnamese, combined with their deep knowledge of various loan 
                programs, ensures that every client receives personalized guidance tailored to their unique 
                financial situation.
              </p>

              {/* Key Highlights */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-cream rounded-xl p-4 text-center">
                  <p className="text-3xl font-display font-bold text-gold mb-1">500+</p>
                  <p className="text-navy/60 text-sm">Loans Funded</p>
                </div>
                <div className="bg-cream rounded-xl p-4 text-center">
                  <p className="text-3xl font-display font-bold text-gold mb-1">4.9</p>
                  <p className="text-navy/60 text-sm">Google Rating</p>
                </div>
                <div className="bg-cream rounded-xl p-4 text-center">
                  <p className="text-3xl font-display font-bold text-gold mb-1">10+</p>
                  <p className="text-navy/60 text-sm">Years Experience</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="tel:814-386-7005"
                  className="flex items-center gap-2 text-navy hover:text-gold transition-colors"
                >
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="font-semibold">(814) 386-7005</span>
                </a>
                <a
                  href="mailto:Mai.Hoang@absoluteml.com"
                  className="flex items-center gap-2 text-navy hover:text-gold transition-colors"
                >
                  <Mail className="w-5 h-5 text-gold" />
                  <span>Mai.Hoang@absoluteml.com</span>
                </a>
                <div className="flex items-center gap-2 text-navy/60">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span>Philadelphia, PA</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 group"
                >
                  Get Pre-Approved
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-gold text-gold font-semibold px-6 py-3 rounded-lg hover:bg-gold hover:text-white transition-all duration-300 inline-flex items-center gap-2 shadow-gold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className={`mt-12 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { label: 'Equal Housing', icon: '🏠' },
            { label: 'Licensed in PA', icon: '✓' },
            { label: 'Bilingual Service', icon: '🌐' },
            { label: 'Fast Approval', icon: '⚡' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-navy/60">
              <span className="text-2xl">{badge.icon}</span>
              <span className="font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
