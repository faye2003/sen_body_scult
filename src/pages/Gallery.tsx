import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';
import { GalleryImage, GalleryVideo } from '../types';
import { PRESET_GALLERY, PRESET_VIDEOS } from '../data';
import { X, Play, Maximize2, Video, Camera } from 'lucide-react';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>(PRESET_GALLERY);
  const [videos, setVideos] = useState<GalleryVideo[]>(PRESET_VIDEOS);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnap = await getDocs(collection(db, 'gallery'));
        if (!querySnap.empty) {
          setImages(querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage)));
        }

        const vidsSnap = await getDocs(query(collection(db, 'videos'), limit(5)));
        if (!vidsSnap.empty) {
          setVideos(vidsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryVideo)));
        }
      } catch (error) {
        console.warn("Using preset gallery for collections", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ['Tous', 'Minceur', 'Massages', 'Onglerie', 'Soins', 'Esthétique'];

  const filteredImages = activeCategory === 'Tous'
    ? images
    : images.filter(img => img.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-secondary min-h-screen">
      
      {/* 1. HEADER */}
      <section className="bg-primary py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.1] z-0">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200"
            alt="Body Scult Gallery Decor"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-accent font-poppins uppercase tracking-[0.4em] text-xs font-bold block">
            RÉALISATIONS SCIENTIFIQUES & ESTHÉTIQUES
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide">
            Notre Galerie d'Art
          </h1>
          <div className="h-[2px] w-12 bg-accent mx-auto my-4"></div>
          <p className="text-stone-300 font-light text-lg tracking-wide max-w-2xl mx-auto">
            L'excellence esthétique capturée à l'institut Body Scult de Saly. Gages de notre professionnalisme et dévouement clinique.
          </p>
        </div>
      </section>

      {/* 2. PHOTOS SECTION HEADER & STICKY FILTER BAR */}
      <div className="py-12 bg-white border-b border-stone-100 flex flex-col items-center">
        <div className="flex items-center space-x-2 text-primary mb-6">
          <Camera size={20} className="text-accent" />
          <h2 className="text-xs uppercase tracking-[0.3em] font-poppins font-semibold">Portefeuille Photos (Masonry)</h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-3 md:space-x-4 min-w-max overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 text-xs font-poppins tracking-widest uppercase font-semibold transition-all duration-300 rounded-none ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MASONRY PHOTO GALLERY */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid relative overflow-hidden group cursor-pointer border border-stone-100 shadow-sm"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title || 'Body Scult réalisation'}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur p-4 rounded-full text-white">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                  <span className="absolute bottom-4 left-4 bg-primary text-white text-[8px] uppercase tracking-widest px-2 py-0.5 font-poppins font-semibold">
                    {img.category}
                  </span>
                  {img.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs uppercase tracking-widest font-poppins font-medium">{img.title}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-20 bg-white">
            <p className="text-stone-500 font-light">Aucune photo dans cette catégorie pour le moment.</p>
          </div>
        )}
      </section>

      {/* 4. VIDEOS GALLERY SECTION (Reels, promotionnelle, etc.) */}
      <section className="py-24 bg-[#FAF7F2] border-t border-stone-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Video size={20} className="text-accent" />
              <h2 className="text-xs uppercase tracking-[0.3em] font-poppins font-semibold">DÉLIRES & COULISSES EN VIDÉOS</h2>
            </div>
            <h3 className="text-3xl font-serif text-primary">Reels & Formations</h3>
            <p className="text-stone-500 font-light text-sm max-w-lg mx-auto">
              Découvrez nos capsules vidéos, tutoriels et séances backstage pour vivre l'atmosphère magique de notre institut de Saly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {videos.map((vid) => (
              <motion.div
                key={vid.id}
                className="bg-white border border-stone-100 shadow-xl overflow-hidden group relative flex flex-col justify-between"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Video thumbnail and Play button trigger */}
                <div 
                  className="relative h-72 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo(vid)}
                >
                  <img
                    src={vid.thumbnailUrl || 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800'}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/45 flex items-center justify-center group-hover:bg-primary/55 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <Play size={28} className="translate-x-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Video metadata */}
                <div className="p-6">
                  <h4 className="font-poppins font-medium text-stone-850 text-sm tracking-wide line-clamp-2">
                    {vid.title || 'Vidéo promotionnelle Body Scult'}
                  </h4>
                  <p className="text-[10px] text-accent uppercase tracking-widest font-semibold mt-2 font-poppins">BODY SCULT BACKSTAGE</p>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. LIGHTBOX MODAL (FOR PHOTO ZOOM) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-3.5 focus:outline-none"
              onClick={() => setSelectedImage(null)}
            >
              <X size={36} />
            </button>
            
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={selectedImage.imageUrl}
              alt={selectedImage.title || 'Galerie zoom'}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
            {selectedImage.title && (
              <div className="absolute bottom-10 left-0 right-0 text-center text-white space-y-2">
                <p className="text-xl font-serif tracking-wide">{selectedImage.title}</p>
                <p className="text-xs text-accent uppercase tracking-[0.2em] font-poppins font-semibold">{selectedImage.category}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. LIGHTBOX VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-3.5 focus:outline-none"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={36} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl max-h-[75vh] aspect-video bg-black shadow-2xl border border-stone-800 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
              <div className="absolute -bottom-16 left-0 right-0 text-center text-white/90">
                <p className="font-serif text-lg">{selectedVideo.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
