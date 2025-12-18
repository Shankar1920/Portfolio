"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GridBackground } from "./ui/grid-background";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import Github from "@/components/icons/github.svg";
import { ExternalLink, Star, GitFork } from "lucide-react";

interface IProject {
  title: string;
  description: string;
  image: string;
  techstack: string[];
  github: string;
  preview: string;
  stars?: number;
  forks?: number;
}

// Container animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Child animation variants
const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Badge container animation variants
const badgeContainerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Image overlay animation
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const Project: React.FC<{ project: IProject }> = ({ project }) => {
  const {
    title,
    description,
    image,
    techstack,
    github,
    preview,
    stars,
    forks,
  } = project;
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full">
      <GridBackground className="w-full h-full py-16">
        <motion.article
          tabIndex={0}
          className="group relative overflow-hidden flex flex-col rounded-2xl border-2 border-transparent dark:border-none dark:bg-gradient-to-br dark:from-muted/40 dark:via-muted/20 dark:to-muted/40 bg-gradient-to-br from-background via-background/50 to-background shadow-lg hover:shadow-2xl focus:shadow-2xl transition-all duration-500 p-0 h-full backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{
            y: -8,
            borderColor: "rgb(var(--primary))",
            boxShadow: "0 25px 50px -12px rgba(var(--primary), 0.25)",
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Image container (render only if image provided) */}
          {image ? (
            <motion.div
              className="relative rounded-t-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5"
              variants={childVariants}
            >
              <div className="aspect-video relative">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  style={{
                    filter: isHovered
                      ? "brightness(1) saturate(1.1)"
                      : "brightness(0.7) saturate(0.9)",
                  }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
                )}

                {/* Interactive overlay */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : null}

          {/* Content section */}
          <div className="flex flex-col flex-grow p-6 space-y-4">
            <motion.div
              className="flex flex-col gap-3"
              variants={containerVariants}
            >
              {/* Title */}
              <motion.div
                className="flex items-start justify-between gap-2"
                variants={childVariants}
              >
                <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent line-clamp-2">
                  {title}
                </h2>
                {(stars || forks) && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                    {stars && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{stars}</span>
                      </div>
                    )}
                    {forks && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span>{forks}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-sm text-muted-foreground leading-relaxed line-clamp-3"
                variants={childVariants}
              >
                {description}
              </motion.p>

              {/* Tech stack badges */}
              <motion.div
                className="flex flex-wrap gap-2"
                variants={badgeContainerVariants}
              >
                {techstack.slice(0, 6).map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 rounded-full px-3 py-1 font-medium transition-all duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
                {techstack.length > 6 && (
                  <Badge
                    variant="secondary"
                    className="text-xs rounded-full px-3 py-1"
                  >
                    +{techstack.length - 6}
                  </Badge>
                )}
              </motion.div>
            </motion.div>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto pt-4">
              {github ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2 bg-gradient-to-r from-background to-background/50 hover:from-primary/10 hover:to-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300"
                  asChild
                >
                  <Link href={github} target="_blank">
                    <Github className="w-4 h-4" />
                    <span className="font-medium">Code</span>
                  </Link>
                </Button>
              ) : null}

              {preview ? (
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex-1 bg-primary/10 border-primary border"
                  asChild
                >
                  <Link href={preview} target="_blank">
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-medium">Live Demo</span>
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          {/* Animated border glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-xl" />
        </motion.article>
      </GridBackground>
    </div>
  );
};

export default Project;