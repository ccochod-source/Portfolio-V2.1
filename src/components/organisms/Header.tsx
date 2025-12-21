'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Text } from '@/components/atoms/Text';
import { slideInLeft } from '@/lib/animations';

export const Header: React.FC = () => {
  return (
    <motion.header
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
      className="w-full py-8 md:py-12"
    >
      <nav className="flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Text variant="h3" as="h1" className="text-accent-dark">
            Portfolio
          </Text>
        </motion.div>
      </nav>
    </motion.header>
  );
};

