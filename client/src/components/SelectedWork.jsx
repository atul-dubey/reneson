import React from 'react';
import { useData } from '../context/DataContext';
import ProjectCard from './ProjectCard';


export default function SelectedWork() {
    const { projects, loading } = useData();

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

        {/* Projects Grid / Skeleton / Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={`skel-${i}`} className="bg-white rounded-[2rem] border border-gray-100 p-4 h-[400px] flex flex-col animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="space-y-3 flex-1">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !projects || projects.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
             <p className="text-gray-400 font-medium">Projects will be updated soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}