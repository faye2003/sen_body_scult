import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, MapPin, Instagram, Facebook, ArrowUp, Mail, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { SalonSettings } from '../types';
import { PRESET_SETTINGS } from '../data';
import Logo from './Logo';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SalonSettings>(PRESET_SETTINGS);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'salon'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings({ ...PRESET_SETTINGS, ...docSnap.data() } as SalonSettings);
      }
    }, (err) => {
      console.warn("Using preset settings fallback", err);
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminPage = location.pathname.startsWith('/admin');
  if (isAdminPage) return <Outlet />;

  return (
    <div className="min-h-screen flex flex-col bg-secondary font-sans selection:bg-accent/30 selection:text-primary">
      {/* Premium Elegant Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm transition-all duration-300 ${
        location.pathname === '/services' ? 'h-[20vh] md:h-24' : 'h-24'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            
            {/* Logo Body Scult */}
            <Link to="/" className="flex items-center">
              <Logo size="sm" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase font-poppins tracking-[0.2em] font-medium transition-all duration-300 relative py-2 group hover:text-accent ${
                    location.pathname === link.path ? 'text-accent' : 'text-stone-700'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Premium WhatsApp Button */}
            <div className="hidden md:flex items-center">
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn bg-primary text-white border border-stone-800 font-poppins hover:bg-accent hover:border-accent text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3.5 rounded-none transition-all duration-300"
              >
                Réservation WhatsApp
              </a>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-stone-800 hover:text-accent p-2 focus:outline-none transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-stone-100 shadow-xl overflow-hidden absolute w-full left-0 right-0"
            >
              <div className="px-6 py-8 space-y-4 flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm uppercase tracking-[0.15em] font-medium py-3 border-b border-stone-50 font-poppins transition-colors ${
                      location.pathname === link.path ? 'text-accent pl-2' : 'text-stone-700 hover:text-accent'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Screen WhatsApp Call To Action */}
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-primary text-white text-center font-poppins font-medium uppercase tracking-[0.15em] py-4 mt-4 transition-colors hover:bg-accent"
                >
                  Contact WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Page Slot with margin top offset because of fixed navbar */}
      <main className={`flex-grow ${location.pathname === '/services' ? 'pt-[40vh] md:pt-24' : 'pt-24'}`}>
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="bg-primary text-stone-300 pt-20 pb-10 border-t border-stone-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
            
            {/* Column 1: Identity */}
            <div className="md:col-span-2">
              <Logo size="md" light={true} className="mb-6" />
              <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-8 font-light">
                {settings.description} Une atmosphère intimiste et décontractée au Sénégal pour révéler la grandeur de votre beauté naturelle.
              </p>
              <div className="flex space-x-5">
                <a href="https://www.instagram.com/body__scult/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://web.facebook.com/profile.php?id=61591793405671" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {/* Column 2: Information */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white font-poppins mb-6">
                Contact & Accès
              </h4>
              <ul className="space-y-4 text-sm font-light text-stone-400">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="mt-0.5 text-accent shrink-0" />
                  <span>{settings.address}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="text-accent shrink-0" />
                  <span>{settings.phone}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="text-accent shrink-0" />
                  <span>{settings.email}</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Hours */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white font-poppins mb-6">
                Heures d'ouverture
              </h4>
              <ul className="space-y-3.5 text-sm font-light text-stone-400">
                {Object.entries(settings.hours).map(([day, hrs]) => (
                  <li key={day} className="flex justify-between border-b border-stone-800/40 pb-1.5 font-poppins capitalize text-xs tracking-wider">
                    <span className="text-stone-500">{day}</span>
                    <span className="text-stone-300">{hrs}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="border-t border-stone-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 font-poppins tracking-widest gap-4">
            <p>&copy; {new Date().getFullYear()} BODY SCULT SALY. TOUS DROITS RÉSERVÉS.</p>
            <p className="text-[10px] text-stone-600"><a href="https://www.mamadou-faye.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Par • Lywa Technology</a></p>
          </div>
        </div>
      </footer>

      {/* --- SCROLL TOP CHEVRON FLOTTANT & WHATSAPP COUPLER --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-3">
        {/* Scroll Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="bg-white text-primary border border-stone-100 p-3.5 rounded-full shadow-xl hover:bg-accent hover:text-white transition-all duration-300"
              aria-label="Remonter en haut"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4.5 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Discuter sur WhatsApp"
        >
          <img className="w-8" src="/images/whatsapp.svg" alt="Chat on WhatsApp" />
        </a>
      </div>

    </div>
  );
}
