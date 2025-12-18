'use client'
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import SectionText from "./SectionText";

// Footer component
const Footer: React.FC<{ resumeLink: string }> = ({ resumeLink }) => {
  const currentYear = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative @container gap-y-8 overflow-hidden flex flex-col justify-center items-center px-2 py-[5rem]" aria-label="Site footer">
      {/* Decorative background text */}
      <SectionText className=" @max-sm:bottom-[-1rem]" text="sankar" />

      {/* Identity Section */}
      <section className="flex flex-row items-center justify-center gap-4 max-sm:flex-col max-sm:text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ amount: 0.5 }}
          className="relative shrink-0"
        >
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
            <NextImage
              src="/image.png"
              alt="Hari Prasad"
              width={60}
              height={60}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.h3
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ amount: 0.5 }}
            className="font-bold text-xl max-sm:text-lg text-center leading-tight"
          >
            Hari Prasad <span className="hidden sm:inline">|</span> <span className="block sm:inline">Aspiring AI & ML Engineer</span>
          </motion.h3>

          <motion.blockquote
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            viewport={{ amount: 0.5 }}
            className="font-dancing-script text-lg max-sm:text-base font-bold text-muted-foreground mt-1 text-center"
          >
            " The best way to predict the future is to create it. "
          </motion.blockquote>
        </div>
      </section>

      {/* Resume Button */}
      <section aria-label="Resume Download" className="mt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          viewport={{ amount: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          <motion.div whileHover={!reduceMotion ? { scale: 1.05 } : {}}>
            <Button variant="outline" asChild className="text-xs" aria-label="Download Resume">
              <Link target="_blank" href={resumeLink} rel="noopener noreferrer">
                <Download className="mr-2" />
                Get my Resume
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Copyright */}
      <motion.p
        role="contentinfo"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        viewport={{ amount: 0.5 }}
        className="absolute bottom-4 text-xs"
      >
        © {currentYear} All rights reserved.
      </motion.p>
    </footer>
  );
};

export default Footer;
