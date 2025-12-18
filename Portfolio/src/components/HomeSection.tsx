import React from "react";
import { GridBackground } from "@/components/ui/grid-background";

// Home section with animated title
const HomeSection = () => {
  const headingWords = "Aspiring AI & ML Engineer".split(" ");

  return (
    <div className="relative w-full overflow-hidden">
      <GridBackground className="h-screen w-full">
        <section
          id="home"
          className="relative z-10 flex snap-start flex-col h-full items-center justify-center opacity-0 translate-y-8 animate-[fadeInUp_0.7s_ease-out_0.1s_forwards]"
        >
          <div className="max-w-4xl space-y-8">
            <h1 className="text-6xl text-center font-black max-sm:text-4xl transition-all duration-300">
              {headingWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block mr-4 max-sm:mr-2 opacity-0 -translate-y-4 hover:scale-110 transition-all duration-300 cursor-default animate-[fadeInDown_0.6s_ease-out_forwards]"
                  style={{
                    animationDelay: `${index * 100 + 300}ms`,
                    transformOrigin: "center bottom",
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="*:text-primary backdrop-blur-sm bg-foreground/5 p-4 leading-tight font-medium text-foreground/80 rounded-xl text-center text-xl max-sm:text-base opacity-0 translate-y-4 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_1.2s_forwards]">
              Aspiring AI & ML Engineer with a strong foundation in AI tools, Python and Machine Learning. Passionate about solving real-world problems using innovative data-driven and generative AI solutions.
            </p>
          </div>
        </section>
      </GridBackground>
    </div>
  );
};

export default HomeSection;