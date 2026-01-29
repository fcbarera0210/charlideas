import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { WHATSAPP_NUMBER } from '../../utils/constants';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const text = `Hola Charl!deas, soy ${formData.name} y quisiera ${formData.message}, gracias!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      setStatus('success');
      window.open(url, '_blank');
    }, 500);
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111827]/50 border border-[#00B4B9]/30 p-10 rounded-[2.5rem] backdrop-blur-md text-center"
        >
          <motion.div
            className="h-20 w-20 bg-[#00B4B9]/20 rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <MessageCircle className="text-[#00B4B9]" size={40} />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje preparado!</h3>
          <p className="text-slate-400 mb-8">Este flujo abrirá directamente un chat de WhatsApp.</p>
          <Button onClick={() => setStatus('idle')} type="button">
            Enviar otro mensaje
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className="bg-[#111827]/30 border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-md shadow-2xl relative overflow-hidden group"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00B4B9]/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          />

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
              Nombre o empresa
            </label>
            <input
              required
              type="text"
              placeholder="Ej. Juan de SushiWey o Estudio X"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4B9]/50 focus:ring-1 focus:ring-[#00B4B9]/50 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </motion.div>

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
              Describe tu idea o necesidad
            </label>
            <textarea
              required
              rows={4}
              placeholder="Cuéntanos qué quieres digitalizar, qué tipo de página necesita o qué problema quieres resolver..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4B9]/50 focus:ring-1 focus:ring-[#00B4B9]/50 transition-all resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button type="submit" className="w-full py-5" disabled={status === 'sending'}>
              {status === 'sending' ? (
                'Enviando mensaje...'
              ) : (
                <>
                  Enviar mensaje <MessageCircle size={20} />
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export const ContactSection = () => {
  const titleReveal = useScrollReveal({ direction: 'left', delay: 0 });
  const formReveal = useScrollReveal({ direction: 'right', delay: 200 });

  const features = [
    { icon: MessageCircle, text: 'Respuesta en menos de 24 horas' },
    { icon: Globe, text: 'Atención global, soluciones locales' },
  ];

  return (
    <section id="contacto" className="py-20 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            ref={titleReveal.ref}
            initial="hidden"
            animate={titleReveal.isInView ? 'visible' : 'hidden'}
            variants={titleReveal.variants}
          >
            <motion.div
              className="inline-flex items-center gap-2 text-[#00B4B9] font-bold text-sm uppercase tracking-widest mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={titleReveal.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ delay: 0.1 }}
            >
              <Send size={16} /> Contacto Directo
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              ¿Tienes una <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4B9] to-[#80ffdb]">idea</span> brillante?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10">
              Omitamos los correos. Cuéntanos quién eres y qué tienes en mente; el siguiente paso es una línea directa vía WhatsApp.
            </p>
            <div className="flex flex-col gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={titleReveal.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className="h-10 w-10 rounded-lg bg-[#00B4B9]/10 flex items-center justify-center text-[#00B4B9]"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <feature.icon size={20} />
                  </motion.div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={formReveal.ref}
            initial="hidden"
            animate={formReveal.isInView ? 'visible' : 'hidden'}
            variants={formReveal.variants}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
