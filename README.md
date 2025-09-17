� Brian Bett Portfolio

A modern, responsive personal portfolio built with React, TypeScript, and TailwindCSS, showcasing my projects, skills, and experience. This portfolio is AI-assisted, leveraging next-generation AI-native tooling (Trae) for scaffolding, testing, and review workflows.

� Tech Stack

✔ Language: TypeScript
✔ Frontend Framework: React (with Vite as the build tool)
✔ Styling: TailwindCSS (utility-first CSS)
✔ Animations: Framer Motion
✔ Icons: React Icons
✔ Forms: TailwindCSS Forms plugin
✔ Deployment: Vercel (CI/CD ready)
✔ Version Control: Git + GitHub

✅ Database and backend not required for this project, but optional integrations (e.g., Django REST API or Firebase) may be added later.

� AI Integration Plan
� Code or Feature Generation

✔ AI (Trae IDE + ChatGPT) will scaffold portfolio components, such as:
✔ Navbar.tsx → Responsive navigation with smooth scroll
✔ Hero.tsx → Landing intro with CTA buttons
✔ Projects.tsx → Grid layout for project cards
✔ Timeline.tsx → Education & experience timeline
✔ Prompts will drive component creation and styling, ensuring responsive design and consistent UI/UX.

�� Testing Support

✔ AI will generate unit tests for reusable components (e.g., Navbar rendering, form validation in Contact section).
✔ AI will help design integration tests for form submission flows using Jest + React Testing Library.
✔ Sample AI tasks:
✔ Suggest edge cases for Contact form input validation.
✔ Scaffold Jest test suites with TypeScript typings pre-configured.

� Schema-Aware / API-Aware Generation

✔ If I later connect this portfolio to an API (e.g., projects from a CMS or blog posts from an API):
✔ AI will generate API hooks (useProjects.ts, useBlogPosts.ts) based on schema or OpenAPI definitions.
✔ AI can scaffold TypeScript interfaces for responses and requests to reduce manual typing.

� In-Editor / PR Review Tooling

✔ AI Tool: Trae IDE (AI-native), supplemented by GitHub Copilot or CodeRabbit for PR review.
✔ PR Support:
✔ Generate clear commit messages.
✔ Suggest improvements in code style, accessibility, and performance.
✔ Provide inline feedback on React patterns and Tailwind usage.

✍️ Prompting Strategy
Example 1 — Component Scaffolding
Create a responsive Navbar component in React + TypeScript with TailwindCSS. 
Include links: Home, About, Projects, Experience, Contact. 
On desktop → inline menu. On mobile → hamburger menu with sliding sidebar. 
Highlight the active section on scroll. Use React Icons for the hamburger.

Example 2 — Test Generation
Write Jest + React Testing Library unit tests for ContactForm.tsx. 
Cover these cases:
- Renders all input fields
- Shows validation error if fields are empty
- Calls onSubmit with correct data when filled

� Roadmap

✔ [x] Initialize project with Vite + React + TypeScript
✔ [x] Configure TailwindCSS
✔ [ ] Add Navbar, Hero, Projects, Timeline, and Contact components
✔ [ ] Implement dark mode toggle
✔ [ ] Add animations (Framer Motion)
✔ [ ] Deploy on Vercel

� Contact

✔ Email: brianbett756@gmail.com

✔ GitHub: github.com/brianbett

✔ LinkedIn: linkedin.com/in/brianbett
