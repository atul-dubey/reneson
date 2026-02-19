import React, { useEffect } from "react";
import { Search, Layers, Code2, ShieldCheck ,CheckCircle2 ,  AlertCircle, Target, Zap} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import ScheduleCall from "../components/ScheduleCall";

const ProjectDetail = () => {

    const navigate=useNavigate();

  const project = {
    title: "EcoGrid Smart Monitor",
    summary: "Real-time energy optimization platform built for industrial power infrastructure.",
    serviceType: "IoT & Hardware Solutions",
    tech: ["C++", "React Native", "AWS IoT", "Embedded Systems"],
    context: {
      problem: "Traditional power grids suffered from 15% energy leakage due to lack of real-time load balancing.",
      industry: "Renewable Energy / Industrial Manufacturing",
      points: ["Legacy infrastructure integration", "Scalability for 1000+ nodes"]
    },
    role: {
      delivery: "Full-stack IoT implementation including hardware sensors and mobile dashboard.",
      scope: "Hardware design & Software Architecture",
      points: ["Custom PCB Layout", "End-to-end Encryption"]
    },
    mainImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
    ],
  };

  const phases = [
    {
      icon: Search,
      title: "Requirement Analysis",
      desc: "Understanding business goals, technical constraints, and system expectations.",
    },
    {
      icon: Layers,
      title: "System Architecture",
      desc: "Designing scalable, secure, and future-ready technical architecture.",
    },
    {
      icon: Code2,
      title: "Development",
      desc: "Clean, maintainable code with regular internal reviews and testing.",
    },
    {
      icon: ShieldCheck,
      title: "Testing & Deployment",
      desc: "Performance testing, security validation, and smooth production rollout.",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#426369]">
              --{project.serviceType}
            </span>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              {project.title}
            </h1>

            <p className="text-lg text-slate-500 max-w-xl">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs font-medium border border-slate-200 px-3 py-1 rounded-full text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <img
              src={project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- 2. DEVELOPMENT PHASES: Technical Standards --- */}

    <section className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#426369] mb-4 flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#426369]"></span> Strategic Narrative
          </h2>
          <h3 className="text-4xl font-black tracking-tighter text-slate-900">
            From Friction to <span className="text-[#426369]">Flow.</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-0 border border-gray-100 rounded-[3rem] overflow-hidden bg-slate-50/30">
          
          {/* 1. THE FRICTION (The Problem) */}
          <div className="p-12 lg:p-16 bg-white border-b lg:border-b-0 lg:border-r border-gray-100 group transition-colors duration-500 hover:bg-red-50/30">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                <AlertCircle size={24} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">The Friction</h4>
            </div>
            
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
              Legacy hardware systems were operating in isolation, causing a <span className="text-red-500 underline decoration-red-200 underline-offset-4">25% drop</span> in real-time data accuracy across the grid.
            </p>
            
            <ul className="space-y-3">
              {['Data Silos', 'High Latency', 'Manual Overrides'].map((item, i) => (
                <li key={i} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-200" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 2. THE ENGINEERING (What We Did) */}
          <div className="p-12 lg:p-16 bg-white border-b lg:border-b-0 lg:border-r border-gray-100 group transition-colors duration-500 hover:bg-[#426369]/5">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-[#426369]/10 flex items-center justify-center text-[#426369]">
                <Target size={24} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">The Strategy</h4>
            </div>
            
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
              We engineered a <span className="text-[#426369] italic">Custom IoT Gateway</span> that translates legacy protocols into secure MQTT streams for cloud-side analysis.
            </p>
            
            <ul className="space-y-3">
              {['Edge Computing', 'Protocol Mapping', 'AES-256 Encryption'].map((item, i) => (
                <li key={i} className="text-[10px] font-bold text-[#426369] uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#426369]/30" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. THE EVOLUTION (The Impact) */}
          <div className="p-12 lg:p-16 bg-white group transition-colors duration-500 hover:bg-emerald-50/30">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <Zap size={24} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">The Evolution</h4>
            </div>
            
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
              System-wide visibility reached 99.9%, resulting in a <span className="text-emerald-600 font-black tracking-tight">40% reduction</span> in operational overhead costs.
            </p>
            
            <div className="pt-6 border-t border-gray-50 flex items-end gap-2">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">40%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1.5">Cost Efficiency</span>
            </div>
          </div>

        </div>
      </div>
    </section>


      {/* ================= GALLERY ================= */}
      <section className="py-24 bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex flex-col gap-2">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">Project Gallery</h2>
            <p className="text-gray-500 text-lg">
              Screenshots and real-world implementation visuals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {project.images.map((img, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden border border-slate-200 bg-white"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Featured Projects Section */}
      {/* <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">Similar Works</h2>
              <p className="text-gray-500 font-medium italic">Projects that turned ideas into impactful results </p>
            </div>
            <a onClick={()=>navigate('/portfolio')} className="hidden md:block text-sm font-bold text-[#426369] border-b-2 border-[#426369]/20 hover:border-[#426369] transition-all">
              VIEW ALL PROJECTS →
            </a>
          </div>

          {loadingProjects ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="aspect-[16/10] bg-gray-100 rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.length > 0 ? (
                relatedProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    description={project.description}
                    tech={project.tech}
                    image={project.image}
                    serviceType={project.serviceType}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium">New project will update soon.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section> */}

    {/* <ScheduleCall/> */}
    </div>
  );
};

export default ProjectDetail;
