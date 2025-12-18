import React from "react";
import Project from "./Project";
import { GridPattern } from "./magicui/grid-pattern";

// My projects list
const projects: IProject[] = [
  {
    title: "AI-Based Medical Image Analysis",
    image: "",
    description:
      "Designed an AI model to assist in analyzing medical images, aiding in diagnosis.",
    techstack: ["Python", "Machine Learning", "Computer Vision"],
    github: "https://github.com/Shankar1920",
    preview: "",
  },
  {
    title: "Sleep Quality Test",
    image: "",
    description:
      "Created a model using user behavior inputs to predict sleep quality and offer suggestions.",
    techstack: ["Python", "Data Analysis", "Machine Learning"],
    github: "https://github.com/Shankar1920",
    preview: "",
  },
  {
    title: "Musical Event Test",
    image: "",
    description:
      "Developed a smart event handler that evaluates and recommends playlist preferences for events.",
    techstack: ["JavaScript", "Event Handling", "Recommendation Logic"],
    github: "https://github.com/Shankar1920",
    preview: "",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="min-h-[calc(100dvh-5.5rem)] relative flex items-start py-12 justify-center w-full"
    >
      <GridPattern strokeDasharray="1 2" className="fill-primary/30 -z-10 stroke-primary/80 [mask-image:radial-gradient(90vw_circle_at_center,var(--muted),transparent)]" />
      <div className="max-w-4xl w-full space-y-4">
        <h1 id="projects-heading" className="text-center font-black text-4xl max-sm:text-2xl">Featured Projects</h1>
        <p className="text-base p-1 max-sm:text-sm text-foreground text-center">A showcase of innovative AI & ML solutions</p>
        <ul className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 pt-8 pb-4">
          {projects.map((project, idx) => (
            <li key={idx} className="flex h-full">
              <Project project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
