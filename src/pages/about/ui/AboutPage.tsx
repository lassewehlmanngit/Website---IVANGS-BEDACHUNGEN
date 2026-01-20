import React from 'react';
import { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { OptimizedImage } from '@/shared/ui/Image';
import { CheckCircle, Hammer, Mail, User } from 'lucide-react';
import { teamMembers, getLeadership, getOfficeTeam, getCraftsmen } from '@/features/company/model/teamData';
import { useTina, tinaField } from 'tinacms/dist/react';
import { useAboutPageData } from '@/shared/lib/tina/useAboutPageData';

export const AboutPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  const leadership = getLeadership();
  const officeTeam = getOfficeTeam();
  const craftsmen = getCraftsmen();
  
  // Fetch about page data from TinaCMS with visual editing support
  const { data } = useAboutPageData(lang);
  
  // Fallback to defaults if no data
  const about = data?.aboutPage || {};
  const hero = about.hero || {};
  const story = about.story || {};
  const equipment = about.equipment || {};
  const teamSection = about.teamSection || {};
  const cta = about.cta || {};

  return (
    <>
      <Seo 
        title={about.seo?.title || "Über Uns - Ivangs Bedachungen"} 
        description={about.seo?.description || "Seit 1996: Ein Familienbetrieb, der hoch hinaus will. 28 Mitarbeiter, eigener Kran und modernste Technik."}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />
      <div className="animate-fade-in">
        {/* Header */}
        <div className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 z-0"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <span className="text-primary font-bold uppercase tracking-wider text-xs sm:text-sm mb-3 md:mb-4 block" data-tina-field={data && tinaField(data.aboutPage, 'hero.eyebrow')}>
              {hero.eyebrow || 'Das Unternehmen'}
            </span>
            <h1 className="text-h1 font-bold mb-4 md:mb-6" data-tina-field={data && tinaField(data.aboutPage, 'hero.title')}>
              {hero.title || 'Seit 1996: Ein Familienbetrieb, der hoch hinaus will.'}
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed" data-tina-field={data && tinaField(data.aboutPage, 'hero.description')}>
              {hero.description || 'Vom Ein-Mann-Betrieb zum 28-köpfigen Kompetenz-Team. Wir verbinden Tradition mit modernster Technik.'}
            </p>
          </div>
        </div>

        {/* Main Introduction */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
             <div>
                <h2 className="text-h2 font-bold text-slate-900 mb-4 md:mb-6" data-tina-field={data && tinaField(data.aboutPage, 'story.title')}>
                  {story.title || 'Qualität ist bei uns Familiensache.'}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6" data-tina-field={data && tinaField(data.aboutPage, 'story.text1')}>
                  {story.text1 || 'Was 1996 als Vision von Dachdeckermeister Marcus Ivangs begann, ist heute eine feste Größe im Kreis Viersen und darüber hinaus. Doch trotz unseres Wachstums auf 28 Mitarbeiter und 8 LKWs haben wir eines nie verloren: Den persönlichen Draht zu unseren Kunden.'}
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-8" data-tina-field={data && tinaField(data.aboutPage, 'story.text2')}>
                  {story.text2 || 'Bei uns sind Sie keine Nummer, sondern ein Partner. Wir setzen auf langfristige Beziehungen und handwerkliche Ehrlichkeit.'}
                </p>
                
                <div className="flex flex-col gap-4">
                   {(about.values || [{ text: 'Inhabergeführt seit über 25 Jahren' }, { text: 'Ausbildungsbetrieb (derzeit 5 Azubis)' }, { text: 'Modernster Maschinenpark & eigener Kran' }]).map((value: any, i: number) => (
                     <div key={i} className="flex items-center gap-3" data-tina-field={data && tinaField(data.aboutPage, `values.${i}.text`)}>
                       <CheckCircle className="text-primary shrink-0" size={24} />
                       <span className="font-semibold text-slate-800">{value.text}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-sm -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-100 rounded-sm -z-10"></div>
                <OptimizedImage 
                  src={story.image || "https://images.unsplash.com/photo-1621251939103-6f59c8821035?q=80&w=2070&auto=format&fit=crop"} 
                  alt="Modern Roof Architecture" 
                  className="w-full h-auto rounded-md"
                  data-tina-field={data && tinaField(data.aboutPage, 'story.image')}
                />
             </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-16 md:py-20 bg-primary/5">
           <div className="container mx-auto px-4 text-center max-w-4xl">
              <Hammer size={40} className="md:w-12 md:h-12 text-primary mx-auto mb-4 md:mb-6" />
              <h2 className="text-h2 font-bold text-slate-900 mb-3 md:mb-4" data-tina-field={data && tinaField(data.aboutPage, 'equipment.title')}>
                {equipment.title || 'Wir warten nicht auf Material. Wir haben es.'}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed" data-tina-field={data && tinaField(data.aboutPage, 'equipment.description')}>
                 {equipment.description || 'Mit eigenen Lagerräumen, einem modernen Maschinenpark und dem firmeneigenen Autokran (IVANGS Bauservice) sind wir unabhängig von Mietfirmen und Lieferengpässen. Das bedeutet für Sie: Keine unnötigen Verzögerungen auf der Baustelle.'}
              </p>
           </div>
        </section>

        {/* Full Team Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 md:mb-16 text-center">
               <h2 className="text-h2 font-bold text-slate-900" data-tina-field={data && tinaField(data.aboutPage, 'teamSection.title')}>
                 {teamSection.title || 'Unser Team'}
               </h2>
               <p className="text-slate-600 mt-4 max-w-2xl mx-auto" data-tina-field={data && tinaField(data.aboutPage, 'teamSection.description')}>
                 {teamSection.description || `Hinter jedem dichten Dach steht ein starkes Team. ${teamMembers.length} Mitarbeiter, die aufeinander eingespielt sind.`}
               </p>
            </div>

            {/* Leadership */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Geschäftsführung & Bauleitung
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {leadership.map((member) => (
                  <div key={member.id} className="bg-slate-50 p-6 rounded-sm border border-slate-100 flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <User size={28} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">{member.name}</h4>
                      <p className="text-sm text-slate-500 mb-2">{member.role}</p>
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                          <Mail size={14} /> {member.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Team */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Büro & Verwaltung
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {officeTeam.map((member) => (
                  <div key={member.id} className="bg-slate-50 p-6 rounded-sm border border-slate-100">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <User size={20} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-slate-900">{member.name}</h4>
                    <p className="text-sm text-slate-500 mb-2">{member.role}</p>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-xs text-primary hover:underline">
                        {member.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Craftsmen */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Unsere Dachdecker
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {craftsmen.map((member) => (
                  <div key={member.id} className="bg-slate-50 p-4 rounded-sm border border-slate-100 text-center">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User size={18} className="text-slate-500" />
                    </div>
                    <h4 className="font-semibold text-sm text-slate-900">{member.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Note */}
            <div className="mt-16 bg-primary/5 p-8 rounded-sm border border-primary/10 text-center">
              <h3 className="font-bold text-xl text-slate-900 mb-2">Wir bilden aus!</h3>
              <p className="text-slate-600">
                Derzeit bilden wir <strong>fünf Auszubildende</strong> zum Dachdecker aus. 
                Wir investieren in die Zukunft des Handwerks.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-h2 font-bold mb-4 md:mb-6" data-tina-field={data && tinaField(data.aboutPage, 'cta.title')}>
               {cta.title || 'Lernen Sie uns kennen'}
             </h2>
             <p className="text-slate-300 max-w-2xl mx-auto mb-8" data-tina-field={data && tinaField(data.aboutPage, 'cta.description')}>
               {cta.description || 'Sie planen ein Neubauprojekt oder eine Sanierung? Lassen Sie uns darüber sprechen. Wir beraten Sie gerne unverbindlich vor Ort.'}
             </p>
             <a href={`mailto:${cta.email || 'bedachungen@ivangs.de'}`} className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-sm font-bold hover:bg-primary/90 transition-colors shadow-lg" data-tina-field={data && tinaField(data.aboutPage, 'cta.buttonText')}>
               <Mail size={20} /> {cta.buttonText || 'Kontakt aufnehmen'}
             </a>
          </div>
        </section>
      </div>
    </>
  );
};
