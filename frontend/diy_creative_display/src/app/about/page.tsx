import Link from "next/link";
import React from "react";
import Community from "../../../public/assets/about/community.jpg";
import Showcase from "../../../public/assets/about/showcase.jpg";
import Interact from "../../../public/assets/about/interact.jpg";
import Nkechi from "../../../public/assets/about/Nkechi.jpg";
import Bammie from "../../../public/assets/about/Bammie.jpg";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const About = () => {
  const team = [
    {
      name: "Nkechi Udenkwor",
      role: "BACKEND & FRONTEND",
      image: Nkechi,
      x: "https://twitter.com/Nkechi_belle",
      linkedin: "https://www.linkedin.com/in/nkechi-udenkwor-06b622198/",
      github: "https://github.com/Nkechi-Christabel",
    },
    {
      name: "Bamiwo Adebayo",
      role: "BACKEND",
      image: Bammie,
      x: " https://x.com/Bammie_M?t=rpZh33zmMvPrtF2TnR9Rvg&s=09",
      linkedin: "https://www.linkedin.com/in/bamiwo-adebayo-348708144",
      github: "https://github.com/bammietop03",
    },
  ];
  return (
    <div>
      <section className="hero scroll-smooth" id="top">
        <div className="bg-about-hero bg-cover bg-no-repeat h-[35rem] relative">
          <div className=" w-full h-full flex flex-col justify-center backdrop-brightness-[.60] text-white">
            <div className="container mx-auto max-w-7xl px-7">
              <h2 className="max-w-xl text-2xl font-bold">
                Welcome to DIY Creative Display where creativity knows no
                bounds!
              </h2>
              <p className="mt-4 max-w-xl">
                At DIY Creative Display, we're passionate about creativity,
                community, and the endless possibilities of DIY. Whether you're
                a seasoned crafter, a budding artist, or simply someone who
                loves to roll up their sleeves and get creative, you've come to
                the right place.
              </p>
              <Link href="/">
                <button
                  type="button"
                  className=" bg-gradient-to-br from-rose-500 to-amber-700 hover:bg-gradient-to-br hover:from-amber-600 hover:to-rose-600 w-fit py-2 px-6 mt-4 rounded-xl text-center"
                >
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <main className="container mx-auto pt-9 max-w-7xl px-7">
        <section className="features">
          <div className="sm:flex justify-between">
            <div className="flex-1 self-center">
              <h2 className="text-2xl font-bold mb-3 text-yellow-800 pr-6">
                Project Showcase
              </h2>
              <p className=" pr-6 pb-6">
                Explore a diverse range of DIY projects uploaded by our
                community members. From home decor and crafts to woodworking and
                gardening, find inspiration for your next creative endeavor.
                Browse through beautiful images, read detailed descriptions, and
                engage with fellow DIY enthusiasts through comments and likes.
              </p>
            </div>
            <div className="flex-1">
              {" "}
              <Image
                src={Showcase}
                alt="Wood work Diy"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="sm:flex justify-between">
            <div className="flex-1 self-center sm:order-2">
              <h2 className="text-2xl font-bold mb-3 text-yellow-800 sm:pl-6 pt-6">
                Community
              </h2>
              <p className="sm:pl-6 pb-6">
                Connect with a vibrant community of makers and creators from
                around the world. Share your passion projects, ask for advice,
                and collaborate with like-minded individuals who share your love
                for DIY. Engage in meaningful conversations, provide feedback,
                and build lasting relationships within our supportive community.
              </p>
            </div>
            <div className="flex-1">
              {" "}
              <Image
                src={Community}
                alt="Wood work Diy"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="sm:flex justify-between">
            <div className="flex-1 self-center">
              <h2 className="text-2xl font-bold mb-3 text-yellow-800 pr-6 pt-6">
                DIY Interaction Hub
              </h2>
              <p className=" pr-6 pb-5">
                This term highlights the interactive nature of the platform,
                where users can engage with content and each other through
                various actions such as saving projects, leaving comments,
                filtering content, and searching for specific topics or
                projects. It emphasizes the dynamic and collaborative aspect of
                DIY Creative Display, positioning it as a central hub for DIY
                enthusiasts to connect, share, and explore creative ideas
                together.
              </p>
            </div>
            <div className="flex-1">
              {" "}
              <Image
                src={Interact}
                alt="Wood work Diy"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        <section className="about-us mb-7 mt-16">
          <div className="sm:flex justify-between sm:space-x-8">
            <div>
              <h2 className="text-5xl md:max-w-base  text-yellow-800border-b-2 border-b-gray-300 pb-4 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-transparent bg-clip-text">
                Our Story, Mission & Values
              </h2>
              <p className="pt-4 ">
                DIY Creative Display began as a passion project between friends
                who shared a love for DIY and a desire to create a welcoming
                community for like-minded individuals. What started as a simple
                idea is quickly evolving into a thriving online platform, thanks
                to the dedication, hard work, and creativity of our founding
                team.
              </p>
            </div>
            <div>
              <p className="pt-5 sm:pt-0">
                At DIY Creative Display,{" "}
                <span className="text-amber-700 font-bold">our mission </span>
                is to inspire, empower, and connect DIY enthusiasts worldwide.
                We believe in the transformative power of creativity and the joy
                of making, and our goal is to provide a platform where
                individuals can unleash their imagination, share their passion
                projects, and learn from one another.
              </p>
              <p className="pt-5">
                We are guided by a set of{" "}
                <span className="text-amber-700 font-bold">core values </span>
                that shape everything we do. Creativity, collaboration,
                inclusivity, and authenticity are at the heart of our platform,
                driving us to create an environment where everyone feels
                welcome, supported, and inspired to unleash their creative
                potential.
              </p>
            </div>
          </div>
        </section>
        <section className="team">
          <div className="text-center sm:max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold py-4 text-yellow-800">
              Meet the Team
            </h2>
            <p>
              Meet our talented team of developers, and enthusiasts who are
              behind DIY Creative Display. Each member brings unique skills and
              perspectives to the table, united by a shared commitment to
              fostering creativity and community.
            </p>
          </div>
          <div className="sm:flex sm:space-x-14 mt-8">
            {team.map((team) => (
              <div key={team.x}>
                <Image
                  src={team.image}
                  alt="Team member"
                  width={250}
                  height={300}
                  className="w-full h-3/6 rounded"
                />
                <h3 className="text-yellow-700 text-lg font-bold py-2">
                  {team.name}
                </h3>
                <p className="text-gray-600">{team.role}</p>
                <div className="flex space-x-4 my-4 text-xl text-amber-900">
                  <Link href={team.x} target="_blank" rel="noreferrer">
                    <FaTwitter />
                  </Link>
                  <Link href={team.github} target="_blank" rel="noreferrer">
                    <FaGithub />
                  </Link>
                  <Link href={team.linkedin} target="_blank" rel="noreferrer">
                    <FaLinkedin />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
