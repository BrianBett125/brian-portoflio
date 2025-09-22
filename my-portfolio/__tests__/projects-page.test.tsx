import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectsPage from '../app/projects/page';
import * as projectsLib from '../lib/projects';

// Mock the projects module
jest.mock('../lib/projects', () => ({
  getProjects: jest.fn(),
}));

describe('ProjectsPage', () => {
  const mockProjects = [
    {
      slug: 'project-one',
      title: 'Project One',
      description: 'Description for project one',
      techStack: ['Next.js', 'TypeScript'],
      image: '/images/project-one.png',
      githubLink: 'https://github.com/user/project-one',
    },
    {
      slug: 'project-two',
      title: 'Project Two',
      description: 'Description for project two',
      techStack: ['React', 'JavaScript'],
      image: '/images/project-two.png',
      githubLink: 'https://github.com/user/project-two',
    },
    {
      slug: 'project-three',
      title: 'Project Three',
      description: 'Description for project three',
      techStack: ['Next.js', 'Tailwind'],
      image: '/images/project-three.png',
      githubLink: 'https://github.com/user/project-three',
    },
  ];

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock implementation for getProjects
    (projectsLib.getProjects as jest.Mock).mockResolvedValue(mockProjects);
  });

  test('renders projects page with title', async () => {
    render(<ProjectsPage />);
    
    // Check if the title is rendered
    expect(await screen.findByText('Projects')).toBeInTheDocument();
    expect(await screen.findByText('A selection of work I\'ve built and shipped.')).toBeInTheDocument();
  });

  test('loads and displays projects', async () => {
    render(<ProjectsPage />);
    
    // Wait for projects to load
    await waitFor(() => {
      expect(projectsLib.getProjects).toHaveBeenCalledTimes(1);
    });
    
    // Check if project titles are displayed
    expect(await screen.findByText('Project One')).toBeInTheDocument();
    expect(await screen.findByText('Project Two')).toBeInTheDocument();
    expect(await screen.findByText('Project Three')).toBeInTheDocument();
  });

  test('filters projects when tech filter is clicked', async () => {
    render(<ProjectsPage />);
    
    // Wait for projects and tech filters to load
    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeInTheDocument();
    });
    
    // Click on Next.js filter
    fireEvent.click(screen.getByText('Next.js'));
    
    // Should show Next.js projects and hide others
    await waitFor(() => {
      expect(screen.getByText('Project One')).toBeInTheDocument();
      expect(screen.getByText('Project Three')).toBeInTheDocument();
      expect(screen.queryByText('Project Two')).not.toBeInTheDocument();
    });
    
    // Click on All filter to reset
    fireEvent.click(screen.getByText('All'));
    
    // Should show all projects again
    await waitFor(() => {
      expect(screen.getByText('Project One')).toBeInTheDocument();
      expect(screen.getByText('Project Two')).toBeInTheDocument();
      expect(screen.getByText('Project Three')).toBeInTheDocument();
    });
  });
});