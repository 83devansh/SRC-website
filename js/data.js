/**
 * ==========================================================================
 * Student Research Council (SRC) - Centralized Data Store
 * Easily update team members, events, statistics, contact details & Curiominds
 * ==========================================================================
 */

const SRC_DATA = {
  // Council Core Identity & General Info
  config: {
    name: "Student Research Council",
    shortName: "SRC",
    tagline: "Where Innovation Meets Reality",
    description: "Empowering students to explore ideas, conduct research, build innovative solutions, and transform concepts into real-world impact.",
    email: "[SRC Email: contact@src-council.edu]",
    phone: "[SRC Contact Phone / Extension]",
    location: "[University Research Hub, Innovation Complex, Block B]",
    officeHours: "[Monday – Friday: 2:00 PM – 6:00 PM]",
    socials: {
      linkedin: "#",
      github: "#",
      twitter: "#",
      instagram: "#",
      discord: "#"
    }
  },

  // Impact Statistics (Animated Counters)
  statistics: [
    {
      id: "events",
      number: 15,
      suffix: "+",
      label: "Events Conducted",
      placeholderTag: "[Replace with Verified Count]"
    },
    {
      id: "students",
      number: 1200,
      suffix: "+",
      label: "Students Engaged",
      placeholderTag: "[Replace with Verified Count]"
    },
    {
      id: "research",
      number: 45,
      suffix: "+",
      label: "Research Initiatives",
      placeholderTag: "[Replace with Verified Count]"
    },
    {
      id: "projects",
      number: 30,
      suffix: "+",
      label: "Innovative Projects",
      placeholderTag: "[Replace with Verified Count]"
    }
  ],

  // What SRC Does (From Ideas to Impact)
  whatWeDo: [
    {
      id: "research",
      icon: "🔬",
      title: "Research",
      description: "Encouraging students to explore research questions, deep-tech paradigms, and emerging technologies through systematic methodology."
    },
    {
      id: "innovation",
      icon: "💡",
      title: "Innovation",
      description: "Turning creative ideas into meaningful solutions and usable prototypes that address pressing contemporary challenges."
    },
    {
      id: "collaboration",
      icon: "🤝",
      title: "Collaboration",
      description: "Connecting students, faculty mentors, industry researchers, and peer innovators across cross-disciplinary domains."
    },
    {
      id: "competitions",
      icon: "🏆",
      title: "Competitions",
      description: "Providing high-stakes platforms, hackathons, and ideathons where students can test, benchmark, and showcase their ideas."
    },
    {
      id: "workshops",
      icon: "🛠️",
      title: "Workshops",
      description: "Hands-on learning through intensive technical bootcamps, research paper reading groups, and practical laboratory sessions."
    },
    {
      id: "entrepreneurship",
      icon: "🚀",
      title: "Entrepreneurship",
      description: "Encouraging students to transform laboratory breakthroughs and innovative intellectual property into viable real-world ventures."
    }
  ],

  // Events & Workshops Directory
 // Events & Workshops Directory
events: [

  // ============================================================
  // 1. DIGITOD VISIT
  // ============================================================
  {
    id: "digitod-visit",

    title: "Digitod Visit",

    category: "Visits",

    status: "Upcoming",

    badgeColor: "cyan",

    shortDescription:
      "An educational visit offering students exposure to real-world technology, innovation, and professional practices.",

    fullDescription:
      "Digitod Visit was organised as an experiential learning opportunity for students to step outside the classroom and gain practical exposure. The visit encouraged students to observe, learn, interact, and connect academic knowledge with real-world applications.",

    highlights: [
      "Experiential learning",
      "Technology exposure",
      "Professional interaction",
      "Real-world learning"
    ],

    agenda: [
      "Orientation and introduction",
      "Guided visit",
      "Interactive learning",
      "Student interaction and discussion"
    ],

    prerequisites:
      "Open to participating SRC students.",

   image: "event-img/digitod-visit.png",
  },


  // ============================================================
  // 2. AI & ROBOTICS HACKATHON
  // ============================================================
  {
    id: "ai-robotics-hackathon",

    title: "AI & Robotics Hackathon",

    category: "Hackathons",

    status: "Upcoming",

    badgeColor: "violet",

    shortDescription:
      "A technology-focused hackathon bringing together students to explore artificial intelligence, robotics, and innovative problem solving.",

    fullDescription:
      "The AI & Robotics Hackathon provides students with a platform to collaborate, experiment, build, and present technology-driven solutions. The event encourages creativity, technical thinking, teamwork, and rapid prototyping.",

    highlights: [
      "Artificial Intelligence",
      "Robotics",
      "Team collaboration",
      "Problem solving",
      "Prototype development"
    ],

    agenda: [
      "Problem exploration",
      "Team formation and ideation",
      "Development and experimentation",
      "Project demonstrations",
      "Final evaluation"
    ],

    prerequisites:
      "Open to students interested in AI, robotics, coding, electronics, and innovation.",

    image: "event-img/hackathon.png",
  },


  // ============================================================
  // 3. BINARY BATTLES — COMPLETED
  // ============================================================
  {
    id: "binary-battles",

    title: "Binary Battles",

    category: "Competitions",

    status: "Completed",

    badgeColor: "cyan",

    shortDescription:
      "A technical competition that challenged students' logical thinking, problem-solving abilities, and technical skills.",

    fullDescription:
      "Binary Battles created an engaging competitive environment where students challenged themselves through technical problems and logical thinking. The event combined competition, learning, and student engagement in a fast-paced format.",

    highlights: [
      "Technical challenges",
      "Logical thinking",
      "Problem solving",
      "Competitive learning",
      "Student engagement"
    ],

    agenda: [
      "Challenge briefing",
      "Competition rounds",
      "Problem solving",
      "Final challenge",
      "Results and recognition"
    ],

    prerequisites:
      "Open to participating students.",

    date: "Completed",
    time: "Details to be updated",
    location: "Details to be updated",

    image: "event-img/binary-battles.png"
  },


  // ============================================================
  // 4. NIRMAN
  // ============================================================
  {
    id: "nirman",

    title: "Nirman",

    category: "Innovation",

    status: "Upcoming",

    badgeColor: "amber",

    shortDescription:
      "An innovation-focused initiative encouraging students to transform ideas into meaningful creations and solutions.",

    fullDescription:
      "Nirman focuses on the spirit of creation and innovation. It provides students with an opportunity to explore ideas, develop solutions, collaborate with peers, and showcase their creativity through practical work.",

    highlights: [
      "Innovation",
      "Creative thinking",
      "Idea development",
      "Collaboration",
      "Solution building"
    ],

    agenda: [
      "Idea exploration",
      "Problem identification",
      "Solution development",
      "Project showcase",
      "Recognition"
    ],

    prerequisites:
      "Open to students interested in innovation and creating solutions.",

    image: "event-img/nirmaan.png"
  },


  // ============================================================
  // 5. WORKSHOPS
  // ============================================================
  {
    id: "workshops",

    title: "Workshops",

    category: "Workshops",

    status: "Upcoming",

    badgeColor: "emerald",

    shortDescription:
      "Interactive learning sessions designed to help students develop practical knowledge, technical skills, and research capabilities.",

    fullDescription:
      "SRC workshops provide students with opportunities to learn beyond the classroom through interactive sessions, demonstrations, discussions, and hands-on activities. The workshops are designed to encourage continuous learning and practical skill development.",

    highlights: [
      "Interactive learning",
      "Hands-on activities",
      "Technical skill development",
      "Research exposure",
      "Knowledge sharing"
    ],

    agenda: [
      "Introduction to the topic",
      "Expert-led learning session",
      "Interactive activity",
      "Hands-on exploration",
      "Discussion and Q&A"
    ],

    prerequisites:
      "Requirements may vary depending on the individual workshop.",

    image: "event-img/workshops.png"
  },


  // ============================================================
  // 6. LQLP
  // ============================================================
  {
    id: "lqlp",

    title: "LQLP",

    category: "Research",

    status: "Upcoming",

    badgeColor: "cyan",

    shortDescription:
      "An SRC initiative focused on learning, exploration, and developing a stronger research-oriented mindset among students.",

    fullDescription:
      "LQLP is part of SRC's efforts to encourage students to engage with research, learning, and exploration. The initiative creates opportunities for students to participate, exchange ideas, and develop their academic and research perspectives.",

    highlights: [
      "Research exposure",
      "Learning",
      "Student participation",
      "Idea exchange",
      "Academic exploration"
    ],

    agenda: [
      "Introduction",
      "Learning and exploration",
      "Interactive discussion",
      "Student participation",
      "Knowledge sharing"
    ],

    prerequisites:
      "Open to participating SRC students.",

    image: "event-img/LQLP.png"
  },


  // ============================================================
  // 7. INTERNATIONAL FORENSIC VISIT
  // ============================================================
  {
    id: "international-forensic-visit",

    title: "International Forensic Visit",

    category: "Visits",

    status: "Upcoming",

    badgeColor: "violet",

    shortDescription:
      "An educational visit providing students with exposure to forensic science, investigation, and specialised professional practices.",

    fullDescription:
      "The International Forensic Visit offers students an opportunity to gain exposure to the field of forensic science and understand how scientific methods can be applied in investigative environments. The experience encourages curiosity, observation, and practical learning.",

    highlights: [
      "Forensic science exposure",
      "Practical learning",
      "Professional environment",
      "Scientific investigation",
      "Experiential education"
    ],

    agenda: [
      "Introduction and orientation",
      "Guided forensic exposure",
      "Observation and learning",
      "Interactive discussion",
      "Student Q&A"
    ],

    prerequisites:
      "Open to participating students.",

    image: "event-img/FORENSIC-VISIT.png"
  },


  // ============================================================
  // 8. SRC CARNIVAL
  // ============================================================
  {
    id: "src-carnival",

    title: "SRC Carnival",

    category: "Community",

    status: "Upcoming",

    badgeColor: "amber",

    shortDescription:
      "A vibrant SRC gathering bringing students together through interactive activities, engagement, creativity, and community spirit.",

    fullDescription:
      "SRC Carnival is a student-focused celebration designed to bring the SRC community together. Through interactive activities and engaging experiences, the carnival creates an environment where students can connect, participate, have fun, and discover the wider SRC community.",

    highlights: [
      "Student engagement",
      "Interactive activities",
      "Community building",
      "Creativity",
      "Fun and collaboration"
    ],

    agenda: [
      "Opening and welcome",
      "Interactive activities",
      "Student engagement sessions",
      "Community interactions",
      "Closing celebration"
    ],

    prerequisites:
      "Open to participating students.",

    image: "event-img/CARNIVAL.png"
  },


  // ============================================================
  // 9. IDEATHON — COMPLETED
  // ============================================================
  {
    id: "ideathon",

    title: "Ideathon",

    category: "Innovation",

    status: "Completed",

    badgeColor: "amber",

    shortDescription:
      "A completed idea-generation event where students explored problems, developed concepts, and presented innovative solutions.",

    fullDescription:
      "Ideathon was conducted as an idea-generation and innovation event where students explored real-world problems, developed creative concepts, and presented potential solutions. The event encouraged collaboration, problem-solving, creativity, and entrepreneurial thinking.",

    highlights: [
      "Idea generation",
      "Problem solving",
      "Innovation",
      "Student participation",
      "Creative thinking"
    ],

    agenda: [
      "Problem identification",
      "Idea generation",
      "Solution development",
      "Idea presentations",
      "Results and recognition"
    ],

    prerequisites:
      "Open to participating students.",

    date: "Completed",
    time: "Details to be updated",
    location: "Details to be updated",

    image: "event-img/ideathon.png"
  },


  // ============================================================
  // 10. PROTOSPHERE — COMPLETED
  // ============================================================
  {
    id: "protosphere",

    title: "Protosphere",

    category: "Innovation",

    status: "Completed",

    badgeColor: "violet",

    shortDescription:
      "A completed innovation and prototyping event focused on turning student ideas into practical concepts and prototypes.",

    fullDescription:
      "Protosphere was conducted as an innovation and prototyping event focused on transforming student ideas into practical concepts. The event encouraged experimentation, prototype development, presentation, and solution-oriented thinking.",

    highlights: [
      "Prototyping",
      "Innovation",
      "Idea development",
      "Practical solutions",
      "Project presentation"
    ],

    agenda: [
      "Problem exploration",
      "Idea development",
      "Prototype planning",
      "Project presentation",
      "Results and recognition"
    ],

    prerequisites:
      "Open to participating students.",

    date: "Completed",
    time: "Details to be updated",
    location: "Details to be updated",

    image: "event-img/protosphere.png"
  }

],
  // Leadership & Team Directory
  team: {
    founder: {
      name: "[Founder Name]",
      role: "Founder, Student Research Council",
      department: "[Department / Academic Field]",
      bio: "Visionary student leader dedicated to building an institutional bridge between academic inquiry and transformative real-world innovation.",
      quote: "Research is not confined to laboratories—it begins the moment a student dares to ask 'What if?' and commits to building the answer.",
      photoPlaceholder: "[Founder Photo Placeholder]",
      socials: {
        linkedin: "#",
        github: "#",
        email: "[founder@src-council.edu]"
      }
    },
    coFounders: [
      {
        id: "cofounder-1",
        name: "[Co-Founder Name]",
        role: "Co-Founder & Head of Research",
        department: "[Computer Science / AI Specialization]",
        bio: "Leading research programs, mentor matching, and international conference publishing initiatives across campus.",
        photoPlaceholder: "[Co-Founder Photo Placeholder]",
        socials: { linkedin: "#", github: "#" }
      },
      {
        id: "cofounder-2",
        name: "[Co-Founder Name]",
        role: "Co-Founder & Head of Innovation",
        department: "[Electrical & Electronics Engineering]",
        bio: "Overseeing hardware prototyping labs, hackathons, and technology incubation tracks for student projects.",
        photoPlaceholder: "[Co-Founder Photo Placeholder]",
        socials: { linkedin: "#", github: "#" }
      }
    ],
    leads: [
      {
        id: "lead-1",
        name: "[SRC Lead Name]",
        role: "Technical Operations Lead",
        department: "[Software Engineering]",
        bio: "Directs web infrastructure, cloud research compute environments, and algorithmic challenge design.",
        photoPlaceholder: "[Lead Photo Placeholder]",
        category: "leads"
      },
      {
        id: "lead-2",
        name: "[SRC Lead Name]",
        role: "Events & Workshops Lead",
        department: "[Data Science & Analytics]",
        bio: "Curates symposia, research masterclasses, and hands-on laboratory workshops for the council.",
        photoPlaceholder: "[Lead Photo Placeholder]",
        category: "leads"
      },
      {
        id: "lead-3",
        name: "[SRC Lead Name]",
        role: "Curiominds Initiative Lead",
        department: "[Interdisciplinary Studies]",
        bio: "Drives grassroots curiosity, ideation circles, and student community engagement tracks.",
        photoPlaceholder: "[Lead Photo Placeholder]",
        category: "leads"
      },
      {
        id: "lead-4",
        name: "[SRC Lead Name]",
        role: "Outreach & Partnerships Lead",
        department: "[Business & Technology Management]",
        bio: "Builds strategic alliances with industry R&D labs, faculty advisors, and institutional sponsors.",
        photoPlaceholder: "[Lead Photo Placeholder]",
        category: "leads"
      }
    ],
    coreTeam: [
      {
        id: "core-1",
        name: "[Core Member Name]",
        role: "Research Associate",
        department: "[Bioengineering]",
        category: "core"
      },
      {
        id: "core-2",
        name: "[Core Member Name]",
        role: "Design & UX Specialist",
        department: "[Human-Computer Interaction]",
        category: "core"
      },
      {
        id: "core-3",
        name: "[Core Member Name]",
        role: "Robotics & IoT Lead",
        department: "[Mechanical Engineering]",
        category: "core"
      },
      {
        id: "core-4",
        name: "[Core Member Name]",
        role: "Editorial & Publications",
        department: "[Applied Mathematics]",
        category: "core"
      },
      {
        id: "core-5",
        name: "[Core Member Name]",
        role: "Community Coordinator",
        department: "[Cybersecurity]",
        category: "core"
      },
      {
        id: "core-6",
        name: "[Core Member Name]",
        role: "Logistics Coordinator",
        department: "[Information Technology]",
        category: "core"
      }
    ]
  },

  // Curiominds Specific Data
  curiominds: {
    name: "Curiominds",
    tagline: "Curiosity. Ideas. Innovation.",
    heroSubtitle: "Where Curiosity Becomes Creation",
    description: "Curiominds is the newly launched flagship initiative under the Student Research Council. It is designed as an open, barrier-free playground for students who have audacious ideas and a hunger to question, experiment, and build.",
    pillars: [
      {
        icon: "✨",
        title: "Curiosity",
        desc: "Encouraging students to wonder, probe deeper questions, and challenge conventional assumptions."
      },
      {
        icon: "💡",
        title: "Ideas",
        desc: "Nurturing raw thoughts into structured conceptual hypotheses and viable project scopes."
      },
      {
        icon: "🔬",
        title: "Exploration",
        desc: "Providing tools, lab access, and experimental sandboxes to test theories fearlessly."
      },
      {
        icon: "🧩",
        title: "Problem Solving",
        desc: "Framing technical and scientific solutions for pressing real-world community dilemmas."
      },
      {
        icon: "🚀",
        title: "Innovation",
        desc: "Transforming insights and prototypes into deployable solutions and student-led publications."
      }
    ],
    activities: [
      {
        icon: "💡",
        title: "Idea Exploration",
        description: "Open-floor brainstorming sessions where no idea is too wild or too early to discuss."
      },
      {
        icon: "🔍",
        title: "Research Discussions",
        description: "Casual yet rigorous breakdown of seminal scientific papers, breakthroughs, and tech trends."
      },
      {
        icon: "⚙️",
        title: "Problem-Solving Circles",
        description: "Collaborative pods addressing civic, campus, and global challenges through engineering."
      },
      {
        icon: "⚡",
        title: "Innovation Challenges",
        description: "Rapid design-sprints and micro-competitions with quick turnaround prototypes."
      },
      {
        icon: "👥",
        title: "Student Collaboration",
        description: "Forming multi-disciplinary teams across computer science, biotech, hardware, and design."
      },
      {
        icon: "📚",
        title: "Knowledge Sharing",
        description: "Peer-to-peer technical tutorials, open-source repositories, and mentorship exchanges."
      }
    ]
  },

  // Timeline / Milestones for About Page
  timeline: [
    {
      date: "[Inception - Month Year]",
      title: "[Milestone: Foundation of Student Research Council]",
      description: "Conceived by student innovators and faculty mentors to create a dedicated hub for student-driven scientific investigation."
    },
    {
      date: "[Semester 1 Milestone]",
      title: "[Milestone: First Campus Research Symposium]",
      description: "Hosted over 300+ students and showcased 40+ research posters with distinguished academic keynote speakers."
    },
    {
      date: "[Semester 2 Milestone]",
      title: "[Milestone: Establishment of Prototyping Labs & Mentorship]",
      description: "Secured faculty advisor partnerships and launched continuous project grants for undergraduate investigators."
    },
    {
      date: "[Newly Launched]",
      title: "Launch of Curiominds Platform",
      description: "Unveiled the Curiominds initiative to nurture grassroots curiosity, interdisciplinary thinking, and rapid problem-solving."
    },
    {
      date: "[Future Horizon]",
      title: "[Roadmap: Global Research Exchange & Venture Incubator]",
      description: "Expanding publication mentorship and establishing formal incubation pathways for student intellectual property."
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      question: "Who can join the Student Research Council (SRC)?",
      answer: "SRC is open to all enrolled undergraduate, postgraduate, and doctoral students across all disciplines who are passionate about research, technology, and problem-solving."
    },
    {
      question: "What is the difference between SRC and Curiominds?",
      answer: "SRC is the overarching council managing academic research programs, formal symposia, grants, and institutional mentorship. Curiominds is SRC's newly launched creative sandbox designed for early-stage idea exploration, rapid brainstorming circles, and accessible innovation challenges."
    },
    {
      question: "Do I need previous research or publication experience to participate?",
      answer: "Not at all! SRC conducts introductory workshops on research methodology, paper drafting, literature reviews, and prototyping specifically to help beginners get started."
    },
    {
      question: "How can I pitch a research project or seek mentorship?",
      answer: "You can submit your project concept through our Contact page or join a Curiominds weekly ideation circle to get connected with a faculty mentor and peer collaborators."
    },
    {
      question: "Are SRC events and workshops free for students?",
      answer: "Yes, all regular workshops, symposia, research talks, and Curiominds sessions organized by SRC are completely free for student members."
    }
  ]
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.SRC_DATA = SRC_DATA;
}
