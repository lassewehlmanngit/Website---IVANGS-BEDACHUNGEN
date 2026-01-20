import React from 'react';
import { tinaField } from 'tinacms/dist/react';

export interface ProjectShowcaseProps {
  homeData?: any;
  projects?: any[];
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ homeData, projects }) => {
  // Use projects from TinaCMS if available, otherwise fall back to hardcoded defaults
  const projectsList = projects || [
    {
      title: 'Einfamilienhaus in Kempen',
      description: 'Sanierung',
      image: 'https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Gewerbehalle Viersen',
      description: 'Flachdach',
      image: 'https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Neubau in Willich',
      description: 'Solar',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    },
  ];
  
  // Header data with fallbacks (using flattened fields)
  const headerEyebrow = homeData?.projectsEyebrow || 'Referenzen';
  const headerTitle = homeData?.projectsTitle || 'Ergebnisse, die zählen.';

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
                    data-tina-field={homeData && tinaField(homeData, 'projectsEyebrow')}
                  >
                    {headerEyebrow}
                  </span>
                  <h2 
                    className="text-4xl font-bold text-slate-900 mt-2"
                    data-tina-field={homeData && tinaField(homeData, 'projectsTitle')}
                  >
                    {headerTitle}
                  </h2>
                </div>
            </div>

            <div className={getGridClass(projectsList.length)}>
               {projectsList.map((project: any, index: number) => (
                 <div key={index} className="group cursor-pointer">
                    <div className="relative h-72 overflow-hidden rounded-sm mb-4">
                       <img 
                         src={project.image}
                         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                         alt={project.title}
                         data-tina-field={projects && tinaField(projects[index], 'image')}
                       />
                       <div 
                         className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-full"
                         data-tina-field={projects && tinaField(projects[index], 'description')}
                       >
                         {project.description}
                       </div>
                    </div>
                    <h3 
                      className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors"
                      data-tina-field={projects && tinaField(projects[index], 'title')}
                    >
                      {project.title}
                    </h3>
                 </div>
               ))}
            </div>
         </div>
      </section>
  );
};
