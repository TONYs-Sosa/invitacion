"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Clock, Heart, Calendar, MessageCircle, Bed, Music } from 'lucide-react';

// Definimos la estructura del tiempo para TypeScript
interface TimeLeft {
  dias: number;
  horas: number;
  min: number;
  seg: number;
}

export default function InvitacionBoda() {
  // --- LÓGICA DE AUDIO ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.log("Error al reproducir:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // --- LÓGICA DE LA CUENTA REGRESIVA ---
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ dias: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-06-06T14:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
          horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seg: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#4a4a4a] font-serif selection:bg-stone-200">
      
      {/* Elemento de Audio Oculto */}
      <audio ref={audioRef} loop>
        <source src="/song.mp3" type="audio/mpeg" />
      </audio>

      {/* --- SECCIÓN 1: HERO --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] hover:scale-110"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative text-center text-white px-4 flex flex-col items-center">
          <span className="uppercase tracking-[0.4em] text-xs mb-6 block opacity-80 animate-pulse">Save the Date</span>
          <h1 className="text-5xl md:text-8xl font-light mb-6 drop-shadow-2xl">
            Israel & <br className="md:hidden" /> Angela
          </h1>
          <p className="text-lg md:text-2xl font-light italic tracking-[0.2em] opacity-90 mb-12">
            06 . JUNIO . 2026
          </p>

          {/* Botón de Música Intuitivo */}
          <button 
            onClick={toggleAudio}
            className="animate-bounce flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/30 transition-all border border-white/30 cursor-pointer z-20"
          >
            <Music className="w-5 h-5 text-white" />
            <span className="text-xs uppercase tracking-widest text-white font-sans">
              {isPlaying ? "Pausar Música" : "Encender Música"}
            </span>
          </button>
        </div>
      </section>

      {/* --- SECCIÓN 2: CUENTA REGRESIVA --- */}
      <section className="bg-white py-12 border-b border-stone-100 shadow-sm">
        <div className="flex justify-center gap-6 md:gap-12 text-center">
          {(Object.entries(timeLeft) as [string, number][]).map(([label, value]) => (
            <div key={label}>
              <div className="text-3xl md:text-5xl font-light text-stone-800 tracking-tighter">{value}</div>
              <div className="text-[10px] uppercase tracking-widest text-stone-400 mt-2 font-sans">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN 3: FRASE --- */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <Heart className="w-8 h-8 text-stone-300 mx-auto mb-8 stroke-[1px]" />
        <p className="text-2xl md:text-3xl font-light leading-relaxed italic text-stone-700 font-serif">
          "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección."
        </p>
        <p className="mt-6 text-stone-400 uppercase tracking-[0.3em] text-[10px] font-sans">— Antoine de Saint-Exupéry</p>
      </section>
      
      {/* --- SECCIÓN: CORTEJO (Padres y Padrinos) --- */}
      <section className="pb-24 px-6 max-w-4xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* COLUMNA NOVIA */}
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-4 font-sans">Padres de la Novia</p>
              <p className="text-xl font-light text-stone-700">Guillermo Sosa</p>
              <p className="text-xl font-light text-stone-700">Celia Rodríguez</p>
            </div>
          </div>

          {/* COLUMNA NOVIO */}
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-4 font-sans">Padres del Novio</p>
              <p className="text-xl font-light text-stone-700">† José Hernesto Nochebuena</p>
              <p className="text-xl font-light text-stone-700">Maria Elvia Hernández</p>
            </div>
          </div>

        </div>

        {/* Padrinos de Velación */}
        <div className="mt-20 border-t border-stone-100 pt-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-4 font-sans">Padrinos de Velación</p>
          <p className="text-2xl font-light text-stone-800 italic">Antonio Martínez & Hortencia Sosa</p>
        </div>
      </section>
      
      {/* --- SECCIÓN 4: DETALLES --- */}
      <section className="py-20 bg-stone-100/50">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          
          {/* CEREMONIA */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm text-center flex flex-col items-center border border-stone-200/30">
            {/* Contenedor del Video de la Iglesia */}
            <div className="w-full h-48 md:h-56 relative mb-8 rounded-2xl overflow-hidden shadow-inner">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover pointer-events-none"
              >
                <source src="/videoiglesia.mp4" type="video/mp4" />
              </video>
            </div>

            <Calendar className="w-10 h-10 text-stone-300 mb-6 stroke-[1px]" />
            <h3 className="text-xl font-light tracking-[0.3em] mb-6 uppercase">Ceremonia</h3>
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-center gap-2 text-stone-600">
                <Clock className="w-4 h-4" />
                <span className="tracking-widest text-sm">2:00 pm</span>
              </div>
              <div className="text-stone-500 italic">
                <p className="font-semibold text-stone-700 not-italic">Parroquia de San Andrés Apóstol</p>
                <p className="text-sm">C. Francisco I. Madero 43, San Andrés Timilpan, Méx.</p>
              </div>
            </div>
            <a 
              href="https://maps.app.goo.gl/bZuzkJMekbXUGS6M9" 
              target="_blank"
              rel="noreferrer"
              className="mt-8 px-8 py-3 border border-stone-200 rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-stone-800 hover:text-white transition-all duration-500"
            >
              Ver Ubicación
            </a>
          </div>

          {/* RECEPCIÓN */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm text-center flex flex-col items-center border border-stone-200/30">
            {/* Contenedor del Video de la Recepción */}
            <div className="w-full h-48 md:h-56 relative mb-8 rounded-2xl overflow-hidden shadow-inner">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover pointer-events-none"
              >
                <source src="/videorecepcion.mp4" type="video/mp4" />
              </video>
            </div>

            <Heart className="w-10 h-10 text-stone-300 mb-6 stroke-[1px]" />
            <h3 className="text-xl font-light tracking-[0.3em] mb-6 uppercase">Recepción</h3>
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-center gap-2 text-stone-600">
                <Clock className="w-4 h-4" />
                <span className="tracking-widest text-sm">4:00 p.m</span>
              </div>
              <div className="text-stone-500 italic">
                <p className="font-semibold text-stone-700 not-italic">"El Dorado"</p>
                <p className="text-sm">Puerto de San Nicolás</p>
              </div>
            </div>
            <a 
              href="https://maps.app.goo.gl/8gme7y33FyUAVu2k9" 
              target="_blank"
              rel="noreferrer"
              className="mt-8 px-8 py-3 border border-stone-200 rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-stone-800 hover:text-white transition-all duration-500"
            >
              Ver Ubicación
            </a>
          </div>

        </div>
      </section>

      {/* --- SECCIÓN NUEVA: HOTELES --- */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
            <Bed className="w-8 h-8 text-stone-300 mx-auto mb-4 stroke-[1px]" />
            <h2 className="text-3xl font-light font-serif text-stone-700">Hospedaje Sugerido</h2>
            <p className="text-stone-400 text-sm mt-2 font-sans tracking-wide">OPCIONES PARA TU COMODIDAD</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* HOTEL 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-700 mb-2">Hotel Mesón de Cano</h4>
                <p className="text-sm text-stone-500 mb-4">Costado de la iglesia y a 10 min de la recepción</p>
                <a href="https://maps.app.goo.gl/5t71PYgjvN1VSxYi8" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest text-stone-800 border-b border-stone-800 pb-1 hover:text-stone-500 hover:border-stone-500">
                    Ubicación
                </a>
            </div>

            {/* HOTEL 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-700 mb-2">Hotel 3 Lunas Timilpan</h4>
                <p className="text-sm text-stone-500 mb-4">A un costado de la gasolineria y a 7 min de la recepción</p>
                <a href="https://maps.app.goo.gl/r9xMJ8TnRNdBqqceA" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest text-stone-800 border-b border-stone-800 pb-1 hover:text-stone-500 hover:border-stone-500">
                    Ubicación
                </a>
            </div>

             {/* HOTEL 3 */}
             <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-stone-700 mb-2">Hotel El Califas</h4>
                <p className="text-sm text-stone-500 mb-4">A un costado de la gasolineria y a 7 min de la recepción</p>
                <a href="https://maps.app.goo.gl/tWw8P58wcSEc2N3t8" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest text-stone-800 border-b border-stone-800 pb-1 hover:text-stone-500 hover:border-stone-500">
                    Ubicación
                </a>
            </div>
        </div>
      </section>

      {/* --- SECCIÓN 5: RSVP --- */}
      <section className="py-32 text-center px-6 bg-white border-t border-stone-100">
        <h2 className="text-4xl font-light mb-8 font-serif">Confirmación</h2>
        <p className="max-w-md mx-auto text-stone-500 mb-12 font-light leading-relaxed">
          Nos haría muy felices que nos acompañes. Por favor, confírmanos antes del 06 de Junio.
        </p>
        
        {/* Enlace de WhatsApp Configurado */}
        <a 
          href="https://wa.me/525551599212?text=Claro%20que%20asisto%2C%20no%20me%20lo%20perder%C3%ADa%20por%20nada." 
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full font-sans tracking-wide hover:shadow-xl transition-all hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          CONFIRMAR ASISTENCIA
        </a>

        <div className="mt-28 opacity-30">
          <p className="uppercase tracking-[0.6em] text-[10px] font-bold">Israel & Angela</p>
        </div>
      </section>

    </div>
  );
}