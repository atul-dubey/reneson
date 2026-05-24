import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';


const ClientStrip = () => {
  const {clients}=useData();
  const [shouldScroll, setShouldScroll] = useState(false);
  
  useEffect(() => {
    // Determine if scroll is needed based on viewport width and number of clients
    const checkShouldScroll = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint
      const isTablet = window.innerWidth < 1024; // lg breakpoint
      
      // Mobile: show scroll if > 2 clients
      // Tablet: show scroll if > 3 clients
      // Desktop: show scroll if > 6 clients
      const threshold = isMobile ? 2 : isTablet ? 3 : 6;
      setShouldScroll(clients.length > threshold);
    };
    
    checkShouldScroll();
    window.addEventListener('resize', checkShouldScroll);
    return () => window.removeEventListener('resize', checkShouldScroll);
  }, [clients.length]);
  
  const displayClients = shouldScroll ? [...clients, ...clients] : clients;

  return (
    <section className="py-12 border-y border-gray-50 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-sm font-semibold text-[#426369]/60 uppercase tracking-widest">
          Trusted by startups and growing businesses
        </p>
      </div>

      {shouldScroll ? (
        // Marquee/Scroll effect for many clients
        <div className="relative flex overflow-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {displayClients.map((client, i) => (
              <div 
                key={i} 
                className="flex items-center justify-center px-8 sm:px-12 transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 flex-shrink-0"
              >
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`}
                  className="h-12 w-auto max-w-[160px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Centered grid layout for few clients
        <div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap">
          {clients.map((client, i) => (
            <div 
              key={i} 
              className="transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
            >
              <img 
                src={client.logo} 
                alt={`${client.name} logo`}
                className="h-12 w-auto max-w-[160px] object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ClientStrip;