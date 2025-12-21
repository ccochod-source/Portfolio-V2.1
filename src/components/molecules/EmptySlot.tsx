'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/atoms/Card';

interface EmptySlotProps {
  index?: number;
}

export const EmptySlot: React.FC<EmptySlotProps> = ({ index = 0 }) => {
  return (
      <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      <Card className="relative overflow-hidden group">
        {/* Effet de lumière douce */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-light/10 via-transparent to-sand-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Bordure subtile avec animation */}
        <div className="absolute inset-0 border-2 border-dashed border-sand-dark/30 rounded-xl group-hover:border-accent-light/50 transition-colors duration-300" />

        {/* Contenu du placeholder */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-sand-light flex items-center justify-center group-hover:bg-accent-light/20 transition-colors duration-300">
            <svg
              className="w-8 h-8 text-text-light group-hover:text-accent transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <p className="text-text-light text-sm font-medium">
            Projet à venir
          </p>
        </div>

        {/* Effet de brillance au hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
        />
      </Card>
    </motion.div>
  );
};

