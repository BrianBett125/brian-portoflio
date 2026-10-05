export type Experience = {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
};

export type Education = {
  institution: string;
  qualification: string;
  startDate: string;
  endDate: string;
  details: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  url?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  photo?: string;
};

export const profile = {
  name: "Brian Bett Kipkoech",
  headline: "Backend-Focused Full-Stack Engineer",
  valueStatement:
    "I build dependable backend systems and clear product workflows with Java, Spring Boot, Python, Django, TypeScript, and PostgreSQL.",
  yearsExperience: "Over 3 years",
  availability: "Open to work · Remote-ready · UTC+3",
  email: "brianbett756@gmail.com",
  github: "https://github.com/BrianBett125",
  linkedin: "https://linkedin.com/in/brian-bett-kipkoech",
  x: "https://x.com/Yow_Brah",
  roles: ["Full-Stack Engineer", "Backend Engineer", "Freelance Engineer"],
  location: "UTC+3",
  stack: [
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "TypeScript",
    "React",
    "Next.js",
    "PostgreSQL",
    "Docker",
  ],
  experience: [
    {
      company: "[TODO: Add employer or client]",
      role: "[TODO: Add role title]",
      location: "[TODO: Add location or remote]",
      startDate: "[TODO: YYYY-MM]",
      endDate: "[TODO: YYYY-MM or Present]",
      summary: "[TODO: Add verified responsibilities and outcomes.]",
    },
  ] satisfies Experience[],
  education: [
    {
      institution: "[TODO: Add institution]",
      qualification: "[TODO: Add qualification]",
      startDate: "[TODO: YYYY]",
      endDate: "[TODO: YYYY]",
      details: "[TODO: Add relevant details, or remove this entry.]",
    },
  ] satisfies Education[],
  certifications: [
    {
      name: "[TODO: Add certification or remove this entry]",
      issuer: "[TODO: Add issuing organization]",
      date: "[TODO: YYYY]",
    },
  ] as Certification[],
  testimonials: [] as Testimonial[],
} as const;
