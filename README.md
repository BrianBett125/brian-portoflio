# Brian Bett Portfolio

A modern, responsive portfolio website built with Next.js, showcasing projects, blog posts, and professional information.

## 🚀 Project Overview

This portfolio website is built using Next.js App Router, React, TypeScript, and Tailwind CSS. It features:

- Responsive design with dark/light mode
- Project showcase with filtering by technology
- Blog section with MDX support
- Contact form with validation
- Analytics dashboard
- SEO optimization with metadata
- Testing with Jest and React Testing Library

## 📋 Installation Instructions

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/brian-portoflio.git

# Navigate to the project directory
cd brian-portoflio/my-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Production Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t brian-portfolio .

# Run the container
docker run -p 3000:3000 brian-portfolio
```

## 🔧 Environment Variables

The following environment variables are used in this project:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_VERCEL_URL` | The URL where the site is deployed | http://localhost:3000 |
| `NEXT_PUBLIC_DOMAIN` | Domain for Plausible analytics | - |

Create a `.env.local` file in the root directory with these variables for local development.

## 📦 Dependencies

### Main Dependencies

- **next**: 15.5.3 - React framework
- **react**: 19.1.0 - UI library
- **react-dom**: 19.1.0 - React DOM renderer
- **typescript**: ^5 - Type checking
- **framer-motion**: ^12.23.15 - Animations
- **next-plausible**: ^3.12.4 - Analytics
- **react-hook-form**: ^7.63.0 - Form handling
- **react-hot-toast**: ^2.6.0 - Toast notifications
- **recharts**: ^3.2.1 - Charts for analytics
- **resend**: ^4.8.0 - Email sending
- **@prisma/client**: ^6.16.2 - Database ORM
- **gray-matter**: ^4.0.3 - Markdown frontmatter parsing
- **@next/mdx**: ^15.0.0 - MDX support

### Development Dependencies

- **jest**: ^30.1.3 - Testing framework
- **@testing-library/react**: ^16.3.0 - React testing utilities
- **@testing-library/jest-dom**: ^6.8.0 - DOM testing utilities
- **tailwindcss**: ^4 - Utility-first CSS framework
- **prisma**: ^6.16.2 - Database schema management
- **zod**: ^4.0.0 - Schema validation

## 🧪 Testing

This project uses Jest and React Testing Library for testing. Tests are located in the `__tests__` directory.

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📁 Codebase Structure

```
my-portfolio/
├── __tests__/            # Test files
├── app/                  # Next.js App Router pages
│   ├── about/            # About page
│   ├── analytics/        # Analytics dashboard
│   ├── api/              # API routes
│   ├── blog/             # Blog pages
│   ├── contact/          # Contact page
│   ├── projects/         # Projects pages
│   └── layout.tsx        # Root layout
├── components/           # Reusable React components
│   ├── BlogCard.tsx      # Blog post card
│   ├── ContactForm.tsx   # Contact form
│   ├── Footer.tsx        # Site footer
│   ├── HeroSection.tsx   # Hero section
│   ├── Navbar.tsx        # Navigation bar
│   ├── ProjectCard.tsx   # Project card
│   └── ThemeToggle.tsx   # Theme toggle button
├── content/              # Content files
│   └── blog/             # Blog posts in MDX
├── lib/                  # Utility functions and data
│   ├── caseStudies.ts    # Case studies data
│   ├── posts.ts          # Blog post utilities
│   ├── projects.ts       # Projects data
│   └── testimonialsData.ts # Testimonials data
├── prisma/               # Prisma database schema
├── public/               # Static assets
└── jest.config.js        # Jest configuration
```

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Current TODOs and Roadmap

- [ ] Add more blog posts
- [ ] Implement search functionality
- [ ] Add more project case studies
- [ ] Improve accessibility
- [ ] Add internationalization support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📸 Screenshots

Here are some screenshots of the updated portfolio design:

### Desktop View

![Desktop View](https://i.imgur.com/2023-09-22_23-44-05.png)

### Mobile View

![Mobile View](https://i.imgur.com/2023-09-22_23-46-05.png)

---

*This README is automatically updated to reflect changes in the codebase.*



