'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Text } from '@/components/atoms/Text';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { allProjects } from '@/data/allProjects';
import { getFlatProjectLinks } from '@/lib/projectResources';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Hero Section */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <Text variant="h1" className="text-accent-dark">
              Mes Projets
            </Text>
            <Text variant="body" className="text-text-light max-w-2xl mx-auto">
              Découvrez tous mes projets et réalisations
            </Text>
          </motion.div>

          {/* Grid des projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allProjects.filter((project) => project.id !== '1').map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="group"
              >
                <div
                  className="h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                  style={{
                    backgroundColor: project.color || '#F5E6D3',
                  }}
                >
                  {/* Image */}
                  <div
                    className={`relative w-full h-48 md:h-56 overflow-hidden ${
                      project.id === '5'
                        ? 'bg-[#0b0b0b] p-3'
                        : project.id === '7'
                          ? 'bg-gradient-to-br from-[#fafbff] to-[#eef2fb] p-4'
                          : ''
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        className={`transition-transform duration-300 ${
                          project.id === '5' || project.id === '7'
                            ? 'object-contain'
                            : 'object-cover group-hover:scale-105'
                        }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 p-6 flex flex-col">
                    <Text variant="h4" className="text-text-dark mb-3">
                      {project.title}
                    </Text>
                    <Text
                      variant="body-sm"
                      className="text-text flex-1 mb-4 line-clamp-4 leading-relaxed"
                    >
                      {project.description}
                    </Text>

                    {/* Liens : fiche interne + externes */}
                    <div className="flex flex-col gap-2 mt-auto">
                      {project.slug ? (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-accent-dark hover:text-accent transition-colors duration-300 group/pg"
                        >
                          <span>Fiche projet complète</span>
                          <span className="transition-transform duration-300 group-hover/pg:translate-x-1">
                            →
                          </span>
                        </Link>
                      ) : null}
                      {getFlatProjectLinks(project).map((linkItem, linkIndex) => {
                        const isHttp = /^https?:\/\//i.test(linkItem.url);
                        return (
                          <a
                            key={`${linkItem.url}-${linkIndex}`}
                            href={linkItem.url}
                            target={isHttp ? '_blank' : undefined}
                            rel={isHttp ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center gap-2 text-sm font-medium text-text-dark hover:text-accent-dark transition-colors duration-300 group/link"
                          >
                            <span>{linkItem.label}</span>
                            <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                              →
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={fadeInUp}
            className="text-center pt-8"
          >
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors duration-300 font-medium"
            >
              Retour à l'accueil
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

