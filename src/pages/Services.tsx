import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Service } from '../types';
import { PRESET_SERVICES, PRESET_SETTINGS } from '../data';
import { Sparkle, HelpCircle } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState<Service[]>(PRESET_SERVICES);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'services'));
        if (!querySnapshot.empty) {
          setServices(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service)));
        }
      } catch (error) {
        console.warn("Using preset services for collections on services catalog page", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['Tous', 'Minceur', 'Massages', 'Onglerie', 'Soins', 'Esthétique'];

  const filteredServices = activeCategory === 'Tous'
    ? services
    : services.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  // Sub-prestations associated with each service category/ID for realistic luxury showcase
  const categorySubItems: Record<string, string[]> = {
    'maderotherapie': [
      'Madérothérapie corps complet — Drainage et remodelage',
      'Cure minceur intensive (5 / 10 séances) sur-mesure',
      'Séance ciblée zones critiques (cuisses, ventre ou bras)'
    ],
    'drainage-post-op': [
      'Post-chirurgie (Liposuccion, Abdominoplastie, BBL)',
      'Soin post-partum d\'exception (BBY / Mummy Makeover)',
      'Relance circulatoire, élimination d\'œdèmes & cicatrisation'
    ],
    'lipocavitation': [
      'Traitement ciblé de la cellulite fibreuse par ultrasons',
      'Aide à l\'élimination naturelle des graisses profondes',
      'Combine Radiofréquence raffermissante visage & corps'
    ],
    'lifting-colombien': [
      'Lifting des fesses par ventouses à dépression (non-invasif)',
      'Stimulation de la fermeté cutanée et fesses galbées',
      'Protocole sur-mesure pour un fessier idéalement sculpté'
    ],
    'massage-tonique': [
      'Libération intense des points de tension musculaires',
      'Dénouement des courbatures et régulation du flux sanguin',
      'Idéal après des séances de sport ou une fatigue corporelle'
    ],
    'massage-relaxant': [
      'Parenthèse sensorielle aux huiles parfumées divines de coco',
      'Libération totale du stress intellectuel et relaxation profonde',
      'Gestes continus propices à une évasion absolue de l\'esprit'
    ],
    'massage-californien': [
      'Chorégraphie enveloppante lente et fluide de tout le corps',
      'Libération de l\'anxiété pour une harmonie totale',
      'Idéal pour une initiation en douceur aux bienfaits du massage'
    ],
    'massage-amincissant': [
      'Idéal combo palper-rouler manuel dynamique des zones rebelles',
      'Accélérateur de déstockage des capitons et drainage local',
      'Complément idéal des rituels Madérothérapie & Cavitation'
    ],
    'pedicure': [
      'Bain de pieds sensoriel au sel de mer fin et huiles bio',
      'Soin rigoureux des ongles, cuticules et traitement callosités',
      'Modelage relaxant au karité suivi d\'une mise en beauté'
    ],
    'manucure': [
      'Soin des ongles et dégagement parfait des cuticules',
      'Manucure russe de précision pour un contour net d\'ongle',
      'Massage nourrissant et application d\'une base protectrice'
    ],
    'onglerie': [
      'Pose complète Gel ou Résine premium (Chablons / Capsules)',
      'Vernis semi-permanent ultra-brillant — Tenue 3 semaines',
      'Renforcement de l\'ongle naturel (gainage) & Nail Art fait main'
    ],
    'extension-cils': [
      'Volume Russe intense (3D à 5D) — Regard irrésistible de star',
      'Pose Cil à Cil naturelle pour sublimer la frange de cils',
      'Rehaussement de cils de soie avec teinture noire intense'
    ],
    'henne': [
      'Henné fin artistique traditionnel sénégalais & mauritanien',
      'Dessins raffinés faits à main levée pour mariées ou événements',
      'Henné naturel haute qualité à couleur riche et longue durée'
    ],
    'soin-visage': [
      'Nettoyage en profondeur, extraction des impuretés et comédons',
      'Soin hydratant et équilibrant personnalisé à votre type de peau',
      'Modelage liftant visage & masque repulpant adapté'
    ],
    'hydrafacial-dermaplaning': [
      'Hydrafacial complet par aspiration sous infusion de sérums',
      'Dermaplaning précis éliminant peaux mortes et velouté duvet',
      'Teint instantanément lisse étincelant avec effet "glass skin"'
    ],
    'gommage-corps': [
      'Exfoliation gourmande complète au sucre brun, café ou sels bio',
      'Stimulation de la régénération cellulaire et douceur infinie',
      'Finalisé par un voile hydratant satiné au beurre d\'amande'
    ],
    'epilation': [
      'Épilation complète ou ciblée à la cire chaude traditionnelle',
      'Prestation douce respectueuse des zones sensibles corporelles',
      'Soin réparateur post-épilation laissant la peau impeccable'
    ],
    'damp-traditionnel': [
      'Véritable bain de vapeurs organique aux racines odorantes',
      'Décoctions végétales médicinales de nos riches traditions',
      'Rituel secret de séduction, détox et d\'harmonie sénégalaise'
    ],
    'massage-pierres-chaudes': [
      'Modelage magique associant chaleur thermique et gestes fluides',
      'Chaleur bienfaisante des pierres de basalte sur vos méridiens',
      'Relâchement d\'une efficacité inouïe des contractures du dos'
    ]
  };

  return (
    <div className="bg-secondary min-h-screen">
      
      {/* 1. HEADER */}
      <section className="bg-primary py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.1] z-0">
          <img
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1200"
            alt="Body Scult Services Decor"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-accent font-poppins uppercase tracking-[0.4em] text-xs font-bold block">
            NOTRE CATALOGUE ÉLITE
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide">
            Prestations de Prestige
          </h1>
          <div className="h-[2px] w-12 bg-accent mx-auto my-4"></div>
          <p className="text-stone-300 font-light text-lg tracking-wide max-w-2xl mx-auto">
            Découvrez nos rituels pour révéler votre beauté et vous accorder un moment d'évasion inoubliable à Saly.
          </p>
        </div>
      </section>

      {/* 2. STICKY FILTER BAR */}
      <section className="py-8 bg-white border-y border-stone-100 sticky top-24 z-30 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-3 md:space-x-4 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 text-xs font-poppins tracking-widest uppercase font-semibold transition-all duration-300 rounded-none ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-lg'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. CATALOG GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="h-12 w-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs uppercase tracking-widest font-poppins">Chargement du catalogue premium...</span>
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-stone-150 shadow-sm flex flex-col md:flex-row overflow-hidden group"
                >
                  
                  {/* Left Side: Service Image */}
                  <div className="w-full md:w-5/12 h-64 md:h-auto min-h-[250px] relative overflow-hidden shrink-0">
                    <img
                      src={service.imageUrl || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600'}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors"></div>
                    <span className="absolute bottom-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest px-3 py-1 font-poppins font-semibold">
                      {service.category}
                    </span>
                  </div>

                  {/* Right Side: Descriptions & Detailed Subservices */}
                  <div className="p-8 flex flex-col justify-between flex-grow">
                    <div className="space-y-4">
                      
                      {/* Premium Accent */}
                      <div className="flex items-center space-x-1 text-accent">
                        <Sparkle size={12} fill="currentColor" />
                        <span className="text-[10px] tracking-[0.3em] font-semibold uppercase font-poppins">Prestation Body Scult</span>
                      </div>

                      <h3 className="text-2xl font-serif text-primary tracking-wide">
                        {service.name}
                      </h3>

                      <p className="text-stone-500 font-light text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {service.details && (
                        <p className="text-stone-400 font-light text-xs leading-relaxed italic border-l-2 border-accent/20 pl-3">
                          {service.details}
                        </p>
                      )}

                      {/* Displaying detailed prestations list for realistic rich frontend */}
                      <div className="pt-4 border-t border-stone-100 space-y-2.5">
                        <h4 className="text-[10px] uppercase font-poppins tracking-[0.2em] font-bold text-stone-700">prestations associées :</h4>
                        {categorySubItems[service.id] ? (
                          <ul className="space-y-2">
                            {categorySubItems[service.id].map((item, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-xs font-light text-stone-600 font-poppins-light">
                                <span className="text-accent mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-stone-400 text-xs font-light">Contactez-nous pour connaître toutes nos déclinaisons de tarifs.</p>
                        )}
                      </div>

                    </div>

                    <div className="pt-6">
                      <a
                        href={`https://wa.me/${PRESET_SETTINGS.whatsapp}?text=Bonjour%20Body%20Scult%2C%20je%20souhaite%20des%20informations%20ou%20un%20rendez-vous%20pour%20le%20service%3A%20${encodeURIComponent(service.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-stone-50 hover:bg-accent hover:text-white border border-stone-250 font-poppins text-[10px] font-semibold uppercase tracking-[0.15em] px-4 py-2.5 transition-colors duration-300 focus:outline-none w-full text-center block"
                      >
                        Demander un rdv via WhatsApp
                      </a>
                    </div>

                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-20 bg-white border border-stone-100">
            <p className="text-stone-500 text-lg">Aucune prestation trouvée pour cette catégorie.</p>
          </div>
        )}
      </section>

      {/* 4. OTHER PRESTATIONS AND EXPLANATION */}
      <section className="py-24 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <HelpCircle size={32} className="text-accent mx-auto" />
          <h3 className="text-3xl font-serif text-primary tracking-wide">Une demande spécifique ?</h3>
          <p className="text-stone-600 font-light text-base leading-relaxed max-w-2xl mx-auto">
            Chez Body Scult, nous relevons tous les défis beauté. Si vous souhaitez un service de soin personnalisé, un lissage brésilien profond spécifique, ou toute autre demande, n'hésitez pas à en discuter avec notre équipe d'expertes.
          </p>
          <div className="pt-4">
            <a
              href={`https://wa.me/${PRESET_SETTINGS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn bg-accent text-white px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] font-poppins inline-block"
            >
              Envoyer un message WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
