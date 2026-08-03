import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectBento from '../components/ProjectBento';
import type { Project } from '../lib/projects';

// ProjectBento tracks clicks through next-plausible's usePlausible hook.
jest.mock('next-plausible', () => ({
  usePlausible: () => jest.fn(),
}));

const projects: Project[] = [
  {
    slug: 'learning-log',
    title: 'Learning Log',
    description: 'Turns scattered study notes into a structured knowledge base',
    problem: 'Knowledge is lost when it is never written down.',
    techStack: ['Python', 'Django', 'SQLite'],
    whyThisStack: [],
    solution: 'Capture and organize learning notes.',
    impact: 'A searchable learning record.',
    architecture: ['Django application organized around topics.'],
    category: 'Learning system',
    accent: 'from-violet-500 via-blue-500 to-cyan-400',
  },
  {
    slug: 'polling-app',
    title: 'Polling App',
    description: 'Collapses the gap between question and feedback',
    problem: 'Feedback arrives too slowly to be useful.',
    techStack: ['Next.js', 'TypeScript', 'Supabase'],
    whyThisStack: [],
    solution: 'Real-time feedback.',
    impact: 'Faster feedback loops.',
    architecture: ['Next.js application.'],
    category: 'Real-time platform',
    accent: 'from-fuchsia-500 via-violet-500 to-blue-500',
  },
];

describe('ProjectBento', () => {
  test('renders every project title as a case-study link', () => {
    render(<ProjectBento projects={projects} />);
    expect(screen.getByRole('link', { name: /Learning Log case study/ })).toHaveAttribute(
      'href',
      '/projects/learning-log'
    );
    expect(screen.getByRole('link', { name: /Polling App case study/ })).toHaveAttribute(
      'href',
      '/projects/polling-app'
    );
  });

  test('renders tech-stack pills for each project', () => {
    render(<ProjectBento projects={projects} />);
    expect(screen.getByText('Django')).toBeInTheDocument();
    expect(screen.getByText('Supabase')).toBeInTheDocument();
  });

  test('promotes the first card to the feature span when featured', () => {
    const { container } = render(<ProjectBento projects={projects} featured />);
    const featureLink = container.querySelector('a[href="/projects/learning-log"]');
    expect(featureLink?.className).toContain('lg:row-span-2');
  });

  test('does not add the feature span when not featured', () => {
    const { container } = render(<ProjectBento projects={projects} />);
    const firstLink = container.querySelector('a[href="/projects/learning-log"]');
    expect(firstLink?.className).not.toContain('lg:row-span-2');
  });
});
