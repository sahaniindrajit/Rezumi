import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";

const ResumeTemplate = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
      {/* Header */}
      <div className="bg-resume-header text-black p-8 print:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Alexander Chen</h1>
            <p className="text-xl opacity-90">Senior Software Engineer</p>
            <p className="text-base opacity-80 mt-2 max-w-2xl">
              Passionate full-stack developer with 6+ years of experience building scalable web applications 
              and leading engineering teams. Expertise in React, Node.js, and cloud technologies.
            </p>
          </div>
          <div className="text-sm space-y-2 md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:alexander.chen@email.com"
                className="underline hover:text-resume-accent"
              >
                alexander.chen@email.com
              </a>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <Phone className="w-4 h-4" />
              <a
                href="tel:+15551234567"
                className="underline hover:text-resume-accent"
              >
                +1 (555) 123-4567
              </a>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <MapPin className="w-4 h-4" />
               <a
                href="https://www.google.com/maps/place/San+Francisco,+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-resume-accent"
              >
                San Francisco, CA
              </a>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <Github className="w-4 h-4" />
                <a
                href="https://github.com/alexchen"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-resume-accent"
              >
                github.com/alexchen
              </a>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <Linkedin className="w-4 h-4" />
              <a
                href="https://linkedin.com/in/alexchen"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-resume-accent"
              >
                linkedin.com/in/alexchen
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 print:p-6 space-y-8">
        {/* Skills */}
        <section>
          <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
            SKILLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-resume-section mb-2">Programming Languages</h3>
              <p className="text-resume-text">JavaScript, TypeScript, Python, Java, Go, SQL</p>
            </div>
            <div>
              <h3 className="font-semibold text-resume-section mb-2">Frontend Technologies</h3>
              <p className="text-resume-text">React, Next.js, Vue.js, HTML5, CSS3, Tailwind CSS</p>
            </div>
            <div>
              <h3 className="font-semibold text-resume-section mb-2">Backend Technologies</h3>
              <p className="text-resume-text">Node.js, Express.js, PostgreSQL, MongoDB, Redis</p>
            </div>
            <div>
              <h3 className="font-semibold text-resume-section mb-2">DevOps & Tools</h3>
              <p className="text-resume-text">AWS, Docker, Kubernetes, Git, CI/CD, Jenkins</p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
            EXPERIENCE
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-resume-text">Senior Software Engineer</h3>
                  <p className="text-resume-section font-medium">TechCorp Inc.</p>
                </div>
                <p className="text-resume-section">January 2022 - Present</p>
              </div>
              <ul className="list-disc list-inside space-y-1 text-resume-text text-sm ml-4">
                <li>Led a team of 5 engineers in developing a real-time collaboration platform using React and WebSocket</li>
                <li>Architected and implemented microservices backend with Node.js, reducing API response time by 40%</li>
                <li>Established CI/CD pipelines using GitHub Actions and AWS, improving deployment frequency by 300%</li>
                <li>Mentored junior developers and conducted code reviews, improving team code quality standards</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-resume-text">Software Engineer</h3>
                  <p className="text-resume-section font-medium">StartupXYZ</p>
                </div>
                <p className="text-resume-section">June 2020 - December 2021</p>
              </div>
              <ul className="list-disc list-inside space-y-1 text-resume-text text-sm ml-4">
                <li>Built responsive web applications using React, Redux, and Material-UI for 50K+ active users</li>
                <li>Developed RESTful APIs with Express.js and PostgreSQL, handling 10M+ requests per month</li>
                <li>Optimized database queries and implemented caching strategies, improving performance by 60%</li>
                <li>Collaborated with product team to define technical requirements and user experience flows</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-resume-text">Junior Developer</h3>
                  <p className="text-resume-section font-medium">WebSolutions LLC</p>
                </div>
                <p className="text-resume-section">August 2018 - May 2020</p>
              </div>
              <ul className="list-disc list-inside space-y-1 text-resume-text text-sm ml-4">
                <li>Developed client websites using JavaScript, HTML, and CSS following modern web standards</li>
                <li>Integrated third-party APIs and payment gateways for e-commerce platforms</li>
                <li>Participated in agile development process and daily standups with cross-functional teams</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
            PROJECTS
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                <h3 className="text-lg font-semibold text-resume-text">TaskFlow - Project Management Platform</h3>
                <p className="text-resume-section">December 2023</p>
              </div>
              <p className="text-resume-text text-sm mb-2">
                Built a full-stack project management application with real-time updates and team collaboration features.
              </p>
              <p className="text-resume-section text-sm">
                <strong>Technologies:</strong> React, Node.js, Socket.io, PostgreSQL, Docker
              </p>
              <a
                href="https://taskflow.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm underline hover:text-resume-accent"
              >
                <Globe className="w-4 h-4" /> Live Demo
              </a>
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                <h3 className="text-lg font-semibold text-resume-text">E-Commerce Analytics Dashboard</h3>
                <p className="text-resume-section">August 2023</p>
              </div>
              <p className="text-resume-text text-sm mb-2">
                Developed an analytics dashboard for tracking sales metrics and customer behavior with interactive charts.
              </p>
              <p className="text-resume-section text-sm">
                <strong>Technologies:</strong> Next.js, TypeScript, Chart.js, Prisma, MySQL
              </p>
              <a
                href="https://taskflow.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm underline hover:text-resume-accent"
              >
                <Globe className="w-4 h-4" /> Live Demo
              </a>
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                <h3 className="text-lg font-semibold text-resume-text">Weather App with Machine Learning</h3>
                <p className="text-resume-section">March 2023</p>
              </div>
              <p className="text-resume-text text-sm mb-2">
                Created a weather prediction app using ML algorithms to forecast weather patterns with 85% accuracy.
              </p>
              <p className="text-resume-section text-sm">
                <strong>Technologies:</strong> Python, TensorFlow, Flask, React, OpenWeather API
              </p>
              <a
                href="https://taskflow.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm underline hover:text-resume-accent"
              >
                <Globe className="w-4 h-4" /> Live Demo
              </a>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
            EDUCATION
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-lg font-semibold text-resume-text">Bachelor of Science in Computer Science</h3>
              <p className="text-resume-section font-medium">University of California, Berkeley</p>
              <p className="text-resume-section text-sm">GPA: 3.8/4.0</p>
            </div>
            <p className="text-resume-section">September 2014 - May 2018</p>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xl font-bold text-resume-header mb-4 border-b-2 border-resume-accent pb-2">
            CERTIFICATIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-resume-text">AWS Certified Solutions Architect</h3>
              <p className="text-resume-section text-sm">Amazon Web Services - 2023</p>
            </div>
            <div>
              <h3 className="font-semibold text-resume-text">Certified Kubernetes Administrator</h3>
              <p className="text-resume-section text-sm">Cloud Native Computing Foundation - 2023</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeTemplate;