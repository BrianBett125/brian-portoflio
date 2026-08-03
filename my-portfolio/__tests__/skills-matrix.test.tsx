import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillsMatrix from '../components/SkillsMatrix';

describe('SkillsMatrix', () => {
  test('renders the first category selected by default', () => {
    render(<SkillsMatrix />);
    const coreTab = screen.getByRole('tab', { name: /Core Stack/ });
    expect(coreTab).toHaveAttribute('aria-selected', 'true');
    // A Core Stack skill is visible.
    expect(screen.getByText('Django')).toBeInTheDocument();
  });

  test('switches category on click and updates aria-selected', () => {
    render(<SkillsMatrix />);
    const toolsTab = screen.getByRole('tab', { name: /Tools & Ops/ });

    fireEvent.click(toolsTab);

    expect(toolsTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /Core Stack/ })).toHaveAttribute(
      'aria-selected',
      'false'
    );
    // A tooling skill is now visible; a core-only skill is not.
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.queryByText('Django')).not.toBeInTheDocument();
  });

  test('tabs meet the 44px minimum touch target via min-h-11', () => {
    render(<SkillsMatrix />);
    screen.getAllByRole('tab').forEach((tab) => {
      expect(tab.className).toContain('min-h-11');
    });
  });
});
