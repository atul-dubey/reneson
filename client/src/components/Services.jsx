import { Cpu, BrainCircuit, Code2, Zap, Layers, Users } from 'lucide-react';

const services = [
  { icon: Cpu, title: "IoT Solutions", desc: "Smart connected ecosystems designed for industrial and consumer efficiency." },
  { icon: BrainCircuit, title: "Artificial Intelligence", desc: "Deploying predictive models and intelligent automation for data-driven results." },
  { icon: Code2, title: "Software Development", desc: "High-performance custom software built with modern architectural standards." },
  { icon: Zap, title: "Digital Transformation", desc: "Modernizing legacy systems and streamlining business processes for the cloud." },
  { icon: Layers, title: "Hardware Engineering", desc: "Expert PCB design, prototyping, and firmware development for smart devices." },
  { icon: Users, title: "Staff Augmentation", desc: "Scale your team rapidly with our senior developers and domain specialists." },
];

const Services = () => (
  <section id="services" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-[#426369] font-bold uppercase tracking-widest text-sm">What We Do</h2>
        <h3 className="text-4xl font-extrabold text-gray-900">Our Services</h3>
        <p className="text-gray-500">Building reliable, scalable, and future-ready technology solutions.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="group p-8 rounded-xl border border-gray-100 bg-white hover:border-[#426369]/50 hover:bg-[#426369]/5 transition-all duration-300 cursor-pointer">
            <div className="mb-4">
              <service.icon className="w-8 h-8 text-[#426369] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
            <p className="text-gray-500 leading-relaxed mb-4">{service.desc}</p>
            <div className="text-[#426369] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Learn more →
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;