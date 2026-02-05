import React, { useEffect, useState } from "react";
import { Linkedin, Github } from "lucide-react";
import axios from "axios";

const TeamCard = ({ name, specialty, linkedin, github, image }) => (
  <div className="w-full max-w-[300px] group relative overflow-hidden rounded-[1.75rem] bg-white border border-gray-100 transition-shadow duration-300 hover:shadow-md">
    {/* Image */}
    <div className="relative aspect-[4/5] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-all duration-500 group-hover:contrast-110"
      />

      {/* Social Icons */}
      <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-3 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 border border-gray-100">
          <a
            href={linkedin}
            target="_blank"
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#426369] hover:bg-[#426369] hover:text-white transition-colors"
          >
            <Linkedin size={14} />
          </a>
          <a
            href={github}
            target="_blank"
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#426369] hover:bg-[#426369] hover:text-white transition-colors"
          >
            <Github size={14} />
          </a>
        </div>
      </div>
    </div>

    {/* Info */}
    <div className="text-center px-4 py-5">
      <h4 className="text-lg font-black text-gray-900 tracking-tight uppercase mb-1 group-hover:text-[#426369] transition-colors duration-300">
        {name}
      </h4>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.28em] font-mono">
        {specialty}
      </p>
    </div>
  </div>
);


export default function CoreTeam() {

    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/team/all`);
            setTeam(res.data.data);
        } catch (error) {
            console.error("Failed to fetch team", error);
        } finally {
            setLoading(false);
        }
        };

        fetchTeam();
    }, []);


  return (
    <section className="py-30 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">

        <div className="text-center mb-6">
            <h3 className="text-5xl font-black text-gray-900 tracking-tight">Core <span className="text-[#426369]">Team</span> </h3>
        </div>
          <p className="text-gray-400 text-md font-medium leading-relaxed max-w-xl mx-auto italic">
            "Engineered by a diverse collective of specialists driven by precision
            and technical impact."
          </p>
        </div>

        {/* FLEX LAYOUT — PERFECT CENTERING */}
        <div className="flex flex-wrap justify-center gap-10">
          {team.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
