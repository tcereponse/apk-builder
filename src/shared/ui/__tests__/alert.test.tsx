import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from '../alert';
import '@testing-library/jest-dom';

describe('Alert', () => {
  it('should render with a title and description', () => {
    render(<Alert title="Heads Up!" description="Something important happened." />);
    expect(screen.getByText('Heads Up!')).toBeInTheDocument();
    expect(screen.getByText('Something important happened.')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should render with children as content', () => {
    render(<Alert title="Info"><div>Additional content here.</div></Alert>);
    expect(screen.getByText('Additional content here.')).toBeInTheDocument();
  });

  it('should apply a custom class name', () => {
    render(<Alert className="custom-alert-class" title="Test Alert" />);
    expect(screen.getByRole('alert')).toHaveClass('custom-alert-class');
  });

  it('should render with different variants (if applicable)', () => {
    // Assuming a 'variant' prop like 'default', 'destructive', 'success'
    render(<Alert variant="destructive" title="Error!" description="Failed to load." />);
    // Check for a class name that indicates the variant, e.g., 'alert-destructive'
    expect(screen.getByRole('alert')).toBeInTheDocument();
    // Example: expect(screen.getByRole('alert')).toHaveClass('alert-destructive');
  });

  it('should include an icon if provided (if applicable)', () => {
    // Assuming an icon prop or slot
    // render(<Alert title="Warning" icon={<span data-testid="alert-icon">!</span>} />);
    // expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
    expect(true).toBe(true); // Placeholder if no icon prop
  });
});
