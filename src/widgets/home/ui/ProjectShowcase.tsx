import React, { useState, useEffect } from 'react';
import { tinaField } from 'tinacms/dist/react';

export interface ProjectShowcaseProps {
  homeData?: any;
  projects?: any[];
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ homeData, projects }) => {
  // Track which images failed to load
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  
  // Default projects fallback - using local images
  const defaultProjects = [
    {
      title: 'Steildach Sanierung in Kempen',
      description: 'Sanierung',
      image: '/uploads/ivangs-steildach_Ziegeldach mit Gaubenbekleidung in Zinkstehfalz.avif',
    },
    {
      title: 'Flachdach mit Begrünung',
      description: 'Flachdach',
      image: '/uploads/ivangs_flachdach_Flachdach mit Dachbegrünung_2.avif',
    },
    {
      title: 'Dachfenster Installation',
      description: 'Fenster',
      image: '/uploads/ivangs_fenster_Ziegeldach im Denkmalschutz mit Dachfenster-Anlage.avif',
    },
  ];

  // Use direct projects prop first, then nested projectsSection, then defaults
  const rawProjectsList = projects || homeData?.projectsSection?.items || defaultProjects;
  
  // Filter out projects with failed images or no image
  const projectsList = rawProjectsList.filter((project: any, index: number) => 
    project.image && !failedImages.has(index)
  );
  
  // Handle image load error
  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set(prev).add(index));
  };
  
  // If no valid projects, don't render the section
  if (projectsList.length === 0) {
    return null;
  }
  
  // Header data with fallbacks (using nested projectsSection)
  const headerEyebrow = homeData?.projectsSection?.eyebrow || 'Referenzen';
  const headerTitle = homeData?.projectsSection?.title || 'Ergebnisse, die zählen.';

  // Dynamic grid classes based on number of projects
  const getGridClass = (count: number) => {
    if (count === 1) return 'grid md:grid-cols-1 gap-8';
    if (count === 2) return 'grid md:grid-cols-2 gap-8';
    return 'grid md:grid-cols-3 gap-8';
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="mb-12 flex justify-between items-end">
                <div>
                  <span 
                    className="text-primary font-bold uppercase tracking-wider text-sm"
                    data-tina-field={homeData?.projectsSection && tinaField(homeData.projectsSection, 'eyebrow')}
                  >
                    {headerEyebrow}
                  </span>
                  <h2 
                    className="text-h2 font-bold text-slate-900 mt-2"
                    data-tina-field={homeData?.projectsSection && tinaField(homeData.projectsSection, 'title')}
                  >
                    {headerTitle}
                  </h2>
                </div>
            </div>

            <div className={getGridClass(projectsList.length)}>
               {projectsList.map((project: any, index: number) => {
                 // Find original index for tina field bindings
                 const originalIndex = rawProjectsList.indexOf(project);
                 return (
                   <div key={originalIndex} className="group cursor-pointer">
                      <div className="relative h-72 overflow-hidden rounded-sm mb-4">
                         <img 
                           src={project.image}
                           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                           alt={project.title}
                           onError={() => handleImageError(originalIndex)}
                           data-tina-field={homeData?.projectsSection?.items?.[originalIndex] && tinaField(homeData.projectsSection.items[originalIndex], 'image')}
                         />
                         <div 
                           className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-full"
                           data-tina-field={homeData?.projectsSection?.items?.[originalIndex] && tinaField(homeData.projectsSection.items[originalIndex], 'description')}
                         >
                           {project.description}
                         </div>
                      </div>
                      <h3 
                        className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors"
                        data-tina-field={homeData?.projectsSection?.items?.[originalIndex] && tinaField(homeData.projectsSection.items[originalIndex], 'title')}
                      >
                        {project.title}
                      </h3>
                   </div>
                 );
               })}
            </div>
         </div>
      </section>
  );
};
