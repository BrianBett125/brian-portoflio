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
      slug: 'learning-log',
      title: 'Learning Log',
      description: 'Personal knowledge management app',
      whyItMatters: "Most knowledge is lost because it's never written down",
      techStack: ['Python', 'Django'],
      solution: 'Capture and organize learning notes.',
    },
    {
      slug: 'polling-app',
      title: 'Polling App',
      description: 'Real-time AI-native polling platform',
      whyItMatters: 'Frictionless feedback at the speed of a QR scan',
      techStack: ['Next.js', 'TypeScript'],
      solution: 'Collect real-time feedback quickly.',
    },
    {
      slug: 'python-projects',
      title: 'Python Projects',
      description: 'Collection of automation tools and scripts',
      whyItMatters: 'Real problems deserve real solutions',
      techStack: ['Python', 'Docker'],
      solution: 'Practical automation scripts and tools.',
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
    expect(await screen.findByText('Projects built around real problems.')).toBeInTheDocument();
    expect(await screen.findByText(/A focused portfolio of learning systems/)).toBeInTheDocument();
  });

  test('loads and displays projects', async () => {
    render(<ProjectsPage />);
    
    // Wait for projects to load
    await waitFor(() => {
      expect(projectsLib.getProjects).toHaveBeenCalledTimes(1);
    });
    
    // Check if project titles are displayed
    expect(await screen.findByText('Learning Log')).toBeInTheDocument();
    expect(await screen.findByText('Polling App')).toBeInTheDocument();
    expect(await screen.findByText('Python Projects')).toBeInTheDocument();
  });

  test('filters projects when tech filter is clicked', async () => {
    render(<ProjectsPage />);
    
    // Wait for projects and tech filters to load
    await waitFor(() => {
      expect(screen.getByText('Python')).toBeInTheDocument();
    });
    
    // Click on Python filter
    fireEvent.click(screen.getByText('Python'));
    
    // Should show Python projects and hide others
    await waitFor(() => {
      expect(screen.getByText('Learning Log')).toBeInTheDocument();
      expect(screen.getByText('Python Projects')).toBeInTheDocument();
      expect(screen.queryByText('Polling App')).not.toBeInTheDocument();
    });
    
    // Click on All filter to reset
    fireEvent.click(screen.getByText('All'));
    
    // Should show all projects again
    await waitFor(() => {
      expect(screen.getByText('Learning Log')).toBeInTheDocument();
      expect(screen.getByText('Polling App')).toBeInTheDocument();
      expect(screen.getByText('Python Projects')).toBeInTheDocument();
    });
  });
});
