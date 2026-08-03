import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TypewriterTerminal from '../components/TypewriterTerminal';
import HeroBackground from '../components/HeroBackground';
import CursorGlow from '../components/CursorGlow';

// Mock window.matchMedia and Canvas getContext
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
  });
});

describe('Cyberpunk Components', () => {
  describe('TypewriterTerminal', () => {
    test('renders static terminal information', () => {
      render(<TypewriterTerminal />);
      
      // Check static terminal labels
      expect(screen.getByText('whoami')).toBeInTheDocument();
      expect(screen.getByText('brian@portfolio:~')).toBeInTheDocument();
      expect(screen.getByText(/Backend Systems Engineer/)).toBeInTheDocument();
      expect(screen.getByText('cat core_thesis.sh')).toBeInTheDocument();
    });
  });

  describe('HeroBackground', () => {
    test('renders canvas element when reduced motion is not preferred', () => {
      const { container } = render(<HeroBackground />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    test('does not render canvas when reduced motion is preferred', () => {
      // Temporarily override matchMedia to return true for reduced-motion
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query.includes('reduce'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const { container } = render(<HeroBackground />);
      const canvas = container.querySelector('canvas');
      expect(canvas).not.toBeInTheDocument();
    });
  });

  describe('CursorGlow', () => {
    test('renders cursor glow component when mounted', () => {
      const { container } = render(<CursorGlow />);
      const glowDiv = container.querySelector('div');
      // The cursor glow should be present in the tree
      expect(glowDiv).toBeInTheDocument();
      expect(glowDiv).toHaveClass('pointer-events-none');
    });
  });
});
