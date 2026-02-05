import React from 'react';
import { ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';
import CoreTeam from '../components/CoreTeam';

export default function AboutPage() {
  return (
    <div className="pt-24 bg-white">

<section className="py-30 px-6">
  <div className="max-w-6xl mx-auto">

   
    <div className="max-w-3xl mb-20">
      <span className="block text-[#426369] text-xs uppercase tracking-[0.45em] font-medium mb-6">
        About Reneson
      </span>

      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
        Practical engineering.
        <br />
        <span className="text-[#426369]">Real business outcomes.</span>
      </h1>
    </div>


    <div className="grid md:grid-cols-2 gap-20 items-start">

      <p className="text-gray-600 text-lg leading-relaxed">
        Reneson is a service-based technology company providing custom software
        development and intelligent IoT solutions for organizations across industries.
      </p>

      <p className="text-gray-600 text-lg leading-relaxed">
        We operate with a clear focus on execution — translating complex requirements
        into stable, scalable systems that are built to perform in production
        environments, not just presentations.
      </p>

    </div>

  </div>
</section>
      <hr className="border-gray-100 max-w-7xl mx-auto" />
  
      <CoreTeam/>

    </div>
  );
}