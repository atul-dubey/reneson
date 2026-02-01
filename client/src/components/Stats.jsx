import { useData } from "../context/DataContext";


const Stats = () => {

  const {stats}=useData();

  return (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center group">
            <div className="text-7xl font-black text-[#426369] mb-4 tracking-tighter transition-transform duration-500 group-hover:scale-105">
              {stat.value}+
            </div>
            <div className="w-12 h-1 bg-[#426369]/10 mx-auto mb-4 rounded-full group-hover:w-20 transition-all duration-500"></div>
            <div className="text-gray-500 font-bold uppercase tracking-widest text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>)

} ;

export default Stats;