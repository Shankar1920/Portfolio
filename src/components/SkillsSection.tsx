"use client";

import React from "react";
import { motion } from "motion/react";

import PythonSvg from "@/components/icons/python.svg";
import { GridPattern } from "./magicui/grid-pattern";

type SkillImage = React.FC<React.SVGProps<SVGSVGElement>>;

// Skills I know
const skills: { name: string; image?: SkillImage }[] = [
  { name: "Python", image: PythonSvg },
  { name: "Machine Learning" },
  { name: "AI Tools" },
  { name: "Generative AI" },
  { name: "NLP" },
  { name: "Data Analysis" },
  { name: "Excel" },
  { name: "Microsoft Word" },
  { name: "Communication" },
  { name: "Leadership" },
  { name: "Event Management" },
  { name: "Fast Learning" },
  { name: "Problem Solving" },
  { name: "Prompt Engineering" },
];

// Animation variant for individual skill cards
const skillCardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
    },
  }),
};

const SkillsSection = () => {
  return (
    <section
      className="min-h-[calc(100vh-7rem)] @container overflow-hidden relative space-y-4 items-center py-12 snap-start w-full flex flex-col justify-center"
      id="skills"
    >
      <GridPattern strokeDasharray="1 2" className="fill-primary/30 -z-10 stroke-primary/80 [mask-image:radial-gradient(90vw_circle_at_center,var(--muted),transparent)] sm:[mask-image:radial-gradient(90vh_circle_at_center,var(--muted),transparent)] md:[mask-image:radial-gradient(50vw_circle_at_center,var(--muted),transparent)] lg:[mask-image:radial-gradient(50vw_circle_at_center,var(--muted),transparent)]" />

      <motion.h1
        className="text-4xl text-center font-black max-sm:text-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h1>

      <motion.p
        className="font-medium backdrop-blur-[1px] dark:bg-foreground/5 px-2 rounded-md text-base max-sm:text-sm text-foreground/70 text-center max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Technologies and tools I work with
      </motion.p>

      <motion.div
        className="max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-wrap gap-3 pt-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="flex flex-1 group hover:bg-primary/20 transition-colors duration-300 gap-x-4 bg-foreground/5 backdrop-blur-[2px] min-w-[10rem] justify-center items-center p-4 rounded-md"
              custom={idx}
              variants={skillCardVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {skill.image ? (
                <skill.image className="w-8 group-hover:rotate-[360deg] h-8 text-foreground transition-all ease-in-out duration-500" />
              ) : (
                <div className="w-8 h-8 rounded-md bg-foreground/3 flex items-center justify-center text-xs font-semibold text-foreground">{skill.name[0]}</div>
              )}
              <span className="font-semibold text-sm text-accent-foreground text-nowrap transition-transform duration-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
