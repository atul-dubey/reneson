import React from 'react';
import { useData } from '../context/DataContext';
import ProjectCard from './ProjectCard';


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