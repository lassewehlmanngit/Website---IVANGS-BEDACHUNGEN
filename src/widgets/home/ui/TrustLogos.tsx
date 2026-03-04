import React from 'react';

export const TrustLogos: React.FC = () => {
    const logos = [
        { src: '/uploads/dachdecker-vereinigung.avif', alt: 'Dachdecker Vereinigung' },
        { src: '/uploads/velux.avif', alt: 'Velux' },
        { src: '/uploads/bimet.avif', alt: 'Bimet' },
    ];

    return (
        <section className="py-12 bg-white relative overflow-hidden">
            {/* Subtle decorative background element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">
                        Ausgezeichnete Qualität & Starke Partner
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 lg:gap-32">
                        {logos.map((logo, idx) => (
                            <div
                                key={idx}
                                className="group relative flex items-center justify-center transition-all duration-500 ease-out"
                            >
                                {/* Hover Glow */}
                                <div className="absolute -inset-6 bg-slate-50 rounded-full scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 -z-10"></div>

                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </section>
    );
};
