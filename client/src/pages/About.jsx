import React from 'react';
import { ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';
import CoreTeam from '../components/CoreTeam';

export default function AboutPage() {
  return (
    <div className="pt-24 bg-white">
      {/* Section 1: About Reneson */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[#426369] font-bold uppercase tracking-[0.4em] text-xs mb-6">
            Our Story
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none mb-8">
            Engineering the <br /> <span className="text-[#426369]">Digital Frontier.</span>
          </h1>
          <p className="text-gray-500 text-xl leading-relaxed max-w-3xl mx-auto">
            Reneson is a premier tech agency specializing in high-performance digital products and intelligent IoT ecosystems. We bridge the gap between complex engineering and intuitive user experiences.
          </p>
        </div>
      </section>

      <hr className="border-gray-100 max-w-7xl mx-auto" />
      {/* Section 2: Our Approach */}
      <section className="py-24 px-6 bg-gray-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[#426369] font-bold uppercase tracking-[0.4em] text-xs mb-4">
              Methodology
            </h2>
            <h3 className="text-4xl font-black text-gray-900 tracking-tight">How We <span className="text-[#426369]">Work</span> </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Scalable Foundations",
                desc: "We build systems designed to handle growth from 1,000 to 1,000,000 users seamlessly.",
                icon: <Zap className="text-[#426369]" />
              },
              {
                title: "Security-First",
                desc: "A security-first mindset is integrated into every line of code and architectural layer.",
                icon: <ShieldCheck className="text-[#426369]" />
              },
              {
                title: "Rapid ROI",
                desc: "Optimized workflows and agile execution to help our partners hit market targets faster.",
                icon: <Cpu className="text-[#426369]" />
              }
            ].map((step, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] border border-gray-100 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Section 3: Core Team */}
          <CoreTeam/>

    </div>
  );
}