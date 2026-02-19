import React from 'react';
import { ChevronRight ,ArrowUpRight  } from 'lucide-react';
import hero from '../assets/hero.png';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const {setShowScheduler}=useData();
  const navigate=useNavigate();
  
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 -right-20 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(66,99,105,0.08)_0%,rgba(255,255,255,0)_70%)] z-[-1] blur-[40px]"></div>
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(66,99,105,0.08)_0%,rgba(255,255,255,0)_70%)] z-[-1] blur-[40px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-gray-900 tracking-tight">
            Building Smart <span className="text-[#426369]">Digital Solutions</span> for Next-Gen Brands.
          </h1>
          <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
            From IoT systems and AI integration to custom software and digital transformation, we design and build technology that creates real impact.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={()=>setShowScheduler(true)} className="bg-[#426369] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#354f54] transition-all flex items-center gap-2 shadow-xl shadow-teal-900/20 cursor-pointer">
              Schedule Free Call <ChevronRight  className="w-5 h-5" />
            </button>
            <button onClick={()=>navigate('/portfolio')} className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:border-[#426369] hover:text-[#426369] transition-all flex items-center gap-2 cursor-pointer">
              View Our Work <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Right Visual (Mockup Interface) */}

{/* 
        <div className="relative">
          <div className="relative rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,.08)]">
            <div className="p-6 sm:p-8">
             
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300"></span>
                </div>
                <div className="text-xs text-slate-500 font-medium">reneson.io</div>
              </div>

              <div className="mt-7 grid sm:grid-cols-2 gap-4">
               
                <div className="rounded-2xl p-5 border border-slate-200 transition-all hover:border-[#426369]/30" style={{ background: 'linear-gradient(135deg, rgba(66,99,105,.12), rgba(66,99,105,.04))' }}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#426369" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M7 4h10M7 20h10M4 17h16" /></svg>
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Web platform</div>
                      <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Design → Build → Launch</div>
                    </div>
                  </div>
                  <div className="mt-4 h-20 rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="h-3 w-full bg-slate-50 border-b border-slate-200"></div>
                    <div className="p-3 grid grid-cols-3 gap-2">
                      <div className="h-10 rounded-lg animate-pulse bg-[#426369]/10"></div>
                      <div className="h-10 rounded-lg bg-slate-50 border border-slate-200"></div>
                      <div className="h-10 rounded-lg bg-slate-50 border border-slate-200"></div>
                    </div>
                  </div>
                </div>

               
                <div className="rounded-2xl p-5 border border-slate-200 bg-white transition-all hover:border-[#426369]/30">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#426369]/10 border border-[#426369]/20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#426369" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
                        <path d="M8.5 12a3.5 3.5 0 107 0 3.5 3.5 0 10-7 0Z" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">IoT telemetry</div>
                      <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Devices → Cloud</div>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-slate-200 overflow-hidden h-24 relative bg-white">
                    <svg viewBox="0 0 400 120" className="w-full h-full">
                      <path 
                        d="M10 88 C 60 35, 120 105, 170 70 C 220 35, 280 80, 330 52 C 350 42, 370 55, 390 30" 
                        fill="none" 
                        stroke="#426369" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <circle cx="170" cy="70" r="4" fill="#426369" />
                      <circle cx="330" cy="52" r="4" fill="#426369" />
                    </svg>
                  </div>
                </div>
              </div>

             
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-[#426369]/30">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Custom software blueprint</div>
                    <div className="text-xs text-slate-500 mt-1">Architecture, APIs, data, and automation.</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#426369]/10 text-[#426369]">
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-[#426369]"></span>
                    Production-ready
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-[10px]">
                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <div className="font-bold text-slate-900 uppercase tracking-tight">API Layer</div>
                    <div className="text-slate-500 mt-1">Secure</div>
                  </div>
                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <div className="font-bold text-slate-900 uppercase tracking-tight">Data</div>
                    <div className="text-slate-500 mt-1">Pipelines</div>
                  </div>
                  <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                    <div className="font-bold text-slate-900 uppercase tracking-tight">Ops</div>
                    <div className="text-slate-500 mt-1">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="mt-6 flex items-center justify-between text-[11px] text-slate-500 px-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#426369]/75"></span>
              <span>Premium engineering, minimal UI</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> uptime 99.9%
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#426369]"></span> enterprise secure
              </span>
            </div>
          </div>
        </div>
         */}
        
        <div>
          <img src={hero} className='scale-117' alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;