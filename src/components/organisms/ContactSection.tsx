'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Text } from '@/components/atoms/Text';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export const ContactSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <Text variant="h2" className="text-accent-dark">
              Contactez-moi
            </Text>
            <Text variant="body" className="text-text-light max-w-2xl mx-auto">
              Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter.
            </Text>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-sand/50 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              {/* Email */}
              <motion.a
                href="mailto:ccochod@eugeniaschool.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent-dark"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <Text variant="body-sm" className="text-text-dark font-medium">
                  Email
                </Text>
                <Text variant="caption" className="text-accent-dark">
                  ccochod@eugeniaschool.com
                </Text>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/clément-cochod-506a9633b/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-accent-dark"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <Text variant="body-sm" className="text-text-dark font-medium">
                  LinkedIn
                </Text>
                <Text variant="caption" className="text-accent-dark">
                  Clément Cochod
                </Text>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


