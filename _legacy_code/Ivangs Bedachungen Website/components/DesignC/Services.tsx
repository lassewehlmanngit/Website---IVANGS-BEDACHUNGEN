import React from 'react';
import { Page, ServiceId } from '../../types';
import { ArrowRight, Layers, Umbrella, Flame, Sun } from 'lucide-react';

interface ServicesProps {
  setCurrentPage: (page: Page) => void;
  navigateToService: (id: ServiceId) => void;
}

const Services: React.FC<ServicesProps> = ({ setCurrentPage, navigateToService }) => {
  const services = [
    { 
      id: 'steildach',
      title: 'Steildach', 
      desc: 'Das Steildach ist die Krone Ihres Hauses. Schutz, Schönheit und Energieeinsparung.',
      icon: <Umbrella size={32} />,
      color: 'bg-blue-500'
    },
    { 
      id: 'flachdach',
      title: 'Flachdach', 
      desc: 'Das moderne Flachdach ist ein vielfältig nutzbares architektonisches Element.',
      icon: <Layers size={32} />,
      color: 'bg-emerald-500'
    },
     { 
      id: 'fenster',
      title: 'Fenster', 
      desc: 'Wünschen Sie sich mehr Licht, Luft und Ausblick unter Ihrem Dach?',
      icon: <Sun size={32} />,
      color: 'bg-yellow-500'
    },
     { 
      id: 'brandschaden',
      title: 'Brandschaden', 
      desc: 'Schnelle und effektive Lösungen, um Ihr Zuhause wieder sicher zu machen.',
      icon: <Flame size={32} />,
      color: 'bg-red-500'
    },
  ];

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
       {/* Background Abstract Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl -mr-64 -mt-64 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-3xl -ml-32 -mb-32 opacity-50"></div>
      </div>

      <div className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6 mb-24">
           <h1 className="text-7xl font-medium text-slate-900 mb-6 tracking-tighter">Leistungen.</h1>
           <p className="text-xl text-slate-500 max-w-2xl">Entdecken Sie unser spezialisiertes Portfolio. Klicken Sie auf einen Bereich für Details.</p>
        </div>

        <div className="container mx-auto px-6 grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div 
                key={index} 
                onClick={() => navigateToService(service.id as ServiceId)}
                className="group bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-[2.5rem] p-8 cursor-pointer hover:-translate-y-2 transition-transform duration-500"
              >
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {service.icon}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h2>
                  <p className="text-slate-500 leading-relaxed mb-6 text-lg">
                    {service.desc}
                  </p>
                  
                  <div className="h-64 rounded-2xl overflow-hidden relative">
                     <img src={`https://picsum.photos/600/400?random=${700+index}`} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;