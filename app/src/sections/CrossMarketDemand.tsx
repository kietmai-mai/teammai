import { useRef, useState, useEffect } from 'react';
import {
  MapPin,
  TrendingUp,
  ExternalLink,
  AlertTriangle,
  ChevronDown,
  BarChart3,
  Eye,
} from 'lucide-react';

export default function CrossMarketDemand() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Inject Tableau script on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold font-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Market Intelligence
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-navy mb-4">
            Cross Market <span className="text-gradient-gold">Demand</span>
          </h2>
          <p className="text-navy/70 max-w-2xl mx-auto text-lg">
            Explore real-time housing market trends and demand across major U.S. metro areas. 
            Select your target market from the dropdown below to see current buyer activity and inventory levels.
          </p>
        </div>

        {/* How to Use Instructions */}
        <div
          className={`bg-navy rounded-2xl p-6 mb-8 text-white transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h3 className="font-display text-xl text-gold mb-2">How to Use This Dashboard</h3>
              <ol className="text-white/80 text-sm space-y-2 list-decimal list-inside">
                <li>Select your desired <strong>metro market</strong> from the dropdown menu in the dashboard</li>
                <li>Explore <strong>views per property</strong> to gauge buyer demand intensity</li>
                <li>Compare <strong>inventory levels</strong> and <strong>days on market</strong> across regions</li>
                <li>Use the data to make <strong>informed decisions</strong> about when and where to buy</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Tableau Dashboard */}
        <div
          className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-navy to-navy-light p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-gold" />
              <div>
                <p className="text-white font-semibold">Realtor.com Market Demand Dashboard</p>
                <p className="text-white/60 text-xs">Powered by Tableau Public</p>
              </div>
            </div>
            <a
              href="https://public.tableau.com/views/J987BJBZ7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light text-sm inline-flex items-center gap-1 transition-colors"
            >
              View on Tableau
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Tableau Embed */}
          <div className="relative w-full overflow-hidden" style={{ minHeight: '600px' }}>
            <div
              className="tableauPlaceholder"
              id="viz1777331484213"
              style={{ position: 'relative', width: '100%' }}
            >
              <noscript>
                <a href="#">
                  <img
                    alt="Views from Metro"
                    src="https://public.tableau.com/static/images/J9/J987BJBZ7/1_rss.png"
                    style={{ border: 'none' }}
                  />
                </a>
              </noscript>
              <object
                className="tableauViz"
                style={{ display: 'none', width: '100%', minHeight: '600px' }}
              >
                <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
                <param name="embed_code_version" value="3" />
                <param name="path" value="shared/J987BJBZ7" />
                <param name="toolbar" value="yes" />
                <param
                  name="static_image"
                  value="https://public.tableau.com/static/images/J9/J987BJBZ7/1.png"
                />
                <param name="animate_transition" value="yes" />
                <param name="display_static_image" value="yes" />
                <param name="display_spinner" value="yes" />
                <param name="display_overlay" value="yes" />
                <param name="display_count" value="yes" />
                <param name="language" value="en-US" />
              </object>
            </div>
          </div>

          {/* Dashboard Footer */}
          <div className="bg-cream p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-navy/60 text-sm">
              <TrendingUp className="w-4 h-4 text-gold" />
              <span>Data updates regularly from Realtor.com public dataset</span>
            </div>
            <div className="flex items-center gap-2 text-navy/60 text-sm">
              <MapPin className="w-4 h-4 text-gold" />
              <span>Select any U.S. metro area from the dropdown above</span>
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div
          className={`mt-8 bg-amber-50 border-2 border-amber-300 rounded-xl p-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">IMPORTANT DISCLAIMER</h4>
              <p className="text-amber-700 text-sm leading-relaxed mb-2">
                This market demand visualization is sourced from <strong>Realtor.com</strong> via{' '}
                <strong>Public Tableau</strong> and is provided for <strong>informational and educational purposes only</strong>. 
                It reflects publicly available market trend data and is not a guarantee of current market conditions.
              </p>
              <p className="text-amber-700 text-sm leading-relaxed mb-2">
                <strong>AML Funding LLC</strong> and <strong>Team Mai</strong> do not control, verify, or endorse the accuracy, 
                completeness, or timeliness of the data presented in this dashboard. Market conditions change rapidly, 
                and local market nuances may not be fully captured in this aggregate view.
              </p>
              <p className="text-amber-700 text-sm leading-relaxed">
                <strong>AML Funding LLC and Team Mai expressly disclaim all liability</strong> for any errors, omissions, 
                or outdated information displayed in this third-party visualization. This report is meant to help clients 
                <strong>explore market trends at a high level</strong> and should not be the sole basis for any real estate 
                or financial decision. For the most accurate, up-to-date local market data, please consult your real estate 
                agent or contact us directly at <a href="mailto:teammai@absoluteml.com" className="underline font-semibold">teammai@absoluteml.com</a>.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-navy/70 mb-4">
            Want personalized market analysis for your area? Let's discuss your options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <ChevronDown className="w-5 h-5" />
              Schedule a Market Consultation
            </a>
            <a
              href="tel:814-386-7005"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call (814) 386-7005
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Phone icon inline
function Phone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}
