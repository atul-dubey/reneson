import { useData } from "../context/DataContext";

const ScheduleCall = () => {
  const {setShowScheduler}=useData();

  return (
  <section className="py-12 px-6">
    <div className="max-w-7xl mx-auto bg-[#426369] rounded-[2.5rem] p-12 lg:p-20 lg:py-14 relative overflow-hidden text-center shadow-2xl shadow-teal-900/30">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">Ready to build something extraordinary?</h2>
        <p className="text-teal-50/80 text-lg ">Let's discuss your project and how Reneson can help you scale effectively.</p>
        <button onClick={()=>setShowScheduler(true)} className="bg-white text-[#426369] px-10 py-5 rounded-2xl font-bold hover:bg-teal-50 transition-all text-lg shadow-xl shadow-black/10 cursor-pointer">
          Schedule Free Call
        </button>
      </div>
    </div>
  </section>
)
} ;

export default ScheduleCall;