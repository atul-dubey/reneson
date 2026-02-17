import { useNavigate } from "react-router-dom";
import { servicesData as services} from "../assets/services";

const Services = () => {
  const navigate = useNavigate();

  return (
  <section id="services" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-[#426369] font-bold uppercase tracking-widest text-sm">What We Do</h2>
        <h3 className="text-4xl font-extrabold text-gray-900">Our Services</h3>
        <p className="text-gray-500">Building reliable, scalable, and future-ready technology solutions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div 
            key={index} 
            onClick={() => navigate(`/service/${service.title}`)}
            className="group relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-[#426369]/20 hover:shadow-2xl hover:shadow-[#426369]/10 transition-all duration-500 cursor-pointer flex flex-col h-full overflow-hidden"
          >
          
            <div className="mb-6 w-12 h-12 rounded-lg bg-[#426369]/5 flex items-center justify-center group-hover:bg-[#426369] transition-colors duration-500">
              <service.icon className="w-6 h-6 text-[#426369] group-hover:text-white transition-transform duration-500" />
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#426369] transition-colors duration-300">
              {service.title}
            </h3>
            
            <p className="text-gray-500 leading-relaxed text-sm mb-8 flex-grow">
              {service.shortDesc}
            </p>
            
            <div className="pt-4 border-t border-gray-50 mt-auto flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
              <span className="text-[#426369] font-bold text-xs tracking-wider">
                EXPLORE SERVICE
              </span>
              <div className="w-8 h-8 rounded-full bg-[#426369] flex items-center justify-center text-white">
                 <span className="text-lg">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)};

export default Services;