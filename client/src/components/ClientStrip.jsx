import React from 'react';

const clients = [
  { name: "Global Tech", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjE3IbOFclX4cyMokQsgu7hDSn6iAHG83ZTw&s" },
  { name: "Synthetic AI", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnt253Qlda-6a5x8LltLHZD4IWMCmk7LOQ9Q&s" },
  { name: "Cloud Flow", logo: "https://1000logos.net/wp-content/uploads/2021/04/Adobe-logo.png" },
  { name: "Nexus Core", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Vortex Labs", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7ca4JTx5cBLKn9F6fd_70JHv2PReeOsEsA&s" },
  { name: "Quantum Edge", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBBUUNIFQdJ7AAlx9NufMlUI1sslkJENqUw&s" },
];

const ClientStrip = () => {
  // We double the array to ensure a seamless infinite loop
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