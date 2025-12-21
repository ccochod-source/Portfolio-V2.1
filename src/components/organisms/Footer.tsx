'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Text } from '@/components/atoms/Text';
import { fadeInUp } from '@/lib/animations';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="w-full py-8 mt-16 border-t border-sand"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Text variant="caption" className="text-text-light">
          © {currentYear} Portfolio. Tous droits réservés.
        </Text>
        <Text variant="caption" className="text-text-light">
          Conçu avec élégance et précision
        </Text>
      </div>
    </motion.footer>
  );
};

