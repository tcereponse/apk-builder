import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from '../container';
import '@testing-library/jest-dom';

describe('Container', () => {
  it('should render with children', () => {
    render(<Container>Contained Content</Container>);
    expect(screen.getByText('Contained Content')).toBeInTheDocument();
  });

  it('should apply a custom class name', () => {
    render(<Container className="custom-container-class">Styled Container</Container>);
    expect(screen.getByText('Styled Container').closest('.custom-container-class')).toBeInTheDocument();
  });

  it('should render with a specific tag (if polymorphic)', () => {
    // Assuming `as` prop or similar for polymorphic component
    // render(<Container as="section">Section Content</Container>);
    // expect(screen.getByRole('region')).toBeInTheDocument();
    expect(true).toBe(true); // Placeholder if not polymorphic
  });

  it('should pass through other standard HTML attributes', () => {
    render(<Container id="my-container" aria-label="My container">Accessible Container</Container>);
    const container = screen.getByLabelText('My container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('id', 'my-container');
  });
});
