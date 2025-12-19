import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chitrada Durga Gowri Sankar — Portfolio",
    short_name: "Chitrada Durga Gowri Sankar",
    description: "Portfolio of Chitrada Durga Gowri Sankar — B.Tech AI & Data Science student",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/avatar.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  }
}
