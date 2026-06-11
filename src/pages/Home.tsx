import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, Sparkles, Scissors, Sparkle, Heart, Smile } from 'lucide-react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Service, Testimonial } from '../types';
import { PRESET_SERVICES, PRESET_TESTIMONIALS, PRESET_SETTINGS } from '../data';

export default function Home() {
  const [services, setServices] = useState<Service[]>(PRESET_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(PRESET_TESTIMONIALS);
  
  // Before/After slider position states
  const [sliderPos, setSliderPos] = useState(50);
  const beforeAfterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesSnap = await getDocs(query(collection(db, 'services'), limit(6)));
        if (!servicesSnap.empty) {
          setServices(servicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service)));
        }
        
        const testimonialsSnap = await getDocs(query(collection(db, 'testimonials'), limit(5)));
        if (!testimonialsSnap.empty) {
          setTestimonials(testimonialsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial)));
        }
      } catch (error) {
        console.warn("Loading presets fallback for home page collections", error);
      }
    };
    fetchData();
  }, []);

  const handleSliderMove = (clientX: number) => {
    if (!beforeAfterContainerRef.current) return;
    const rect = beforeAfterContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left click dragging
      handleSliderMove(e.clientX);
    }
  };

  const handleMouseClick = (e: React.MouseEvent) => {
    handleSliderMove(e.clientX);
  };

  // Predefined lists of service icons for 6 cards
  const iconsList = [
    <Sparkles size={24} className="text-accent" />,
    <Sparkle size={24} className="text-accent" />,
    <Heart size={24} className="text-accent" />,
    <Scissors size={24} className="text-accent" />,
    <Smile size={24} className="text-accent" />,
    <Sparkles size={24} className="text-accent" />
  ];

  return (
    <div className="overflow-hidden bg-secondary">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[100vh] min-h-[600px] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920"
            alt="Body Scult Saly Banner"
            className="w-full h-full object-cover brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40 z-0"></div>

        <div className="relative z-10 max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.45em] text-accent font-semibold font-poppins mb-6">
              LE LUXE DE LA BEAUTÉ AU NATUREL
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-serif font-semibold tracking-[0.2em] mb-4">
              BODY SCULT
            </h1>
            <div className="h-[2px] w-24 bg-accent my-6"></div>
            <p className="text-lg md:text-2xl text-stone-200 mb-12 font-light tracking-wider max-w-3xl leading-relaxed">
              Votre espace beauté et bien-être à Saly.<br />
              <span className="text-stone-300 font-normal text-base md:text-lg tracking-[0.05em]">Des prestations professionnelles d'exception pour révéler votre éclat et sublimer vos sens.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md">
              <Link
                to="/services"
                className="w-full sm:w-auto glow-btn bg-accent text-white px-10 py-4.5 text-xs font-semibold uppercase tracking-[0.2em] font-poppins transition-all duration-300"
              >
                Découvrir nos services
              </Link>
              <a
                href={`https://wa.me/${PRESET_SETTINGS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto glow-btn border border-white/40 text-white hover:bg-white hover:text-black px-10 py-4.5 text-xs font-semibold uppercase tracking-[0.2em] font-poppins transition-all duration-300"
              >
                Contact WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator banner */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10 animate-bounce">
          <span className="text-[10px] text-stone-400 uppercase tracking-[0.4em] font-poppins">Faites défiler</span>
        </div>
      </section>

      {/* 2. SECTION PRÉSENTATION RAPIDE */}
      <section className="py-28 bg-white border-y border-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-accent font-poppins uppercase tracking-[0.3em] text-xs font-bold block">
                NOTRE PHILOSOPHIE
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-wide leading-tight">
                Bienvenue chez Body Scult
              </h2>
              <div className="h-[1.5px] w-12 bg-accent"></div>
              <p className="text-stone-600 text-lg leading-relaxed font-light">
                Implanté au cœur de la superbe station balnéaire de Saly au Sénégal, Body Scult est votre institut de référence dédié à la haute esthétique, au soin du corps, aux ongles précieux et à la coiffure protectrice moderne. 
              </p>
              <p className="text-stone-600 text-base leading-relaxed font-light">
                Chaque cliente bénéficie d'un accueil VIP sur-mesure dans un cadre intimiste, ultra-moderne et sécurisé. Nous sélectionnons méticuleusement des techniques novatrices et des produits cosmétiques haut de gamme pour garantir votre confort absolu et des résultats immédiats.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h4 className="font-poppins font-semibold text-primary text-xs uppercase tracking-widest mb-1">Qualité Elite</h4>
                  <p className="text-stone-500 text-sm font-light">Seulement des marques cosmétiques de prestige.</p>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-primary text-xs uppercase tracking-widest mb-1">Accueil VIP</h4>
                  <p className="text-stone-500 text-sm font-light">Boisson d'accueil et cocon de détente privatif.</p>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-primary text-xs uppercase tracking-widest mb-1">Hygiène stricte</h4>
                  <p className="text-stone-500 text-sm font-light">Matériel entièrement purifié et stérilisé.</p>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-primary text-xs uppercase tracking-widest mb-1">Expertise locale</h4>
                  <p className="text-stone-500 text-sm font-light">Professionnelles expérimentées et certifiées.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-video lg:aspect-square"
            >
              <div className="absolute inset-0 bg-accent/10 translate-x-4 translate-y-4 rounded-none z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
                alt="Body Scult Beauty Space"
                className="w-full h-full object-cover relative z-10 border border-stone-100 shadow-xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. SECTION SERVICES PHARES (6 CARTES) */}
      <section className="py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-accent font-poppins uppercase tracking-[0.33em] text-xs font-bold block">
              PRESTATIONS SIGNATURES
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-wide">
              Découvrez nos services d'exception
            </h2>
            <div className="h-[2px] w-12 bg-accent mx-auto"></div>
            <p className="text-stone-500 font-light text-sm tracking-wide">
              Une gamme prestigieuse complète de rituels de soins et mises en beauté de pointe à Saly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white group overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Image panel */}
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={service.imageUrl || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800"}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/45 transition-colors duration-500"></div>
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 right-4 bg-white/95 text-stone-800 text-[9px] uppercase tracking-widest font-semibold px-3 py-1 font-poppins">
                    {service.category}
                  </span>
                </div>

                {/* Info panel */}
                <div className="p-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="p-2.5 bg-stone-50 rounded-none group-hover:bg-accent/10 transition-colors">
                      {iconsList[index % iconsList.length]}
                    </span>
                    <h3 className="text-xl font-serif text-primary group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  
                  <p className="text-stone-500 text-sm font-light leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="pt-2">
                    <Link
                      to="/services"
                      className="text-primary font-poppins text-xs font-semibold uppercase tracking-widest inline-flex items-center space-x-2 group-hover:text-accent transition-all"
                    >
                      <span>Prestations & Tarifs</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/services"
              className="glow-btn bg-primary text-white font-poppins text-xs font-semibold uppercase tracking-[0.2em] px-10 py-5 inline-block"
            >
              Voir tous les services
            </Link>
          </div>

        </div>
      </section>

      {/* 4. SECTION AVANT / APRÈS (INTERACTIVE SLIDER) */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent font-poppins uppercase tracking-[0.3em] text-xs font-bold block">
              Savoir-faire et Perfection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-wide">
              Nos Réalisations Avant / Après
            </h2>
            <div className="h-[1.5px] w-12 bg-accent mx-auto"></div>
            <p className="text-stone-500 font-light text-sm tracking-wide">
              Faites glisser le curseur pour observer les transformations spectaculaires réalisées à l'institut.
            </p>
          </div>

          {/* Interactive slider frame */}
          <div className="max-w-3xl mx-auto">
            <div
              ref={beforeAfterContainerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onClick={handleMouseClick}
              className="relative h-[450px] w-full rounded-none overflow-hidden select-none cursor-ew-resize border border-stone-100 shadow-2xl"
            >
              {/* BEFORE (Full block underneath) */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800"
                  alt="Transformation Avant"
                  className="w-full h-full object-cover filter saturate-50 brightness-75"
                  draggable="false"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur text-white text-[10px] uppercase tracking-widest px-3 py-1 font-poppins font-semibold">
                  Avant
                </div>
              </div>

              {/* AFTER (Clipped block) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                {/* We must set a fixed width matching original container so it doesn't scale strangely */}
                <div className="absolute inset-0 min-w-[700px] md:min-w-[800px] h-full">
                  <img
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800"
                    alt="Transformation Après"
                    className="w-full h-full object-cover"
                    draggable="false"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-accent backdrop-blur text-white text-[10px] uppercase tracking-widest px-3 py-1 font-poppins font-semibold">
                  Après
                </div>
              </div>

              {/* Slide Handler bar */}
              <div
                className="absolute inset-y-0 w-[3px] bg-white cursor-ew-resize"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-accent rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white text-xs select-none">
                  ↔
                </div>
              </div>

            </div>
            
            <p className="text-center text-stone-400 text-xs mt-6 font-poppins tracking-widest uppercase">
              Glissez ou cliquez n'importe où sur l'image pour comparer
            </p>
          </div>

        </div>
      </section>

      {/* 5. SECTION TÉMOIGNAGES (GRID) */}
      <section className="py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-accent font-poppins uppercase tracking-[0.3em] text-xs font-bold block">
              SATISFACTION CLIENTE
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-wide">
              Ce que nos clientes disent de nous
            </h2>
            <div className="h-[2px] w-12 bg-accent mx-auto"></div>
            <p className="text-stone-500 font-light text-sm">
              Découvrez les avis de nos clientes locales et internationales qui nous font confiance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-white p-8 border border-stone-100 shadow-sm relative hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Golden Rating Stars */}
                <div className="flex space-x-1.5 mb-6 text-amber-400">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <p className="text-stone-600 font-light text-sm leading-relaxed mb-8 italic">
                  "{test.comment}"
                </p>

                <div className="flex items-center space-x-4 border-t border-stone-50 pt-6">
                  <img
                    src={test.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"}
                    alt={test.name}
                    className="w-12 h-12 rounded-full object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-poppins font-medium text-primary text-sm tracking-wider">
                      {test.name}
                    </h4>
                    <p className="text-stone-400 text-xs uppercase tracking-widest font-poppins">Cliente Saly</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="relative py-32 bg-primary text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] z-0">
          <img 
            src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1200" 
            alt="Body Scult Mood" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary opacity-90 z-0"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-8">
          <span className="text-accent font-poppins uppercase tracking-[0.4em] text-xs font-bold block">
            RÉSERVATION INSTANTANÉE
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide">
            Prête à révéler votre beauté ?
          </h2>
          <div className="h-[2px] w-12 bg-accent mx-auto"></div>
          <p className="text-stone-300 font-light text-lg tracking-wide max-w-2xl mx-auto leading-relaxed">
            Contactez-nous directement par téléphone ou via WhatsApp pour planifier votre séance personnalisée avec nos expertes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 max-w-md mx-auto">
            <a
              href={`https://wa.me/${PRESET_SETTINGS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto glow-btn bg-accent text-white px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] font-poppins transition-colors hover:bg-white hover:text-black"
            >
              WhatsApp Direct
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto glow-btn border border-white/30 text-white hover:bg-white hover:text-black px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] font-poppins transition-colors"
            >
              Formulaire / Accès
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
