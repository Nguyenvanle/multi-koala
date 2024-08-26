import AboutCard from "@/components/pages/home/about-card";
import { H1, Lead } from "@/components/ui/typography";

export default function About() {
  const ABOUT_MENUS = [
    {
      title: "Friendly Interface",
      description:
        "Optimized for increased user experience and convenience on the website",
      link: "/courses",
      image: "/images/about-1.png",
    },
    {
      title: "Easy to manage your courses",
      description:
        "Designed to make account registration, course creation, and course tracking as simple as possible.",
      link: "/courses",
      image: "/images/about-2.png",
    },
    {
      title: "Multi-platform support",
      description:
        "Your course data is synced to the Duokoala mobile app. Make it easy for your students to stay up to date with the latest courses.",
      link: "/courses",
      image: "/images/about-3.png",
    },
  ];

  return (
    <div id="about" className="flex flex-col pt-20 mt-[-80px] gap-8">
      <H1>What&apos;s in Duokoala?</H1>
      <Lead>Everything you need to build great courses on the web.</Lead>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-4">
        {ABOUT_MENUS.map((menu) => (
          <AboutCard
            key={menu.title}
            title={menu.title}
            description={menu.description}
            link={menu.link}
            image={menu.image}
          />
        ))}
      </div>
    </div>
  );
}
