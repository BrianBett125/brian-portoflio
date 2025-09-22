import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectsLayout from '../app/projects/layout';

describe('ProjectsLayout', () => {
  test('renders children correctly', () => {
    // Create a test child component
    const TestChild = () => <div data-testid="test-child">Test Child Content</div>;
    
    // Render the layout with the test child
    const { getByTestId } = render(
      <ProjectsLayout>
        <TestChild />
      </ProjectsLayout>
    );
    
    // Verify the child component is rendered
    const childElement = getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement.textContent).toBe('Test Child Content');
  });
});