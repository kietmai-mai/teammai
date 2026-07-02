import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, ExternalLink, RefreshCw, Loader2, Info } from 'lucide-react';
import { fetchMarketRates, FALLBACK_RATES, type MarketRate } from '@/lib/rateFetcher';

function RateRow({ rate }: { rate: MarketRate }) {
  const isUp = rate.change > 0;
  const isDown = rate.change < 0;

  return (
    <div className="grid grid-cols-12 gap-2 py-4 px-4 items-center hover:bg-cream/50 rounded-lg transition-colors">
      <div className="col-span-3 sm:col-span-2">
        <span className="font-semibold text-navy text-sm sm:text-base">{rate.product}</span>
      </div>
      <div className="col-span-2 text-center">
        <span className="font-display text-xl sm:text-2xl font-bold text-navy">
          {rate.rate.toFixed(2)}%
        </span>
      </div>
      <div className="col-span-2 text-center">
        <span
          className={`inline-flex items-center gap-1 text-sm font-medium ${
            isUp ? 'text-red-500' : isDown ? 'text-green-500' : 'text-navy/50'
          }`}
        >
          {isUp ? (
            <TrendingUp className="w-4 h-4" />
          ) : isDown ? (
            <TrendingDown className="w-4 h-4" />
          ) : (
            <Minus className="w-4 h-4" />
          )}
          {rate.change > 0 ? '+' : ''}
          {rate.change.toFixed(2)}%
        </span>
      </div>
      <div className="hidden sm:block col-span-2 text-center">
        <span className="text-sm text-navy/60">{rate.weekChange > 0 ? '+' : ''}{rate.weekChange.toFixed(2)}%</span>
      </div>
      <div className="hidden sm:block col-span-2 text-center">
        <span className="text-sm text-navy/60">{rate.monthChange > 0 ? '+' : ''}{rate.monthChange.toFixed(2)}%</span>
      </div>
      <div className="col-span-5 sm:col-span-2 text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gold"
              style={{
                width: `${((rate.rate - rate.low52) / (rate.high52 - rate.low52)) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-navy/50">{rate.low52.toFixed(2)}%-{rate.high52.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}

export default function RateMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const [rates, setRates] = useState<MarketRate[]>(FALLBACK_RATES);
  const [lastUpdated, setLastUpdated] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [source, setSource] = useState('Freddie Mac PMMS');
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const loadRates = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    setFetchError(false);

    try {
      const result = await fetchMarketRates();
      setRates(result.rates);
      setSource(result.source);
      setLastUpdated(
        new Date(result.lastUpdated).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      );
      setFetchError(result.source.includes('fallback') || result.source.includes('error'));
    } catch (err) {
      console.warn('Rate fetch failed:', err);
      setFetchError(true);
      setRates(FALLBACK_RATES);
      setLastUpdated(new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRates(false);
    const interval = setInterval(() => loadRates(false), 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleRefresh = () => {
    loadRates(true);
  };

  return (
    <section
      ref={sectionRef}
      id="rates"
      className="py-20 bg-gradient-to-b from-white to-cream relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />

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
            Today's <span className="text-gradient-gold">Mortgage Rates</span>
          </h2>
          <p className="text-navy/70 max-w-2xl mx-auto text-lg">
            Official weekly mortgage rate survey from Freddie Mac. Rates are updated every Thursday.
          </p>
        </div>

        {/* Info Banner */}
        <div
          className={`mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <strong>Weekly Rate Survey:</strong> These are the official rates from Freddie Mac's Primary Mortgage Market Survey (PMMS), 
            published every <strong>Thursday</strong>. Daily rate fluctuations are not captured in this weekly survey. 
            For the most current daily rates, visit <a href="https://www.mortgagenewsdaily.com/mortgage-rates" target="_blank" rel="noopener noreferrer" className="underline font-semibold">MortgageNewsDaily.com</a> directly.
          </div>
        </div>

        {/* Rate Table */}
        <div
          className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Table Header */}
          <div className="bg-navy text-white py-4 px-4">
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-3 sm:col-span-2 font-semibold text-sm">Product</div>
              <div className="col-span-2 text-center font-semibold text-sm">Rate</div>
              <div className="col-span-2 text-center font-semibold text-sm">Change</div>
              <div className="hidden sm:block col-span-2 text-center font-semibold text-sm">1 Week</div>
              <div className="hidden sm:block col-span-2 text-center font-semibold text-sm">1 Month</div>
              <div className="col-span-5 sm:col-span-2 text-right font-semibold text-sm">52-Week Range</div>
            </div>
          </div>

          {/* Rate Rows */}
          <div className="divide-y divide-gray-100">
            {isLoading ? (
              <div className="py-12 text-center">
                <Loader2 className="w-8 h-8 text-gold animate-spin mx-auto mb-3" />
                <p className="text-navy/60">Fetching latest rates from Freddie Mac...</p>
              </div>
            ) : (
              rates.map((rate, index) => (
                <div
                  key={rate.product}
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${300 + index * 80}ms` }}
                >
                  <RateRow rate={rate} />
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="bg-cream/50 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-navy/50 text-sm">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="inline-flex items-center gap-1 hover:text-navy transition-colors disabled:opacity-50"
                title="Refresh rates"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Last Updated: {lastUpdated}</span>
              </button>
              {fetchError && (
                <span className="text-amber-600 text-xs bg-amber-100 px-2 py-1 rounded">
                  Using cached — click refresh to retry
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-navy/40">Source: {source}</span>
              <a
                href="https://www.mortgagenewsdaily.com/mortgage-rates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold hover:text-gold-dark text-sm font-medium transition-colors"
              >
                View Daily Rates
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div
          className={`mt-8 bg-amber-50 border-2 border-amber-300 rounded-xl p-6 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">IMPORTANT DISCLAIMER</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                The rates displayed above are <strong>estimates for informational purposes only</strong> and are based on the official Freddie Mac Primary Mortgage Market Survey. These are national average indices and <strong>not a commitment to lend</strong>. 
                Your actual rate will depend on your credit profile, loan amount, property type, and other factors.
                All rates, terms, and conditions will be thoroughly vetted and verified during the pre-approval process
                in accordance with all applicable federal and state regulations.
                Please contact us for a personalized rate quote tailored to your specific situation.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-8 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-navy/70 mb-4">
            Want to see what your personalized rate could be? Try our mortgage calculator.
          </p>
          <button
            onClick={() => navigate('/tools')}
            className="btn-primary inline-flex items-center gap-2"
          >
            Go to Calculator
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
