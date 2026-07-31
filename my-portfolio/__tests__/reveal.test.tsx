import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal';

// framer-motion caches its reduced-motion detection globally on first render, so
// flipping window.matchMedia mid-file does not re-trigger it. Mock the hook
// directly instead: this drives the component's branch deterministically per test.
// whileInView still relies on IntersectionObserver, which jsdom lacks, so we stub it.
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return { ...actual, useReducedMotion: jest.fn() };
});

const mockUseReducedMotion = useReducedMotion as jest.Mock;

beforeAll(() => {
  class MockIntersectionObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn(() => []);
    root = null;
    rootMargin = '';
    thresholds = [];
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

beforeEach(() => {
  mockUseReducedMotion.mockReset();
});

describe('Reveal', () => {
  test('renders its children (motion path)', () => {
    mockUseReducedMotion.mockReturnValue(false);
    render(
      <Reveal>
        <p>hello world</p>
      </Reveal>
    );
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  test('renders its children (reduced-motion path)', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(
      <Reveal>
        <p>reduced motion content</p>
      </Reveal>
    );
    expect(screen.getByText('reduced motion content')).toBeInTheDocument();
  });

  test('forwards className to the wrapper in reduced-motion mode', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(
      <Reveal className="test-wrapper">
        <span>wrapped</span>
      </Reveal>
    );
    expect(screen.getByText('wrapped').parentElement).toHaveClass('test-wrapper');
  });

  test('renders a plain div with no motion transform when reduced motion is set', () => {
    mockUseReducedMotion.mockReturnValue(true);
    const { container } = render(
      <Reveal>
        <span>static</span>
      </Reveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe('DIV');
    // The reduced-motion branch is a bare <div>: no inline transform/opacity that
    // framer-motion would otherwise inject from the initial={{ opacity: 0, y: 24 }}.
    expect(wrapper.style.transform).toBe('');
    expect(wrapper.style.opacity).toBe('');
  });

  test('applies the initial motion style when reduced motion is off', () => {
    mockUseReducedMotion.mockReturnValue(false);
    const { container } = render(
      <Reveal>
        <span>animated</span>
      </Reveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    // motion.div renders the initial={{ opacity: 0, y: 24 }} before entering view.
    expect(wrapper.style.transform).toContain('translateY(24px)');
    expect(wrapper.style.opacity).toBe('0');
  });

  test('forwards className to the wrapper in motion mode', () => {
    mockUseReducedMotion.mockReturnValue(false);
    render(
      <Reveal className="motion-wrapper">
        <span>animated</span>
      </Reveal>
    );
    expect(screen.getByText('animated').parentElement).toHaveClass('motion-wrapper');
  });
});
