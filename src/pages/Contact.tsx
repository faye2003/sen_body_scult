import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, HelpCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { doc, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { SalonSettings } from '../types';
import { PRESET_SETTINGS } from '../data';

export default function Contact() {
  const [settings, setSettings] = useState<SalonSettings>(PRESET_SETTINGS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'salon'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings({ ...PRESET_SETTINGS, ...docSnap.data() } as SalonSettings);
      }
    }, (err) => {
      console.warn("Using preset settings for Contact info page", err);
    });
    return () => unsub();
  }, []);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // 1. Write the message into Firestore: "contact_messages" as requested by the spec
      await addDoc(collection(db, 'contact_messages'), {
        ...data,
        createdAt: serverTimestamp()
      });
      
      setIsSuccess(true);
      reset();
      
      // Reset message banner
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (error) {
      console.error("Error creating contact message in Firestore:", error);
      alert("Une erreur s'est produite lors de la transmission de votre message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-secondary min-h-screen">
      
      {/* 1. HEADER */}
      <section className="bg-primary py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.1] z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200"
            alt="Body Scult Contact Cover"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-accent font-poppins uppercase tracking-[0.4em] text-xs font-bold block">
            RESTEZ EN CONTACT
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide">
            Planifier un Rendez-vous
          </h1>
          <div className="h-[2px] w-12 bg-accent mx-auto my-4"></div>
          <p className="text-stone-300 font-light text-lg tracking-wide max-w-2xl mx-auto">
            Nous restons à votre entière disposition pour répondre à toutes vos interrogations d'ordre esthétique ou d'accès à l'institut.
          </p>
        </div>
      </section>

      {/* 2. CONTACT AND ACCÈS BLOCK GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left panel: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <span className="text-accent font-poppins uppercase tracking-[0.3em] text-xs font-bold block mb-4">
                COORDONNÉES
              </span>
              <h2 className="text-4xl font-serif text-primary tracking-wide">
                Entrons en relation
              </h2>
              <div className="h-[2.5px] w-12 bg-accent mt-4"></div>
            </div>

            <div className="space-y-8">
              {/* Adresse */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-none bg-white border border-stone-150 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-xs tracking-widest text-primary uppercase mb-1">
                    Adresse Clinique
                  </h4>
                  <p className="text-stone-500 font-light text-sm max-w-sm leading-relaxed">
                    {settings.address}
                  </p>
                </div>
              </div>

              {/* Tel */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-none bg-white border border-stone-150 flex items-center justify-center text-accent shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-xs tracking-widest text-primary uppercase mb-1">
                    Téléphone Direct
                  </h4>
                  <p className="text-stone-500 font-light text-sm">
                    {settings.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-none bg-white border border-stone-150 flex items-center justify-center text-accent shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-xs tracking-widest text-primary uppercase mb-1">
                    Email Administratif
                  </h4>
                  <p className="text-stone-500 font-light text-sm">
                    {settings.email}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-none bg-white border border-stone-150 flex items-center justify-center text-accent shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-xs tracking-widest text-primary uppercase mb-1">
                    Heures de Cocon
                  </h4>
                  <ul className="text-stone-500 text-xs font-poppins space-y-2 mt-2 w-72">
                    {Object.entries(settings.hours).map(([day, hrs]) => (
                      <li key={day} className="flex justify-between border-b border-stone-100 pb-1 capitalize tracking-wider">
                        <span className="text-stone-400">{day}</span>
                        <span className="text-stone-700 font-medium">{hrs}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Frame */}
            <div className="p-8 bg-[#FAF7F2] border border-stone-150 rounded-none relative">
              <div className="flex items-start space-x-4">
                {/* <MessageCircle size={28} className="text-[#25D366] shrink-0 mt-1" fill="currentColor" /> */}
                <img className="w-8" src="/images/whatsapp.svg" alt="Chat on WhatsApp" />
                <div className="space-y-2">
                  <h4 className="font-poppins font-semibold text-xs uppercase tracking-widest text-primary">Prise de contact instantanée</h4>
                  <p className="text-stone-600 text-xs leading-relaxed font-light">
                    Vous souhaitez nous envoyer une photo de vos ongles pour une estimation rapide ? Nos conseillères sont en ligne.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#25D366] text-white px-6 py-2.5 text-[10px] uppercase font-semibold font-poppins tracking-wider hover:bg-emerald-600 transition-colors"
                    >
                      Conseillère WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right panel: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white border border-stone-150 p-10 md:p-12 shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-serif text-primary tracking-wide mb-2">Laissez-nous un pli</h3>
              <p className="text-stone-400 text-xs font-light mb-8">Nous vous rappellerons dans les plus brefs délais de l'institut.</p>

              {isSuccess ? (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200/50 p-8 text-center space-y-4">
                  <CheckCircle2 size={36} className="text-[#25D366] mx-auto" />
                  <h4 className="font-serif text-lg font-medium">Message Enregistré avec Succès !</h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed max-w-sm mx-auto">
                    Nous avons bien réceptionné votre demande au salon de beauté Body Scult. Nos équipes prendront attache avec vous dans les prochaines heures.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-poppins uppercase tracking-wider font-semibold text-stone-700 mb-2">Nom complet</label>
                    <input
                      {...register('name', { required: 'Ce champ est obligatoire' })}
                      type="text"
                      className="w-full px-4 py-3 border border-stone-250 outline-none text-sm transition-all focus:border-accent font-light"
                      placeholder="Votre nom et prénom"
                    />
                    {errors.name && <p className="text-red-500 text-[10px] uppercase font-poppins mt-1.5">{errors.name.message as string}</p>}
                  </div>

                  {/* Contact Row Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-poppins uppercase tracking-wider font-semibold text-stone-700 mb-2">Adresse mail</label>
                      <input
                        {...register('email', {
                          required: 'Ce champ est obligatoire',
                          pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
                        })}
                        type="email"
                        className="w-full px-4 py-3 border border-stone-250 outline-none text-sm transition-all focus:border-accent font-light"
                        placeholder="votre@adresse.com"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] uppercase font-poppins mt-1.5">{errors.email.message as string}</p>}
                    </div>

                    {/* Tel */}
                    <div>
                      <label className="block text-xs font-poppins uppercase tracking-wider font-semibold text-stone-700 mb-2">Numéro téléphone</label>
                      <input
                        {...register('phone', { required: 'Ce champ est obligatoire' })}
                        type="tel"
                        className="w-full px-4 py-3 border border-stone-250 outline-none text-sm transition-all focus:border-accent font-light"
                        placeholder="+221 ..."
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] uppercase font-poppins mt-1.5">{errors.phone.message as string}</p>}
                    </div>
                  </div>

                  {/* Case body Message */}
                  <div>
                    <label className="block text-xs font-poppins uppercase tracking-wider font-semibold text-stone-700 mb-2">Message ou Desiderata</label>
                    <textarea
                      {...register('message', { required: 'Ce champ est obligatoire' })}
                      rows={5}
                      className="w-full px-4 py-3 border border-stone-250 outline-none text-sm resize-none transition-all focus:border-accent font-light"
                      placeholder="Comment pouvons-nous vous sublimer ?"
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-[10px] uppercase font-poppins mt-1.5">{errors.message.message as string}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glow-btn bg-primary text-white border border-stone-850 py-4 text-xs font-semibold uppercase tracking-[0.2em] font-poppins transition-all focus:outline-none disabled:opacity-50 inline-flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Envoyer le Clinique message</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-stone-400 text-center font-light leading-relaxed">
                    * En soumettant ce formulaire, vos données d'accès sont transmises en toute sécurité selon nos chartes de respect du PII au Sénégal.
                  </p>

                </form>
              )}
            </div>

          </motion.div>

        </div>
      </section>

      {/* 3. INTERACTIVE GOOGLE MAPS SECTION WITH ACCÈS LINK */}
      <section className="relative h-[550px] w-full border-t border-stone-200 bg-stone-100">
        
        {/* Absolute directional drawer */}
        <div className="absolute top-8 left-8 z-20 bg-white p-6 max-w-sm hidden md:block border border-stone-150 shadow-2xl">
          <h4 className="font-serif text-lg text-primary mb-2">S'y Rendre</h4>
          <p className="text-stone-500 font-light text-xs leading-relaxed mb-4">
            Notre salon est situé à la Résidence les Alizés, sur l'axe routier principal de Saly.
          </p>
          <a
            href="https://maps.google.com/?q=Saly,Senegal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-accent text-xs uppercase tracking-widest font-semibold font-poppins hover:text-stone-900 transition-colors"
          >
            <span>Obtenir un itinéraire</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15467.43852899451!2d-16.9936838!3d14.4443916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xee9288f5f5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2sSaly%2C%20Senegal!5e0!3m2!1sen!2sfr!4v1625000000000!5m2!1sen!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Body Scult Saly"
        ></iframe>

      </section>

    </div>
  );
}
