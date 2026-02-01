import React from 'react';
import { useData } from '../context/DataContext';


const ClientStrip = () => {
  // We double the array to ensure a seamless infinite loop
  const {clients}=useData();

  const displayClients = [...clients, ...clients];

  return (
    <section className="py-12 border-y border-gray-50 bg-gray-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-sm font-semibold text-[#426369]/60 uppercase tracking-widest">
          Trusted by startups and growing businesses
        </p>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {displayClients.map((client, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center px-12 transition-all duration-300 grayscale opacity-40 hover:grayscale-0 hover:opacity-100"
            >
              {/* Fixed height (h-12) with object-contain ensures that 
                  logos of any aspect ratio fit perfectly without distortion.
              */}
              <img 
                src={client.logo} 
                alt={`${client.name} logo`}
                className="h-12 w-auto max-w-[180px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientStrip;