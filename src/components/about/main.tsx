import AboutType from "@/types/About";
import Image from "next/image";
import Link from "next/link";

/*
  Note:
    - The breakpoint transition from desktop to mobile is currently set to "lg" (this may need adjustment later).
    - Additional adjustments might be required for the tablet view.
*/

// About Data (Can be move to somewhere else)
const AboutData: AboutType[] = [
  {
    logo: "/assets/careercompass-logo.png",
    title: "CareerCompass",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo lectus vitae dui convallis lacinia.",
    igLink: "https://www.google.com/",
    tiktokLink: "https://www.google.com/",
    bgColor: "#C95454",
  },
  {
    logo: "/assets/techfusion-logo.png",
    title: "TechFusion",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo lectus vitae dui convallis lacinia.",
    igLink: "https://www.google.com/",
    tiktokLink: "https://www.google.com/",
    bgColor: "#FFFFFF",
  },
  {
    logo: "/assets/comp-logo.png",
    title: "Competition Realms",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo lectus vitae dui convallis lacinia.",
    igLink: "https://www.google.com/",
    tiktokLink: "https://www.google.com/",
    bgColor: "#0A2FB1",
  },
  {
    logo: "/assets/ltw-logo.png",
    title: "LinkToWork",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo lectus vitae dui convallis lacinia.",
    igLink: "https://www.google.com/",
    tiktokLink: "https://www.google.com/",
    bgColor: "#137CF8",
  },
  {
    logo: "/assets/sisu-logo.png",
    title: "SisuLab",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo lectus vitae dui convallis lacinia.",
    igLink: "https://www.google.com/",
    tiktokLink: "https://www.google.com/",
    bgColor: "#989898",
  },
  {
    logo: "/assets/virtualxplore-logo.png",
    title: "VirtualXplore",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo lectus vitae dui convallis lacinia.",
    igLink: "https://www.google.com/",
    tiktokLink: "https://www.google.com/",
    bgColor: "#F8B200",
  },
  {
    logo: "",
    title: "Indonesian Organization Chamber",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo lectus vitae dui convallis lacinia.",
    igLink: "https://www.google.com/",
    tiktokLink: "https://www.google.com/",
    bgColor: "#9854C9",
  },
  {
    logo: "/assets/college-copilot-logo.png",
    title: "College Copilot",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo lectus vitae dui convallis lacinia.",
    igLink: "https://www.google.com/",
    tiktokLink: "https://www.google.com/",
    bgColor: "#702FF9",
  },
  {
    logo: "",
    title: "Beautinesia",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo lectus vitae dui convallis lacinia.",
    igLink: "https://www.google.com/",
    tiktokLink: "https://www.google.com/",
    bgColor: "#702FF9",
  },
];

//About page Component (Call this to main page)
const About = () => (
  <div className="">
    <div className="text-center max-w-[730px] mx-auto space-y-[8px]">
      <p className="text-base lg:text-2xl font-semibold">About</p>
      {/* change this font style */}
      <p className="text-2xl lg:text-5xl font-normal">Magna Business Units</p>
      <p className="text-sm lg:text-base">
        Discover the diverse landscape of Magna Business Units, each dedicated
        to innovation and excellence in their respective fields
      </p>
    </div>
    {/* max-w can be remove if the width already set in the main page */}
    <div className="flex gap-4 lg:gap-8 justify-center flex-wrap mt-10 max-w-[1200px]">
      <AboutCard abouts={AboutData} />
    </div>
  </div>
);

//About Card UI Component (Can be move to somewhere else)
interface AboutCardProps {
  abouts: AboutType[];
}

const AboutCard = ({ abouts }: AboutCardProps) => (
  <>
    {abouts.map((about, index) => (
      <div
        className="border border-[#FFFFFF33] w-[170px]  h-[287px] lg:w-[265px] lg:h-[353px] max-h-[400px] p-[6px]"
        key={index}
      >
        <div className="h-[245px] lg:h-[307px]">
          <div className="relative w-full h-[80px] lg:h-[134px] bg-[#FFFFFF14]">
            <div className="flex justify-center h-full items-center ">
              <div
                className="absolute w-[35px] h-[35px] lg:h-[70px] lg:w-[70px] rotate-[25deg] rounded-[6px] lg:rounded-[14px]"
                style={{ backgroundColor: about.bgColor }}
              ></div>
              <div className="absolute w-[35px] h-[35px] lg:h-[70px] lg:w-[70px] rotate-0 rounded-[6px] lg:rounded-[14px] bg-white">
                <div className="flex justify-center items-center h-full">
                  <Image
                    src={about.logo}
                    alt={`${about.title} logo`}
                    width={37}
                    height={37}
                    className="w-[27px] lg:w-[37px] h-[27px] lg:h-[37px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="gap-2 lg:gap-[14px] w-[158px] lg:w-full h-[165px] lg:h-[173px] text-center">
            <div className="h-[40px] my-[12px] flex items-center justify-center">
              <p className="text-sm lg:text-xl font-bold">{about.title}</p>
            </div>
            <div className="h-[1px] w-[168px] mx-auto flex items-center justify-center bg-gradient-to-r from-transparent via-purple-800 to-transparent"></div>
            <p className="text-xs lg:text-sm pt-3 font-light">
              {about.description}
            </p>
          </div>
        </div>
        <div className="w-[56px] mx-auto  flex gap-[20px]">
          <Link href={about.igLink} target="_blank">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.02423 12.3066C10.5741 12.3066 11.8306 11.0501 11.8306 9.50018C11.8306 7.95022 10.5741 6.69373 9.02423 6.69373C7.47427 6.69373 6.21777 7.95022 6.21777 9.50018C6.21777 11.0501 7.47427 12.3066 9.02423 12.3066Z"
                fill="#A3A3A3"
              />
              <path
                d="M12.0726 2H5.92742C3.48387 2 1.5 3.98387 1.5 6.42742V12.5242C1.5 15.0161 3.48387 17 5.92742 17H12.0242C14.5161 17 16.5 15.0161 16.5 12.5726V6.42742C16.5 3.98387 14.5161 2 12.0726 2ZM9.02419 13.1774C6.96774 13.1774 5.34677 11.5081 5.34677 9.5C5.34677 7.49194 6.99194 5.82258 9.02419 5.82258C11.0323 5.82258 12.6774 7.49194 12.6774 9.5C12.6774 11.5081 11.0565 13.1774 9.02419 13.1774ZM14.1048 6.16129C13.8629 6.42742 13.5 6.57258 13.0887 6.57258C12.7258 6.57258 12.3629 6.42742 12.0726 6.16129C11.8065 5.89516 11.6613 5.55645 11.6613 5.14516C11.6613 4.73387 11.8065 4.41935 12.0726 4.12903C12.3387 3.83871 12.6774 3.69355 13.0887 3.69355C13.4516 3.69355 13.8387 3.83871 14.1048 4.10484C14.3468 4.41935 14.5161 4.78226 14.5161 5.16935C14.4919 5.55645 14.3468 5.89516 14.1048 6.16129Z"
                fill="#A3A3A3"
              />
              <path
                d="M13.1133 4.56433C12.7988 4.56433 12.5327 4.83046 12.5327 5.14498C12.5327 5.45949 12.7988 5.72562 13.1133 5.72562C13.4278 5.72562 13.694 5.45949 13.694 5.14498C13.694 4.83046 13.452 4.56433 13.1133 4.56433Z"
                fill="#A3A3A3"
              />
            </svg>
          </Link>
          <Link href={about.tiktokLink} target="_blank">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.3125 6.125V8.9375C16.3125 9.08668 16.2532 9.22976 16.1477 9.33525C16.0423 9.44074 15.8992 9.5 15.75 9.5C14.5749 9.50273 13.4168 9.22019 12.375 8.67664V11.4688C12.375 12.886 11.812 14.2452 10.8099 15.2474C9.8077 16.2495 8.4485 16.8125 7.03125 16.8125C5.614 16.8125 4.2548 16.2495 3.25265 15.2474C2.2505 14.2452 1.6875 12.886 1.6875 11.4688C1.6875 8.87422 3.57961 6.58063 6.08906 6.13344C6.17002 6.11905 6.25314 6.12258 6.33258 6.14379C6.41203 6.165 6.48585 6.20336 6.54887 6.25619C6.61188 6.30901 6.66254 6.37501 6.69729 6.44952C6.73204 6.52404 6.75004 6.60528 6.75 6.6875V9.68914C6.75003 9.7956 6.71986 9.89988 6.66298 9.98987C6.6061 10.0799 6.52485 10.1519 6.42867 10.1975C6.20131 10.3053 6.00704 10.4722 5.86614 10.6807C5.72523 10.8892 5.64285 11.1316 5.62759 11.3828C5.61233 11.634 5.66474 11.8847 5.77937 12.1087C5.89399 12.3327 6.06662 12.5218 6.27926 12.6564C6.4919 12.791 6.73674 12.866 6.98826 12.8737C7.23978 12.8814 7.48876 12.8215 7.70922 12.7001C7.92968 12.5788 8.11355 12.4006 8.24165 12.184C8.36975 11.9674 8.43738 11.7204 8.4375 11.4688V2.1875C8.4375 2.03832 8.49676 1.89524 8.60225 1.78975C8.70774 1.68426 8.85082 1.625 9 1.625H11.8125C11.9617 1.625 12.1048 1.68426 12.2102 1.78975C12.3157 1.89524 12.375 2.03832 12.375 2.1875C12.3759 3.08232 12.7318 3.94022 13.3645 4.57296C13.9973 5.20569 14.8552 5.56157 15.75 5.5625C15.8992 5.5625 16.0423 5.62176 16.1477 5.72725C16.2532 5.83274 16.3125 5.97582 16.3125 6.125Z"
                fill="#A3A3A3"
              />
            </svg>
          </Link>
        </div>
      </div>
    ))}
  </>
);

export default About;
