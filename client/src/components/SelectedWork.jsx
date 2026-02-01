import React from 'react';
import { useData } from '../context/DataContext';


const ProjectCard = ({ title, description, tech, image }) => (
  <div className="group bg-white rounded-[1.5rem] overflow-hidden border border-gray-100 hover:border-[#426369]/20 transition-all duration-500">
    {/* 1. Full Image (Monochrome to Color) */}
    <div className="aspect-[16/10] overflow-hidden bg-gray-100">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
      />
    </div>

    {/* Content Container */}
    <div className="p-10 text-center flex flex-col items-center">
      {/* 2. Title */}
      <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">
        {title}
      </h3>
      
      {/* 3. Short Description */}
      <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
        {description}
      </p>
      
      {/* 4. Technologies (Minimal subtle tags) */}
      <div className="flex flex-wrap justify-center gap-2">
        {tech.map((item, index) => (
          <span 
            key={index} 
            className="text-[10px] font-bold text-[#426369] uppercase tracking-[0.2em] px-3 py-1 bg-gray-50 rounded-full border border-transparent group-hover:border-[#426369]/10 transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function SelectedWork() {

    const {projects}=useData();

  return (
    <section id="portfolio" className="py-30 bg-gray-50/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Centered Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          {/* <h2 className="text-[#426369] font-bold uppercase tracking-[0.4em] text-xs">
            Selected Work
          </h2> */}
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Selected Work
          </h3>
          <p className="text-gray-500 text-lg">
            A glimpse of the solutions we’ve engineered across industries and technologies. Minimal and Clear.
          </p>
        </div>

        {/* Projects Grid (Max 3 Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

      </div>
    </section>
  );
}