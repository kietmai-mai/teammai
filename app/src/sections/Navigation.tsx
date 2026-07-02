import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

interface NavigationProps {
  scrollY: number;
}

const homeNavLinks = [
  { name: 'Home', href: '#home', isPageLink: false },
  { name: 'Programs', href: '#programs', isPageLink: false },
  { name: 'Rates', href: '#rates', isPageLink: false },
  { name: 'Reviews', href: '#reviews', isPageLink: false },
  { name: 'About', href: '#about', isPageLink: false },
  { name: 'Contact', href: '#contact', isPageLink: false },
];

export default function Navigation({ scrollY }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const isScrolled = scrollY > 50;

  useEffect(() => {
    if (scrollY > lastScrollY && scrollY > 200) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(scrollY);
  }, [scrollY, lastScrollY]);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    if (!isHome) {
      navigate('/' + href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'glass shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <img
                  src="/aml-logo-space.png"
                  alt="AML Funding"
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-10' : 'h-12'
                  }`}
                />
                <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <p className="font-display font-semibold text-navy">
                  AML Funding
                </p>
                <p className="text-xs text-navy/70">
                  Absolute Mortgage & Lending
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {homeNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-sm font-medium underline-animate transition-colors duration-300 ${
                    isScrolled
                      ? 'text-navy hover:text-gold'
                      : 'text-navy hover:text-gold'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              {/* Scenarios Page Link */}
              <Link
                to="/tools"
                className={`text-sm font-medium underline-animate transition-colors duration-300 inline-flex items-center gap-1 ${
                  location.pathname === '/tools'
                    ? 'text-gold font-semibold'
                    : isScrolled
                      ? 'text-navy hover:text-gold'
                      : 'text-navy hover:text-gold'
                }`}
              >
                Scenarios
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:814-386-7005"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-navy' : 'text-navy'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>(814) 386-7005</span>
              </a>
              <a
                href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold/10 border-2 border-gold text-gold font-accent font-semibold px-4 py-2 rounded-lg hover:bg-gold hover:text-white transition-colors inline-flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Call
              </a>
              <a
                href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm animate-pulse-glow"
              >
                Apply Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-navy/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-navy" />
              ) : (
                <Menu className="w-6 h-6 text-navy" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 transition-all duration-500 ${
            isMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4">
            {homeNavLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-navy font-medium py-3 px-4 rounded-lg hover:bg-gold/10 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/tools"
              onClick={() => setIsMenuOpen(false)}
              className={`text-navy font-medium py-3 px-4 rounded-lg hover:bg-gold/10 transition-colors inline-flex items-center gap-2 ${
                location.pathname === '/tools' ? 'text-gold font-semibold bg-gold/10' : ''
              }`}
            >
              Scenarios
              <ArrowRight className="w-4 h-4" />
            </Link>
            <hr className="border-gray-200" />
            <a
              href="tel:814-386-7005"
              className="flex items-center gap-3 text-navy py-3 px-4"
            >
              <Phone className="w-5 h-5 text-gold" />
              <span>(814) 386-7005</span>
            </a>
            <a
              href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gold/10 border-2 border-gold text-gold font-semibold py-3 px-4 rounded-lg hover:bg-gold hover:text-white transition-colors text-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Call
            </a>
            <a
              href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
