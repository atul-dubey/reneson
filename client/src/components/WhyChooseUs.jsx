import React from 'react';
import { ShieldCheck, Cpu, Lightbulb, Zap, Handshake } from 'lucide-react';

const valueCards = [
  {
    icon: ShieldCheck,
    title: "Engineering-Driven Solutions",
    description: "We prioritize structural integrity and security-first development in every line of code.",
  },
  {
    icon: Lightbulb,
    title: "Smart Problem Solving",
    description: "Turning complex business challenges into elegant, efficient technical workflows.",
  },
  {
    icon: Zap,
    title: "End-to-End Delivery",
    description: "From initial architecture blueprints to final deployment and infrastructure scaling.",
  },
  {
    icon: Cpu,
    title: "Future-Ready Technology",
    description: "Built using modular architectures that evolve alongside emerging global tech trends.",
  },
  {
    icon: Handshake,
    title: "Reliable Partnership",
    description: "We act as your long-term technical foundation, ensuring stability as you grow.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-24 bg-gray-50/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Why Choose <span className="text-[#426369]">Reneson</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Reneson combines architectural stability with technological fluidity to build 
            reliable, scalable, and future-ready digital foundations.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {valueCards.map((card, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#426369]/5 hover:border-[#426369]/20 transition-all duration-500 flex flex-col items-start text-left"
            >
              {/* Icon with Micro-Accent */}
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-[#426369]/10 scale-150 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <card.icon 
                  className="relative w-10 h-10 text-[#426369] stroke-[1.5px] transition-transform duration-500 group-hover:-translate-y-1" 
                />
              </div>

              {/* Text Content */}
              <h4 className="text-lg font-bold text-gray-900 mb-3 tracking-tight leading-snug">
                {card.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {card.description}
              </p>
              
              {/* Architectural Accent Line */}
              <div className="mt-8 w-8 h-[2px] bg-gray-100 group-hover:w-full group-hover:bg-[#426369]/20 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;