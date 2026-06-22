import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Award, Star, Eye, Users, CheckCircle, Heart, Sparkles } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Professionnalisme',
      description: 'Une maîtrise approfondie de chaque geste technique pour des prestations impeccables.',
      icon: <Award className="text-accent" size={32} />
    },
    {
      title: 'Excellence',
      description: 'La recherche constante de la perfection, du choix de nos marques cosmétiques jusqu\'à l\'accueil.',
      icon: <Sparkles className="text-accent" size={32} />
    },
    {
      title: 'Hygiène Strictissime',
      description: 'Nous respectons des protocoles d\'hygiène drastiques. Tous les ustensiles sont purifiés et stérilisés.',
      icon: <CheckCircle className="text-accent" size={32} />
    },
    {
      title: 'Écoute & Cocon',
      description: 'Une attention sincère portée à votre morphologie, vos désirs et votre bien-être global.',
      icon: <Heart className="text-accent" size={32} />
    },
    {
      title: 'Satisfaction Cliente',
      description: 'Faire de chaque rendez-vous une parenthèse enchantée et mémorable.',
      icon: <Users className="text-accent" size={32} />
    }
  ];

  return (
    <div className="bg-secondary min-h-screen">
      
      {/* 1. HEADER */}
      <section className="bg-primary py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.1] z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200"
            alt="Body Scult About Page Decor"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-accent font-poppins uppercase tracking-[0.4em] text-xs font-bold block">
            QUI SOMMES-NOUS ?
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide">
            L'Histoire de Body Scult
          </h1>
          <div className="h-[2px] w-12 bg-accent mx-auto my-4"></div>
          <p className="text-stone-300 font-light text-lg tracking-wide max-w-2xl mx-auto">
            Une signature esthétique haut de gamme, mariant élégance moderne française et hospitalité chaleureuse sénégalaise.
          </p>
        </div>
      </section>

      {/* 2. HISTORY & PARCOURS BLOCK */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-accent font-poppins uppercase tracking-[0.3em] text-xs font-bold block">NOTRE GENÈSE</span>
              <h2 className="text-4xl font-serif text-primary tracking-wide">Depuis 2021 à Saly Senegal</h2>
              <div className="h-[2px] w-12 bg-accent"></div>
              
              <p className="text-stone-600 font-light text-base leading-relaxed">
                Fondé en 2021 à Saly, station balnéaire légendaire sur la Petite-Côte sénégalaise, **Body Scult** est né de la volonté de créer un cocon d'esthétique d'inspiration internationale mais profondément ancré localement. 
              </p>
              
              <p className="text-stone-600 font-light text-base leading-relaxed">
                Notre mission est d'amener les rituels de soin, les techniques de modelage, la haute coiffure africaine et l'onglerie fine aux standards d'élégance les plus rigoureux. Pour ce faire, nous formons continuellement nos talents et collaborons uniquement avec de prestigieuses gammes de cosmétiques saines et validées cliniquement.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="border-l-4 border-accent pl-4 py-2 bg-stone-50">
                  <h4 className="font-poppins font-semibold text-primary text-sm uppercase tracking-wider">Notre Vision</h4>
                  <p className="text-stone-500 text-xs font-light mt-1">Devenir l'écrin de référence absolue du soin esthétique de la Petite-Côte sénégalaise.</p>
                </div>
                <div className="border-l-4 border-accent pl-4 py-2 bg-stone-50">
                  <h4 className="font-poppins font-semibold text-primary text-sm uppercase tracking-wider">Notre Mission</h4>
                  <p className="text-stone-500 text-xs font-light mt-1">Prendre soin de votre santé capillaire et cutanée tout en révélant l'élégance de vos atouts.</p>
                </div>
              </div>
            </motion.div>

            {/* Grid of details images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/images/galleries/img1.jpeg"
                // src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400"
                alt="Body Scult Design 1"
                className="w-full h-80 object-cover border border-stone-100 shadow-lg"
                referrerPolicy="no-referrer"
              />
              <img
                src="/images/galleries/img2.jpeg"
                // src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400"
                alt="Body Scult Design 2"
                className="w-full h-80 object-cover mt-12 border border-stone-100 shadow-lg"
                referrerPolicy="no-referrer"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. FOUNDER PROFILE SHOWCASE */}
      <section className="py-28 bg-[#FAF7F2] border-y border-stone-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Founder picture */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 translate-x-4 translate-y-4 z-0"></div>
                <img
                  src="/images/Aminata_Diallo_body_scult.png"
                  // src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                  alt="La Fondatrice de Body Scult"
                  className="w-full h-[450px] object-cover relative z-10 border border-stone-100 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* Founder textual profile */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 space-y-6"
            >
              <span className="text-accent font-poppins uppercase tracking-[0.3em] text-xs font-bold block">
                LA FONDATRICE & DIRECTRICE
              </span>
              <h2 className="text-4xl font-serif text-primary tracking-wide">
                Aminata DIALLO
              </h2>
              <p className="text-stone-400 text-xs font-poppins uppercase tracking-widest -mt-2">
                Experte en Soins de Beauté & Haute Cosmétique Clinique
              </p>
              
              <div className="h-[1px] w-16 bg-accent"></div>

              <p className="text-stone-600 font-light text-base leading-relaxed">
                Après s'être formée dans de prestigieux instituts de beauté en Europe et en Afrique, Aminata DIALLO a choisi de concrétiser sa vision au Sénégal en créant **Body Scult** en plein cœur de Saly. Son ambition majeure est d'offrir une expérience de soin digne de la haute clinique esthétique mondiale, dans une ambiance chaleureuse et détendue propice au repos absolu de l'esprit.
              </p>

              <blockquote className="border-l-4 border-accent pl-6 py-2 text-stone-700 italic font-serif text-lg leading-relaxed bg-white">
                "La beauté n'est pas qu'un apparat. C'est l'expression saine et rayonnante de votre bien-être intérieur. Chez Body Scult, chaque moment est conçu pour magnifier et soulager votre être."
              </blockquote>

              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <h4 className="text-3xl font-serif text-primary font-semibold">12+</h4>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-poppins mt-1">Années d'Expérience</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-primary font-semibold">10K+</h4>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-poppins mt-1">Clientes Sublimées</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-primary font-semibold">100%</h4>
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-poppins mt-1">Hygiène & Satisfaction</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. VALUES SHOWCASE AND CARDS */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-accent font-poppins uppercase tracking-[0.3em] text-xs font-bold block">EXIGENCE ÉTHIQUE</span>
            <h2 className="text-4xl font-serif text-primary tracking-wide">Ce Qui Nous Anime au Quotidien</h2>
            <div className="h-[2px] w-12 bg-accent mx-auto"></div>
            <p className="text-stone-500 font-light text-sm max-w-lg mx-auto">
              Nos cinq piliers fondamentaux garantissent une expérience esthétique inégalée à Saly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-stone-50 border border-stone-100 p-10 hover:shadow-lg transition-shadow duration-300 relative flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-serif text-primary tracking-wide">
                    {val.title}
                  </h3>
                  <p className="text-stone-500 font-light text-sm leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-100 mt-6 flex justify-between items-center text-[10px] uppercase font-poppins tracking-widest text-stone-400">
                  <span>CHARTE BODY SCULT</span>
                  <span>EFFICACITÉ</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
