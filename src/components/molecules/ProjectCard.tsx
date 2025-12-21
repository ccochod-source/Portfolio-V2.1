'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
}) => {
  return (
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      style={{ willChange: 'transform' }}
    >
      <Card 
        hover={!!project.link} 
        onClick={project.link ? () => window.open(project.link, '_blank', 'noopener,noreferrer') : undefined}
      >
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-sand-light">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Image du projet ${project.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-sand">
              <svg
                className="w-16 h-16 text-text-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Text variant="h4" as="h3" className="text-lg">
            {project.title}
          </Text>
          <Text variant="body-sm" className="line-clamp-2">
            {project.description}
          </Text>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-sand-light text-text rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.year && (
            <Text variant="caption" className="text-accent-dark">
              {project.year}
            </Text>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

