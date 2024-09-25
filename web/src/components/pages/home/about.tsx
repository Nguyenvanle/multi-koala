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
    <div className="flex flex-col px-4 py-4 bg-secondary pt-8">
      <div className="container px-auto flex flex-col">
        <div className="flex flex-col gap-4 items-center">
          <H1 className="text-primary">What&apos;s in Duokoala?</H1>

          <Lead>Everything you need to build great courses on the web.</Lead>
        </div>

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
    </div>
  );
}
