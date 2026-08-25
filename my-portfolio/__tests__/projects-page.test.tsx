import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectFilters from '../app/projects/ProjectFilters';

describe('ProjectsPage', () => {
  const mockProjects = [
    {
      slug: 'java-from-scratch',
      title: 'Java From Scratch',
      description: 'A progressive Java learning repository',
      problem: 'Java fundamentals need structured practice.',
      techStack: ['Java'],
      whyThisStack: [{ tech: 'Java', reason: 'Strong typed backend foundation.' }],
      solution: 'Organize Java fundamentals and OOP exercises.',
      impact: 'Makes Java practice visible and reviewable.',
      architecture: ['Progressive Java exercises.'],
      category: 'Learning system',
      accent: 'from-orange-500 via-red-500 to-cyan-400',
      githubLink: 'https://github.com/BrianBett125/java-from-scratch',
    },
    {
      slug: 'learning-log',
      title: 'Learning Log',
      description: 'Personal knowledge management app',
      problem: "Most knowledge is lost because it is never written down in a structure that is easy to return to.",
      techStack: ['Python', 'Django'],
      whyThisStack: [],
      solution: 'Capture and organize learning notes.',
      impact: 'Turns fragmented study notes into a searchable learning record.',
      architecture: ['Django application organized around topics and learning entries.'],
      category: 'Learning system',
      accent: 'from-violet-500 via-blue-500 to-cyan-400',
    },
    {
      slug: 'polling-app',
      title: 'Polling App',
      description: 'Real-time AI-native polling platform',
      problem: 'Collecting feedback is often slower than the moment when the feedback is most useful.',
      techStack: ['Next.js', 'TypeScript'],
      whyThisStack: [],
      solution: 'Collect real-time feedback quickly.',
      impact: 'Supports faster feedback loops.',
      architecture: ['Next.js application for the polling user experience.'],
      category: 'Real-time platform',
      accent: 'from-fuchsia-500 via-violet-500 to-blue-500',
    },
    {
      slug: 'python-projects',
      title: 'Python Projects',
      description: 'Collection of automation tools and scripts',
      problem: 'Repeated operational tasks cost time and attention when they are handled manually.',
      techStack: ['Python', 'Docker'],
      whyThisStack: [],
      solution: 'Practical automation scripts and tools.',
      impact: 'Captures reusable automation patterns.',
      architecture: ['Python scripts and tools for task automation.'],
      category: 'Automation',
      accent: 'from-emerald-400 via-cyan-400 to-blue-500',
    },
  ];

  test('loads and displays projects', async () => {
    render(<ProjectFilters projects={mockProjects} />);
    
    expect(await screen.findByText('Java From Scratch')).toBeInTheDocument();
    expect(await screen.findByText('Learning Log')).toBeInTheDocument();
    expect(await screen.findByText('Polling App')).toBeInTheDocument();
    expect(await screen.findByText('Python Projects')).toBeInTheDocument();
  });

  test('filters projects when tech filter is clicked', async () => {
    render(<ProjectFilters projects={mockProjects} />);
    
    // Wait for projects and tech filters to load
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Python' })).toBeInTheDocument();
    });
    
    // Click on Python filter
    fireEvent.click(screen.getByRole('button', { name: 'Python' }));
    
    // Should show Python projects and hide others
    await waitFor(() => {
      expect(screen.getByText('Learning Log')).toBeInTheDocument();
      expect(screen.getByText('Python Projects')).toBeInTheDocument();
      expect(screen.queryByText('Java From Scratch')).not.toBeInTheDocument();
      expect(screen.queryByText('Polling App')).not.toBeInTheDocument();
    });
    
    // Click on All filter to reset
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    
    // Should show all projects again
    await waitFor(() => {
      expect(screen.getByText('Learning Log')).toBeInTheDocument();
      expect(screen.getByText('Polling App')).toBeInTheDocument();
      expect(screen.getByText('Python Projects')).toBeInTheDocument();
      expect(screen.getByText('Java From Scratch')).toBeInTheDocument();
    });
  });

  test('filters the Java project and exposes its GitHub indicator', async () => {
    render(<ProjectFilters projects={mockProjects} />);

    fireEvent.click(await screen.findByRole('button', { name: 'Java' }));

    expect(screen.getByText('Java From Scratch')).toBeInTheDocument();
    expect(screen.getAllByText('Java')).toHaveLength(2);
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.queryByText('Learning Log')).not.toBeInTheDocument();
  });
});
