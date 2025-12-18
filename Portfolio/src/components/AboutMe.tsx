'use client'
import React from 'react'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { ContainerTextFlip } from './ui/container-text-flip'
import LeetcodeStats from './LeetcodeStats'

// About me section with profile image and bio
const AboutMe = ({ stats, totalAvailable, totalQuestions, recentSubmissions, submissionCalendar }: { stats: SubmissionStat[], totalAvailable: number, totalQuestions: Record<Difficulty, number>, recentSubmissions: RecentSubmission[], submissionCalendar: string }) => {
  // Animation variants for container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      },
    }
  }

  // Animation for individual items
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <motion.section
      id="about-me"
      className="flex snap-center min-h-screen py-14 max-w-4xl flex-col md:flex-row items-center justify-between max-sm:justify-center gap-8 max-sm:gap-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex-shrink-0 relative w-[400px] h-[400px] max-sm:w-[300px] max-sm:h-[300px]">
        <Image
          src="/image.png"
          alt="Hari Prasad"
          width={400}
          height={400}
          className="object-cover transition-all duration-500 rounded-full aspect-square border-4 border-primary/20 shadow-lg"
          priority
          sizes="(max-width: 640px) 300px, 400px"
        />
      </div>

      <motion.div
        className="space-y-4 max-md:px-4 text-center md:text-left"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl max-sm:text-3xl font-bold tracking-tight"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          Hari Prasad
        </motion.h1>
        <motion.h2
          className="text-2xl max-sm:text-xl font-semibold text-primary/80"
          variants={itemVariants}
        >
          Aspiring AI & ML Engineer
        </motion.h2>

        <motion.p
          className="max-sm:text-sm"
          variants={itemVariants}
        >
          Aspiring AI & ML Engineer with a strong foundation in AI tools, Python and Machine Learning. Passionate about building data-driven and generative AI solutions to solve real-world problems.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className='w-full flex items-center max-sm:flex-col gap-8 justify-between'
        >
          <ContainerTextFlip className='h-fit'
            words={['Innovative', 'Detail-Oriented', 'Collaborative', 'Driven', 'Curious']}
          />
          <LeetcodeStats stats={stats} recentSubmissions={recentSubmissions} totalAvailable={totalAvailable} totalQuestions={totalQuestions} submissionCalendar={submissionCalendar} />
        </motion.div>
        <motion.p
          className="text-xl pt-8 font-bold font-dancing-script"
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              scale: 0.9
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 1,
                delay: 0.2
              }
            }
          } as Variants}
          whileHover={{
            scale: 1.05,
            textShadow: "0px 0px 8px rgba(0,0,0,0.3)",
            transition: { duration: 0.2 }
          }}
        >
          &quot; The best way to predict the future is to create it. &quot;
        </motion.p>
      </motion.div>
    </motion.section>
  )
}

export default AboutMe