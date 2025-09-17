# Brian Bett Portfolio

Welcome to my personal portfolio! I'm Brian Bett, a passionate developer focused on building modern, responsive web applications. This portfolio showcases my projects, skills, and experience, and is powered by next-generation AI-native tooling for rapid development and review.

---

## 🚀 Tech Stack

- **Language:** TypeScript
- **Frontend Framework:** React (Vite)
- **Styling:** TailwindCSS (utility-first CSS)
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Forms:** TailwindCSS Forms plugin
- **Deployment:** Vercel (CI/CD ready)
- **Version Control:** Git + GitHub

> **Note:** No backend or database required for this project, but optional integrations (e.g., Django REST API or Firebase) may be added later.

---

## 🤖 AI Integration Plan

### Code & Feature Generation
- AI (Trae IDE + ChatGPT) scaffolds portfolio components:
  - `Navbar.tsx`: Responsive navigation with smooth scroll
  - `Hero.tsx`: Landing intro with CTA buttons
  - `Projects.tsx`: Grid layout for project cards
  - `Timeline.tsx`: Education & experience timeline
- Prompts drive component creation and styling for responsive design and consistent UI/UX.

### Testing Support
- AI generates unit tests for reusable components (e.g., Navbar rendering, Contact form validation).
- Integration tests for form submission flows using Jest + React Testing Library.
- Example AI tasks:
  - Suggest edge cases for Contact form input validation.
  - Scaffold Jest test suites with TypeScript typings.

### Schema-Aware / API-Aware Generation
- If connected to an API (e.g., CMS or blog):
  - AI generates API hooks (`useProjects.ts`, `useBlogPosts.ts`) based on schema/OpenAPI definitions.
  - AI scaffolds TypeScript interfaces for responses and requests.

### In-Editor / PR Review Tooling
- **AI Tool:** Trae IDE (AI-native), supplemented by GitHub Copilot or CodeRabbit for PR review.
- **PR Support:**
  - Generate clear commit messages
  - Suggest improvements in code style, accessibility, and performance
  - Provide inline feedback on React patterns and Tailwind usage

---

## ✍️ Prompting Strategy

**Component Scaffolding Example:**
> Create a responsive Navbar component in React + TypeScript with TailwindCSS. Include links: Home, About, Projects, Experience, Contact. On desktop: inline menu. On mobile: hamburger menu with sliding sidebar. Highlight the active section on scroll. Use React Icons for the hamburger.

**Test Generation Example:**
> Write Jest + React Testing Library unit tests for ContactForm.tsx. Cover:
> - Renders all input fields
> - Shows validation error if fields are empty
> - Calls onSubmit with correct data when filled

---

## 🗺️ Roadmap

- [x] Initialize project with Vite + React + TypeScript
- [x] Configure TailwindCSS
- [ ] Add Navbar, Hero, Projects, Timeline, and Contact components
- [ ] Implement dark mode toggle
- [ ] Add animations (Framer Motion)
- [ ] Deploy on Vercel

---

## 📬 Contact

- **Email:** [brianbett756@gmail.com](mailto:brianbett756@gmail.com)
- **GitHub:** [github.com/brianbett](https://github.com/brianbett)
- **LinkedIn:** [linkedin.com/in/brianbett](https://linkedin.com/in/brianbett)

---

## 🛠️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/brianbett/brian-portoflio.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

Feel free to explore, contribute, or reach out for collaboration!
