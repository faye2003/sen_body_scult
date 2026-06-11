import { Service, GalleryImage, Testimonial, GalleryVideo, SalonSettings } from './types';

export const PRESET_SETTINGS: SalonSettings = {
  name: 'Body Scult',
  phone: '+221 77 123 45 67',
  whatsapp: '+221771234567',
  address: 'Résidence les Alizés, Route de Saly, Saly, Sénégal',
  email: 'contact@bodyscult-saly.com',
  description: 'Votre espace beauté et bien-être à Saly. Des prestations d\'exception pour révéler votre éclat naturel.',
  hours: {
    lundi: '09:00 - 19:00',
    mardi: '09:00 - 19:00',
    mercredi: '09:00 - 19:00',
    jeudi: '09:00 - 19:00',
    vendredi: '09:00 - 20:00',
    samedi: '09:00 - 20:00',
    dimanche: 'Fermé',
  }
};

export const PRESET_SERVICES: Service[] = [
  {
    id: 'maderotherapie',
    name: 'Madérothérapie',
    description: 'Technique de remodelage corporel ancestrale utilisant des outils en bois nobles pour éliminer la cellulite et sculpter la silhouette.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    category: 'Minceur',
    details: 'Pratique extrêmement performante de remodelage. Nos expertes utilisent des rouleaux, coupes et outils en bois spécifiques sculptés pour agir en profondeur, relancer la circulation lymphatique, cibler les amas graisseux et raffermir visiblement la peau dès la première séance.'
  },
  {
    id: 'drainage-post-op',
    name: 'Drainage Lymphatique Post-Opératoire',
    description: 'Soin doux et hautement qualifié indispensable après une chirurgie esthétique (liposuccion, abdominoplastie) ou un accouchement (Mummy Makeover / BBY).',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800',
    category: 'Minceur',
    details: 'Ce protocole ciblé accélère la résorption des œdèmes, diminue les gonflements, évite les vagues cutanées post-opératoires et soulage les tissus. Idéal pour optimiser les résultats chirurgicaux ou vous accompagner confortablement dans votre post-partum (BBY).'
  },
  {
    id: 'lipocavitation',
    name: 'Lipocavitation',
    description: 'Traitement minceur technologique et non invasif par ultrasons pour éliminer durablement les cellules adipeuses localisées.',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    category: 'Minceur',
    details: 'Alternative sans douleur à la liposuccion. Les ondes de basse fréquence créent des microbulles d\'air cassant les membranes des cellules de stockage de gras, permettant à l\'organisme de l\'évacuer naturellement. Parfait pour cibler le ventre, les bras ou les cuisses.'
  },
  {
    id: 'lifting-colombien',
    name: 'Lifting Colombien fessier',
    description: 'Procédure révolutionnaire d\'aspiration par ventouses pour galber, tonifier et rehausser le volume fessier de façon 100% naturelle.',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92834907?auto=format&fit=crop&q=80&w=800',
    category: 'Minceur',
    details: 'Grâce à des ventouses de vacuum thérapie adaptées, ce soin applique une dépressurisation cutanée qui stimule la microcirculation sanguine, draine l\'excès d\'eau et stimule les muscles fessiers pour leur redonner galbe, fermeté et un effet push-up immédiat.'
  },
  {
    id: 'massage-tonique',
    name: 'Massage Tonique & Revitalisant',
    description: 'Massage dynamique avec pressions profondes pour libérer les tensions musculaires tenaces et restaurer l\'énergie vitale.',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92834907?auto=format&fit=crop&q=80&w=800',
    category: 'Massages',
    details: 'Idéal pour dénouer les raideurs musculaires ou redynamiser le corps. Alliant étirements, pressions rythmées et techniques revigorantes, ce massage réveille la circulation générale et procure une sensation intense de légèreté générale.'
  },
  {
    id: 'massage-relaxant',
    name: 'Massage Relaxant',
    description: 'Modelage enveloppant de lâcher-prise absolu pour évacuer les traces de fatigue psychologique et physique.',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800',
    category: 'Massages',
    details: 'Accordez-vous une parenthèse relaxante. Avec de longs gestes doux aux huiles botaniques de prestige, ce massage aide à dissoudre le stress quotidien, favorise un sommeil réparateur et recentre pleinement vos énergies.'
  },
  {
    id: 'massage-californien',
    name: 'Massage Californien',
    description: 'Massage holistique haut de gamme caractérisé par de doux mouvements fluides et lents.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    category: 'Massages',
    details: 'Soin d\'initiation parfait au bien-être. C\'est une chorégraphie apaisante et continue qui apporte une sensation d\'unité corporelle apaisante, idéale pour chavirer vers une harmonie absolue et soulager les tensions mentales.'
  },
  {
    id: 'massage-amincissant',
    name: 'Massage Amincissant Palper-Rouler',
    description: 'Massage manuel technique intensif pour affiner les formes et lisser les capitons cutanés.',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800',
    category: 'Minceur',
    details: 'Alternant pétrissages et glissements fermes (palper-rouler manuel), ce massage s\'attaque fermement à l\'aspect peau d\'orange, désengorge les tissus encombrés et stimule la microcirculation métabolique locale pour sculpter les contours.'
  },
  {
    id: 'pedicure',
    name: 'Pédicure Spa d\'Exception',
    description: 'Soin complet de remise en beauté et réconfort pour des pieds infiniment doux et des ongles soignés.',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800',
    category: 'Onglerie',
    details: 'Profitez d\'un bain de pied relaxant parfumé, suivi d\'un gommage revitalisant pour l\'élimination des cuticules et rugosités callosiques. Vos ongles sont taillés à la perfection et sublimés, suivis d\'une onctueuse hydratation au beurre de karité.'
  },
  {
    id: 'manucure',
    name: 'Manucure Professionnelle',
    description: 'Mise en beauté raffinée des mains combinant propreté impeccable des cuticules et polissage naturel.',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800',
    category: 'Onglerie',
    details: 'Le secret d\'ongles propres de manière impeccable. Nous soignons minutieusement les pourtours cuticulaires de la plaque grâce au savoir-faire de nos techniciennes, suivi d\'un polissage réparateur et d\'un massage hydratant.'
  },
  {
    id: 'onglerie',
    name: 'Onglerie d\'Art & Pose Complète',
    description: 'Pose d\'ongles en gel, résine (chablons / capsules), vernis semi-permanent brillant et décors sur-mesure.',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800',
    category: 'Onglerie',
    details: 'Exprimez votre style. Nous offrons des rallongements d\'une finesse et d\'une solidité absolues durables, un grand choix de teintes vernis semi-permanent premium éclatantes et du Nail Art haute couture fait entièrement au pinceau.'
  },
  {
    id: 'extension-cils',
    name: 'Extension de Cils',
    description: 'Pose d\'extensions soyeuses cil à cil ou Volume Russe pour un regard glamour sans maquillage au quotidien.',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    category: 'Esthétique',
    details: 'Éveillez votre regard ! Nos poses minutieuses respectent la pousse saine de vos cils naturels. Choisissez entre une pose cil à cil naturelle légère et un Volume Russe sophistiqué pour des cils magnifiquement fournis.'
  },
  {
    id: 'henne',
    name: 'Henné Traditionnel Artistique',
    description: 'Magnifiques créations ornementales dessinées à main levée célébrant l\'élégance et la tradition.',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
    category: 'Esthétique',
    details: 'Dessins fins et élaborés sénégalais et orientaux appliqués avec douceur. Idéal pour habiller avec distinction vos mains et vos pieds lors de célébrations spéciales (mariages, baptêmes) ou pour un style unique au quotidien.'
  },
  {
    id: 'soin-visage',
    name: 'Soins du Visage Éclat',
    description: 'Purification, hydratation intense et rééquilibrage de votre épiderme selon votre typologie cutanée.',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    category: 'Soins',
    details: 'Retrouvez un teint frais et lumineux. Nos esthéticiennes nettoient la peau, extraient les impuretés, effectuent un modelage décontractant de l\'ovale du visage et appliquent un masque réhydratant ciblé.'
  },
  {
    id: 'hydrafacial-dermaplaning',
    name: 'Hydrafacial & Dermaplaning',
    description: 'Le soin d\'élite ultime combinant exfoliation dermo-esthétique et hydratation d\'aspiration profonde.',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    category: 'Soins',
    details: 'Le Dermaplaning élimine le duvet et les peaux mortes ternes à l\'aide d\'un outil précis. L\'Hydrafacial prend la suite en nettoyant sous aspiration les pores pour y infuser une sélénologie d\'actifs (antioxydants, acide hyaluronique).'
  },
  {
    id: 'gommage-corps',
    name: 'Gommage du Corps Purifiant',
    description: 'Exfoliation corporelle complète pour éliminer les impuretés et redonner à la peau sa douceur originelle.',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800',
    category: 'Soins',
    details: 'Soin détoxifiant pour une peau de soie veloutée. Ce rituel élimine les cellules mortes cutanées, affine le grain de la peau et se termine par un délicat voile soyeux d\'huile naturelle protectrice.'
  },
  {
    id: 'epilation',
    name: 'Épilation Cire Douceur',
    description: 'Épilation professionnelle méticuleuse du corps et du visage pour un résultat soyeux de longue durée.',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    category: 'Esthétique',
    details: 'L\'utilisation de cires haut de gamme à basse température prévient les irritations de la peau tout en arrachant le bulbe pileux en douceur pour ralentir drastiquement sa repousse et adoucir l\'épiderme.'
  },
  {
    id: 'damp-traditionnel',
    name: 'Damp Traditionnel Sénégalais',
    description: 'Bain de vapeur rituel et thérapeutique aux plantes médicinales et racines parfumées locales.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    category: 'Soins',
    details: 'Secret ancestral de beauté sénégalaise aux multiples vertus. Ce rituel organique de sudation purifie profondément la barrière corporelle, soulage les douleurs articulaires et parfume longuement la peau d\'effluves délicates traditionnelles.'
  },
  {
    id: 'massage-pierres-chaudes',
    name: 'Massage aux Pierres Chaudes',
    description: 'Modelage réconfortant s\'appuyant sur l\'énergie thermique de galets de basalte chauffés pour décontracter en profondeur.',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    category: 'Massages',
    details: 'La chaleur des pierres volcaniques se diffuse lentement le long du dos et des muscles, activant une relaxation intense, soulageant les raideurs musculaires chroniques et favorisant un sentiment cocooning d\'apaisement global.'
  }
];

export const PRESET_GALLERY: GalleryImage[] = [
  {
    id: 'gal-1',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    title: 'Séance de Madérothérapie',
    category: 'Minceur'
  },
  {
    id: 'gal-2',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800',
    title: 'Drainage Post-Opératoire',
    category: 'Minceur'
  },
  {
    id: 'gal-3',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    title: 'Soin Impérial aux Pierres Chaudes',
    category: 'Massages'
  },
  {
    id: 'gal-4',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    title: 'Massage Californien enveloppant',
    category: 'Massages'
  },
  {
    id: 'gal-5',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800',
    title: 'Pose de Capsule & Nail Art',
    category: 'Onglerie'
  },
  {
    id: 'gal-6',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800',
    title: 'Pédicure Spa Refresh',
    category: 'Onglerie'
  },
  {
    id: 'gal-7',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    title: 'Soin du Visage Hydrafacial & Dermaplaning',
    category: 'Soins'
  },
  {
    id: 'gal-8',
    imageUrl: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&q=80&w=800',
    title: 'Extension de Cils Volume Russe',
    category: 'Esthétique'
  },
  {
    id: 'gal-9',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
    title: 'Henné Artistique Traditionnel',
    category: 'Esthétique'
  }
];

export const PRESET_VIDEOS: GalleryVideo[] = [
  {
    id: 'vid-1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-relaxing-massage-on-spa-salon-40348-large.mp4',
    title: 'Massage Holistique & Rituel Madérothérapie en Action',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'vid-2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-enjoying-a-facial-massage-at-a-spa-40351-large.mp4',
    title: 'Soin Visage Hydrafacial & Geste de Massage Kobi',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
  }
];

export const PRESET_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sophie Leclerc',
    comment: 'Une expérience de détente absolument magique ! Ma pose d\'extensions de cils est parfaite et incroyablement naturelle. Je recommande Body Scult à 100% lors de vos séjours à Saly.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-2',
    name: 'Mariama Diop',
    comment: 'L\'accueil est chaleureux et d\'un grand professionnalisme. Leur service d\'onglerie est le meilleur de Saly. Le salon est hyper propre et élégant.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'test-3',
    name: 'Christine Dubois',
    comment: 'Le soin du visage éclat est exceptionnel. Ma peau revit ! C\'est un véritable havre de paix où l\'on prend plaisir à se faire chouchouter. Merci à toute l\'équipe !',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  }
];
