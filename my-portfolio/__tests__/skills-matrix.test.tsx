import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillsMatrix from '../components/SkillsMatrix';

describe('SkillsMatrix', () => {
  test('renders the first category selected by default', () => {
    render(<SkillsMatrix />);
    const languagesTab = screen.getByRole('tab', { name: /Languages/ });
    expect(languagesTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  test('switches category on click and updates aria-selected', () => {
    render(<SkillsMatrix />);
    const backendTab = screen.getByRole('tab', { name: /Backend/ });

    fireEvent.click(backendTab);

    expect(backendTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /Languages/ })).toHaveAttribute(
      'aria-selected',
      'false'
    );
    expect(screen.getByText('Spring Boot')).toBeInTheDocument();
    expect(screen.getByText('REST APIs')).toBeInTheDocument();
    expect(screen.queryByText('Java')).not.toBeInTheDocument();
  });

  test('supports arrow-key tab navigation', () => {
    render(<SkillsMatrix />);
    const languagesTab = screen.getByRole('tab', { name: /Languages/ });

    fireEvent.keyDown(languagesTab, { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: /Backend/ })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  test('tabs meet the 44px minimum touch target via min-h-11', () => {
    render(<SkillsMatrix />);
    screen.getAllByRole('tab').forEach((tab) => {
      expect(tab.className).toContain('min-h-11');
    });
  });
});
