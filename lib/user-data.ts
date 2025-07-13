export const userDetails = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  phone: "+1 123-456-7890",
  location: "San Francisco, CA",
  summary: "Results-driven Full Stack Developer with 4+ years of experience designing and delivering high‑impact web applications. Expertise in React, TypeScript, and scalable system design. Proven track record leading cross‑functional teams, architecting RESTful services, and driving performance optimizations to improve user satisfaction and business metrics. Seeking a Senior Frontend Developer role at Meta to leverage my technical and leadership skills on cutting‑edge products.",
  experience: [
    {
      company: "Aapkabazar",
      role: "Senior Full Stack Developer",
      duration: "May 2025 – July 2025",
      description: [
        "Architected and implemented an AI‑driven content automation pipeline using DeepSeek AI, boosting product description throughput by 4× and saving 60 hours of manual effort per month.",
        "Designed a microservices‑based REST API with Redis caching and horizontal autoscaling—reduced endpoint redundancy by 35% and cut median response times from 450 ms to 220 ms under peak load.",
        "Led a 4‑member team to build a role‑based Manager Approval System with React, TypeScript, and MongoDB aggregation pipelines, reducing approval processing time by 40% and improving operational transparency.",
        "Developed an interactive analytics dashboard (Recharts + D3) to surface daily KPIs—enabled data‑driven decisions that increased on‑time order fulfillment by 15%."
      ]
    },
    {
      company: "Coding Ninjas",
      role: "Teaching Assistant, Data Structures & Algorithms",
      duration: "Feb 2024 – May 2024",
      description: [
        "Guided 150+ students through complex Java-based DSA modules, delivering hands‑on coding workshops and one‑on‑one mentorship.",
        "Refactored and extended course materials, introducing live coding demos and real‑world problem sets that boosted student engagement and comprehension.",
        "Collaborated with instructors to implement formative assessments—contributed to a 20% increase in overall course completion and a 30% improvement in average student coding proficiency."
      ]
    }
  ],
  projects: [
    {
      title: "Manager Approval System",
      description: [
        "Modular React + TypeScript SPA with role‑based access control, featuring real‑time order approval status updates.",
        "Backend built in Node.js/Express with MongoDB aggregation pipelines and WebSocket notifications to managers.",
        "Automated email/SMS alerts to stakeholders upon approval changes, reducing manual follow‑ups by 50%.",
        "Integrated comprehensive Cypress end‑to‑end tests ensuring 95% coverage across approval workflows."
      ],
      link: "https://manager-approval-demo.johndoe.com",
      
    },
    {
      title: "Statistical Dashboard",
      description: [
        "End‑to‑end data pipeline: Node.js ingestion service → MongoDB time‑series collections → Express API.",
        "Custom React dashboard using Chart.js and Recharts, with drill‑down filtering, export to CSV/PDF, and real‑time WebSocket updates.",
        "Implemented role‑based chart access and anomaly detection alerts via server‑side triggers, improving KPI monitoring by 30%.",
        "Styled with Tailwind CSS and accessible ARIA attributes to meet WCAG 2.1 AA standards."
      ],
      link: "https://stats-dashboard.johndoe.com",
     
    },
    {
      title: "AI Content Automation Pipeline",
      description: [
        "Node.js microservice orchestrating DeepSeek AI calls to auto‑generate product descriptions, FAQs, and benefit summaries.",
        "Containerized with Docker and deployed on Kubernetes (EKS) with HPA and circuit breakers for resilience at scale.",
        "Achieved 99.9% uptime handling 10,000+ requests/day; integrated Prometheus metrics and Grafana dashboards for monitoring.",
        "Added custom admin UI to review/generate batches, with live preview and rollback capabilities."
      ],
      link: "https://ai-content-pipeline.johndoe.com",
      
    }
  ],
  skills: [
    "JavaScript (ES6+)",
    "React & Redux",
    "TypeScript",
    "Node.js & Express",
    "MongoDB & Redis",
    "RESTful & GraphQL APIs",
    "AWS (EC2, S3, Lambda)",
    "Docker & Kubernetes",
    "System Design & Microservices",
    "Agile & Scrum Leadership",
    "Component Library Development",
    "Unit & Integration Testing (Jest, Mocha)"
  ],
  achievements: [
    "Designed and open‑sourced a React component library used by 500+ developers on GitHub.",
    "Awarded ‘Top Contributor’ at Coding Ninjas for highest student satisfaction scores in Q1 2024.",
    "Solved 300+ DSA and competitive programming problems, ranking in the top 5% globally on LeetCode."
  ],
  education: [
    {
      institution: "Maharaja Surajmal Institute of Technology",
      degree: "B.Tech in Computer Science & Engineering",
      year: "2023 – 2027",
      highlights: [
        "CGPA: 9.2/10.0",
        "Relevant coursework: Advanced Algorithms, Distributed Systems, Cloud Computing"
      ]
    }
  ],
  targetJobDescription: "Senior Frontend Developer at Meta: build and optimize high‑scale React/TypeScript applications, lead component library design, collaborate with product and backend teams on system architecture, mentor junior engineers, and drive best practices in performance and UX."
};
