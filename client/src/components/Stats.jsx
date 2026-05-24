import { useData } from "../context/DataContext";


const Stats = () => {
  const { stats, loading } = useData();

  if (!loading && (!stats || stats.length === 0)) return null;

  return (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={`skel-${i}`} className="text-center flex flex-col items-center animate-pulse">
              <div className="h-20 w-32 bg-gray-200 rounded-2xl mb-4"></div>
              <div className="w-12 h-1 bg-gray-200 mx-auto mb-4 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-7xl font-black text-[#426369] mb-4 tracking-tighter transition-transform duration-500 group-hover:scale-105">
                {stat.value}+
              </div>
              <div className="w-12 h-1 bg-[#426369]/10 mx-auto mb-4 rounded-full group-hover:w-20 transition-all duration-500"></div>
              <div className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                {stat.label}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </section>)

} ;

export default Stats;