import React from 'react';
import { Star, StarHalf, User, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    avatar: null, 
    name: "James Smith",
    role: "CTO, LogiSync",
    text: "Reneson transformed our manual logistics process into a fully automated IoT-driven system. Their attention to detail is unmatched.",
    star: 5,
  },
  {
    avatar: "https://res.cloudinary.com/dmg0a7wv7/image/upload/v1766664584/carRental/zsclyrtozm25kreyjlcg.jpg",
    name: "Anurag patel",
    role: "Founder, ShopNext",
    text: "The web platform developed by Reneson is incredibly fast and intuitive. Our conversion rates increased by 40% in the first quarter.",
    star: 4.5,
  },
  {
    avatar: null,
    name: "Marc Davis",
    role: "Head of Product, GreenFlow",
    text: "Working with their engineering team was a breeze. They integrated seamlessly with our existing stack and delivered ahead of schedule.",
    star: 4,
  }
];

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // Full Star
      stars.push(<Star key={i} className="w-4 h-4 fill-[#426369] text-[#426369]" />);
    } else if (i - 0.5 <= rating) {
      // Half Star
      stars.push(<StarHalf key={i} className="w-4 h-4 fill-[#426369] text-[#426369]" />);
    } else {
      // Empty Star
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

const Testimonials = () => (
  <section className="py-24 bg-gray-50/50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="space-y-4">
          <h2 className="text-[#426369] font-bold uppercase tracking-widest text-sm">Testimonials</h2>
          <h3 className="text-4xl font-extrabold text-gray-900">What our clients say</h3>
        </div>
        <div className="flex gap-4">
          <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#426369] group transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-white" />
          </button>
          <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#426369] group transition-all">
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
            <div className="space-y-6">
              <RatingStars rating={t.star} />
              <p className="text-gray-600 italic leading-relaxed">"{t.text}"</p>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              {/* Avatar Logic: Show image if exists, else show User icon */}
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden border border-gray-100">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-[#426369]" />
                )}
              </div>
              
              <div>
                <h6 className="font-bold text-gray-900 text-sm">{t.name}</h6>
                <p className="text-gray-400 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;