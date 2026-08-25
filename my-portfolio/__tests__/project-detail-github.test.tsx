import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectPage from '../app/projects/[slug]/page';

// The detail page's "View Code" button is the actual clickable link a visitor
// uses to reach the repository. This proves the real project data flows all the
// way to the rendered href (single source of truth), not just that a URL string
// exists in lib/projects.ts.
const RENDERED_REPO_LINKS: { slug: string; githubLink: string }[] = [
  { slug: 'polling-app', githubLink: 'https://github.com/BrianBett125/Polling-App' },
  { slug: 'learning-log', githubLink: 'https://github.com/BrianBett125/Learning_Log' },
  { slug: 'skillup', githubLink: 'https://github.com/BrianBett125/skillup' },
  { slug: 'nail-it', githubLink: 'https://github.com/BrianBett125/Nail_It' },
  { slug: 'python-projects', githubLink: 'https://github.com/BrianBett125/python-projects' },
];

describe('project detail GitHub link', () => {
  afterEach(cleanup);

  test.each(RENDERED_REPO_LINKS)(
    'renders a View Code link to $githubLink for the $slug detail page',
    async ({ slug, githubLink }) => {
      const ui = await ProjectPage({ params: Promise.resolve({ slug }) });
      render(ui);

      const link = screen.getByRole('link', { name: /view code/i });
      expect(link).toHaveAttribute('href', githubLink);

      // GitHub is an external destination: follow the existing new-tab convention.
      expect(link).toHaveAttribute('target', '_blank');
      const rel = link.getAttribute('rel') ?? '';
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  );

  test('keeps the pre-existing Java From Scratch link intact', async () => {
    const ui = await ProjectPage({ params: Promise.resolve({ slug: 'java-from-scratch' }) });
    render(ui);

    expect(screen.getByRole('link', { name: /view code/i })).toHaveAttribute(
      'href',
      'https://github.com/BrianBett125/java-from-scratch'
    );
  });
});
