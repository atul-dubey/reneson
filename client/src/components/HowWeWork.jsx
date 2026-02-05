import React from 'react'

const HowWeWork = () => {

  return (
    <>
    <hr className="border-gray-100 max-w-7xl mx-auto" />
          <section className="py-24 px-6 bg-gray-50/40">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h3 className="text-5xl font-black text-gray-900 tracking-tight">How We <span className="text-[#426369]">Work</span> </h3>
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
    </>
    
  )
}

export default HowWeWork