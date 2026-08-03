import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MetricsBand, { type Metric } from '../components/MetricsBand';

// The count-up path uses IntersectionObserver + requestAnimationFrame. jsdom has
// neither wired to real timing, so we drive the reduced-motion / no-observer
// branch which snaps straight to the final value. That branch is what matters
// for correctness: the displayed number must equal the real data value.
describe('MetricsBand', () => {
  const metrics: Metric[] = [
    { value: 5, label: 'systems shipped' },
    { value: 13, label: 'technologies in play', suffix: '+' },
  ];

  beforeEach(() => {
    // Force the reduced-motion snap branch.
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('renders each label', () => {
    render(<MetricsBand metrics={metrics} />);
    expect(screen.getByText('systems shipped')).toBeInTheDocument();
    expect(screen.getByText('technologies in play')).toBeInTheDocument();
  });

  test('snaps to the final value under reduced motion', () => {
    render(<MetricsBand metrics={metrics} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    // Suffix is rendered adjacent to the number.
    expect(screen.getByText(/13/)).toBeInTheDocument();
  });
});
