import HomeSection from '@/components/HomeSection'
import SkillsSection from '@/components/SkillsSection'
import AboutMe from '@/components/AboutMe'
import React from 'react'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

// Main page component
// Main page component
const Home = async () => {
  const { fetchLeetCodeData } = await import('@/actions/actions');

  let leetCodeData;
  try {
    leetCodeData = await fetchLeetCodeData('chitradashankar');
  } catch (error) {
    console.error("Failed to fetch LeetCode data", error);
    // Fallback data
    leetCodeData = {
      stats: [],
      totalQuestions: { Easy: 0, Medium: 0, Hard: 0 },
      totalAvailable: 0,
      recentSubmissions: [],
      submissionCalendar: "{}"
    };
  }

  const { stats, recentSubmissions, totalAvailable, totalQuestions, submissionCalendar } = leetCodeData;

  return (
    <div className='flex flex-col px-4 max-sm:px-2 w-full items-center snap-y snap-proximity justify-center'>
      <HomeSection />
      <AboutMe
        stats={stats}
        recentSubmissions={recentSubmissions}
        totalAvailable={totalAvailable}
        totalQuestions={totalQuestions}
        submissionCalendar={submissionCalendar}
      />
      <SkillsSection />
      <Projects />
      <Contact />
    </div>
  )
}

export default Home